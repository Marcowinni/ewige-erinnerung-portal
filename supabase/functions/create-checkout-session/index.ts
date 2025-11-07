import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, productName, unitAmount } = await req.json();

    if (!orderId || !productName || !unitAmount) {
      throw new Error("orderId, productName, and unitAmount are required.");
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Hole die E-Mail des Kunden aus der DB
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('contact_email')
      .eq('id', orderId)
      .single();

    if (orderError) throw new Error(`Order not found: ${orderError.message}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',         // Für "Karten" und "Cartes Bancaires"
        'twint',        // Aktiviert
        'klarna',       // Aktiviert
        'bancontact',   // Aktiviert
        'eps',          // Aktiviert
      ],

      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: productName,
              images: ['https://www.memora-moments.ch/logo.png'], // Optional: Dein Logo
            },
            unit_amount: Math.round(unitAmount * 100), // Preis in Rappen
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: orderData.contact_email,
      success_url: `${Deno.env.get('SITE_URL')}/bestellung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('SITE_URL')}/gedenken`, // Zurück zum Uploader
      metadata: {
        orderId: orderId, // WICHTIG: Um die Bestellung im Webhook zuzuordnen
      },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }

});