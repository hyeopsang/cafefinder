import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! 
);

const GOOGLE_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY")!; 

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    if (!GOOGLE_API_KEY) {
      return new Response(JSON.stringify({ error: "API Key not configured" }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      });
    }

    let payload: { placeId?: string } = {};
    
    try {
        const bodyText = await req.text();
        if (bodyText) {
            payload = JSON.parse(bodyText);
        }
    } catch (e) {
        console.warn("JSON 파싱 실패");
    }

    const { placeId } = payload;
    

    if (!placeId) {
      return new Response(JSON.stringify({ error: "placeId required" }), { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        });
    }

    const { data: cached } = await supabase
      .from("places")
      .select("*")
      .eq("place_id", placeId) 
      .maybeSingle();

    if (cached) {
      return new Response(JSON.stringify({ fromCache: true, place: cached }), { 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        });
    }

    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=ko`;
        
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,photos',
      }
    });
    
    const detail = await resp.json(); 
        
    if (!resp.ok) { 
        return new Response(JSON.stringify({ 
          error: "Google API failed", 
          statusCode: resp.status,
          details: detail 
        }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }

    if (!detail.displayName) {
        return new Response(JSON.stringify({ 
          error: "Invalid response",
          details: detail 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }

    let photo_url = null;
    if (detail.photos && detail.photos.length > 0) {
      const photoName = detail.photos[0].name;
      photo_url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${GOOGLE_API_KEY}`;
    }

    const placeData = {
      place_id: placeId,
      name: detail.displayName?.text || detail.displayName, 
      address: detail.formattedAddress,
      lat: detail.location?.latitude, 
      lng: detail.location?.longitude, 
      rating: detail.rating || null,
      photo_url,
      updated_at: new Date().toISOString(),
    };


    const { data: inserted, error: dbError } = await supabase
      .from("places")
      .upsert(placeData, { 
        onConflict: 'place_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (dbError) {
      return new Response(JSON.stringify({ 
        error: "DB insert failed", 
        details: dbError 
      }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }

    return new Response(JSON.stringify({ 
      fromCache: false, 
      place: inserted || placeData 
    }), { 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (err) {
    return new Response(JSON.stringify({ 
      error: "server error", 
      message: err instanceof Error ? err.message : String(err)
    }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});