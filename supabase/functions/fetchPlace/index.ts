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

interface Payload {
  placeId?: string | string[];
}

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

    let payload: Payload = {};
    
    try {
        const bodyText = await req.text();
        if (bodyText) {
            payload = JSON.parse(bodyText);
        }
    } catch (e) {
        console.warn("JSON 파싱 실패:", e);
    }

    const rawPlaceId = payload.placeId;
    let placeIds: string[] = [];

    if (typeof rawPlaceId === 'string') {
        placeIds = [rawPlaceId];
    } else if (Array.isArray(rawPlaceId) && rawPlaceId.every(id => typeof id === 'string')) {
        placeIds = rawPlaceId as string[];
    }


    if (!placeIds || placeIds.length === 0) {
      return new Response(JSON.stringify({ error: "placeId(s) required as a string or an array of strings in the payload" }), { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        });
    }


    const results: any[] = [];
    
    for (const currentPlaceId of placeIds) {
        
        const { data: cached } = await supabase
            .from("places")
            .select("*")
            .eq("place_id", currentPlaceId) 
            .maybeSingle();

        if (cached) {
            results.push({ fromCache: true, place: cached });
            continue; 
        }

        const url = `https://places.googleapis.com/v1/places/${currentPlaceId}?languageCode=ko`;
            
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
            results.push({ 
                fromCache: false, 
                error: "Google API failed", 
                placeId: currentPlaceId, 
                details: detail 
            });
            continue; 
        }

        let photo_url = null;
        if (detail.photos && detail.photos.length > 0) {
            const photoName = detail.photos[0].name;
            photo_url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${GOOGLE_API_KEY}`;
        }

        const placeData = {
            place_id: currentPlaceId,
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
            results.push({ 
                fromCache: false, 
                error: "DB insert failed", 
                placeId: currentPlaceId, 
                details: dbError 
            });
            continue; 
        }

        results.push({ 
            fromCache: false, 
            place: inserted || placeData 
        });
    }


    return new Response(JSON.stringify({ 
      places: results
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