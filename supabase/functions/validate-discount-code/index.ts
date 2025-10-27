import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log(`Function "validate-discount-code" up and running!`);

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      throw new Error("Discount code (string) is required.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Code in der Datenbank suchen
    const { data, error } = await supabaseAdmin
      .from('discount_codes')
      .select('discount_type, value, is_active, valid_until, max_uses, times_used')
      .eq('code', code.trim().toUpperCase()) // Code trimmen und in Großbuchstaben umwandeln
      .single();

    if (error || !data) {
      console.log(`Discount code "${code}" not found or error:`, error);
      return new Response(JSON.stringify({ valid: false, message: "Ungültiger oder abgelaufener Rabattcode." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404, // Code nicht gefunden
      });
    }

    // Validierungen
    if (!data.is_active) {
      return new Response(JSON.stringify({ valid: false, message: "Dieser Rabattcode ist nicht mehr aktiv." }), { status: 400 });
    }
    if (data.valid_until && new Date(data.valid_until) < new Date()) {
      return new Response(JSON.stringify({ valid: false, message: "Dieser Rabattcode ist abgelaufen." }), { status: 400 });
    }
    if (data.max_uses && data.times_used >= data.max_uses) {
      return new Response(JSON.stringify({ valid: false, message: "Dieser Rabattcode wurde bereits maximal genutzt." }), { status: 400 });
    }

    // Code ist gültig
    return new Response(JSON.stringify({
      valid: true,
      code: code.trim().toUpperCase(),
      discountType: data.discount_type,
      value: data.value,
      message: "Rabattcode erfolgreich angewendet!",
    }), {
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