import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId, uploadedFilePaths } = await req.json();

    if (!orderId || !Array.isArray(uploadedFilePaths)) {
      throw new Error("orderId and uploadedFilePaths (array) are required.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { error: updateError } = await supabaseAdmin
      .from('partner_orders')
      .update({ uploaded_files: uploadedFilePaths })
      .eq('id', orderId);

    if (updateError) {
      console.error("Error updating partner order:", updateError);
      if (updateError.code === 'PGRST116') {
        return new Response(JSON.stringify({ error: `Order with ID ${orderId} not found.` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        });
      }
      throw updateError;
    }

    return new Response(JSON.stringify({ success: true, orderId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in finalize-partner-order:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
