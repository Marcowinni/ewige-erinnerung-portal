import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log(`Function "create-order" up and running!`);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const orderDataToInsert = {
      product_type: payload.product_type,
      options_summary: payload.options_summary,
      total_price: payload.total_price,
      subject_details: payload.subject_details,
      music_choice: payload.music_choice,
      contact_name: payload.contact_name,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone,
      billing_address: payload.billing_address,
      notes: payload.notes,
    };

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert(orderDataToInsert)
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ orderId: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});