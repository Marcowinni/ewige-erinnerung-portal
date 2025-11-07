import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

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

// ERSETZE AB HIER:
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
    
    // KORREKTUR 1: Das 5. Argument (HttpClient) wurde entfernt.
    event = await stripe.webhooks.constructEventAsync(
      body, 
      signature, 
      webhookSecret, 
      undefined // (Dies ist das 'tolerance'-Argument)
    ); 

  } catch (err) {
    // KORREKTUR 2: 'err' wird als 'unknown' behandelt.
    const errorMessage = err instanceof Error ? err.message : "Unknown webhook error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return new Response(JSON.stringify({ error: `Webhook error: ${errorMessage}` }), { status: 400 });
  }

  // Handle 'checkout.session.completed'
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

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
        .select('applied_discount_code, contact_email') // Hole E-Mail und Code
        .single();

      if (updateError) throw updateError;

      // 2. Rabattcode-Nutzung erhöhen
      if (orderData?.applied_discount_code) {
        const { error: rpcError } = await supabaseAdmin.rpc('increment_discount_usage', {
          code_to_increment: orderData.applied_discount_code
        });
        if (rpcError) console.error(`Failed to increment discount for order ${orderId}:`, rpcError);
      }

      // 3. E-Mails senden (Hier Resend/SendGrid-Logik einfügen)
      console.log(`TODO: Send email confirmation for order ${orderId}`);
      // await sendEmail(orderData.contact_email, "Bestellung erfolgreich!");
      // await sendEmail(Deno.env.get('ADMIN_EMAIL'), `Neue Bestellung #${orderId}!`);

    } catch (dbError) {
      // KORREKTUR 2 (auch hier): 'dbError' als 'unknown' behandeln.
      const dbErrorMessage = dbError instanceof Error ? dbError.message : "Unknown database error";
      console.error(`Failed to process order ${orderId}:`, dbErrorMessage);
      return new Response(JSON.stringify({ error: `Database error: ${dbErrorMessage}` }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});