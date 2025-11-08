import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { Resend } from 'resend'; // <-- Importiert Resend

const corsHeaders = { 'Access-Control-Allow-Origin': '*' };

// Stripe-Setup
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20', 
  httpClient: Stripe.createFetchHttpClient(),
});

// Supabase-Setup
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// --- Resend-Setup ---
const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')!;
const FROM_EMAIL = 'info@memora-moments.ch'; 
// --- Ende Resend-Setup ---

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      throw new Error('Stripe signature or webhook secret is missing.');
    }
    
    event = await stripe.webhooks.constructEventAsync(
      body, 
      signature, 
      webhookSecret, 
      undefined
    ); 

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown webhook error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return new Response(JSON.stringify({ error: `Webhook error: ${errorMessage}` }), { status: 400 });
  }

  // Handle 'checkout.session.completed'
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const customerEmail = session.customer_email; // E-Mail des Kunden

    if (!orderId) {
      console.error("Webhook received but no orderId in metadata.", session);
      return new Response(JSON.stringify({ error: "Missing orderId in metadata" }), { status: 400 });
    }

    try {
      // 1. Bestellung als "bezahlt" markieren
      const { data: orderData, error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ payment_status: 'paid' })
        .eq('id', orderId)
        .select('applied_discount_code') 
        .single();

      if (updateError) {
        console.error(`Order ${orderId}: DB update error`, updateError);
        throw updateError;
      }

      // 2. Rabattcode-Nutzung erhöhen
      if (orderData?.applied_discount_code) {
        const { error: rpcError } = await supabaseAdmin.rpc('increment_discount_usage', {
          code_to_increment: orderData.applied_discount_code
        });
        if (rpcError) {
          console.error(`Order ${orderId}: Failed to increment discount usage`, rpcError);
        }
      }

      // --- 3. E-Mails senden ---
      if (customerEmail && ADMIN_EMAIL && FROM_EMAIL) {
        try {
          // --- NEU: Gestaltete HTML-E-Mail ---
          const customerHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #f9f9f9; padding: 20px; text-align: center;">
                <img src="https://www.memora-moments.ch/logo.png" alt="Memora Moments Logo" style="max-width: 150px; margin-bottom: 20px;">
              </div>
              <div style="padding: 30px;">
                <h1 style="font-size: 24px; color: #222; margin-top: 0;">Vielen Dank für deine Bestellung!</h1>
                <p>Hallo!</p>
                <p>Wir haben deine Zahlung für die Bestellung mit der Nummer <strong>#${orderId}</strong> erfolgreich erhalten.</p>
                <p>Wir beginnen nun mit der Bearbeitung und Erstellung deines persönlichen Memora Moments. Wir melden uns, sobald deine Bestellung versandbereit ist.</p>
                <p style="margin-top: 30px;">Viele Grüsse,<br>Dein Memora Moments Team</p>
              </div>
              <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                © ${new Date().getFullYear()} Memora Moments | <a href="https://www.memora-moments.ch/impressum" style="color: #555;">Impressum</a>
              </div>
            </div>
          `;

          // E-Mail an den Kunden
          await resend.emails.send({
            from: `Memora Moments <${FROM_EMAIL}>`,
            to: [customerEmail],
            subject: `Deine Bestellung #${orderId} bei Memora Moments`,
            html: customerHtml // <-- Verwendet die neue HTML-Vorlage
          });

          // E-Mail an den Admin (bleibt einfach)
          await resend.emails.send({
            from: `System <${FROM_EMAIL}>`,
            to: [ADMIN_EMAIL],
            subject: `Neue Bestellung! #${orderId}`,
            html: `<p>Neue bezahlte Bestellung eingegangen:</p><p>Bestellnummer: <strong>${orderId}</strong></p><p>Kunden-E-Mail: ${customerEmail}</p>`
          });

          console.log(`Order ${orderId}: Successfully sent confirmation emails.`);

        } catch (emailError) {
          console.error(`Order ${orderId}: Payment processed, but FAILED to send emails.`, emailError);
        }
      } else {
         console.warn(`Order ${orderId}: Emails not sent. Missing customerEmail, ADMIN_EMAIL, or FROM_EMAIL.`);
      }
      // --- Ende E-Mail Senden ---

    } catch (dbError) {
      const dbErrorMessage = dbError instanceof Error ? dbError.message : "Unknown database error";
      console.error(`Order ${orderId}: Failed to process order:`, dbErrorMessage);
      return new Response(JSON.stringify({ error: `Database error: ${dbErrorMessage}` }), { status: 500 });
    }
  }

  // Erfolgreiche Antwort an Stripe senden
  return new Response(JSON.stringify({ received: true }), { status: 200 });
});