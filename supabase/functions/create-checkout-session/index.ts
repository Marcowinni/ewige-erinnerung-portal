import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, productName, unitAmount } = await req.json();

    if (!orderId || !productName || unitAmount === undefined) {
      throw new Error("Missing required fields: orderId, productName, or unitAmount");
    }

    // Umgebungsvariablen prüfen
    const STRIPE_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    const SITE_URL = Deno.env.get('SITE_URL');

    if (!STRIPE_KEY || !SITE_URL) {
      throw new Error("Missing Environment Variables: STRIPE_SECRET_KEY or SITE_URL");
    }

    const stripe = new Stripe(STRIPE_KEY, {
      apiVersion: '2024-06-20',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('contact_email')
      .eq('id', orderId)
      .single();

    if (orderError || !orderData) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    // Stripe Session erstellen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',         // Kreditkarten (OK für CHF)
        'twint',        // TWINT (OK für CHF)
        'klarna',       // Klarna (OK für CHF)
        // 'bancontact', // ENTFERNT: Unterstützt nur EUR!
        // 'eps',        // ENTFERNT: Unterstützt nur EUR!
      ],
      line_items: [
        {
          price_data: {
            currency: 'chf', // Währung
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(unitAmount * 100), // Betrag in Rappen
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: orderData.contact_email,
      
      // WICHTIG: SITE_URL muss gesetzt sein (z.B. https://memora-moments.ch)
      success_url: `${SITE_URL}/bestellung-erfolgreich`,
      cancel_url: `${SITE_URL}/gedenken`,
      
      metadata: {
        orderId: String(orderId), // WICHTIG: Stripe Metadaten müssen Strings sein
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
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