const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Supabase URL 또는 Anonymous Key가 환경 변수에 설정되지 않았습니다.");
}

const SUPABASE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/fetchPlace`;

interface FetchedPlace {
    place_id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    rating: number;
    photo_url: string | null;
}

interface FetchResponse {
    fromCache: boolean;
    place: FetchedPlace;
    error?: string;
    receivedPayload?: any;
}


export async function fetchPlaceDetails(placeId: string): Promise<FetchedPlace | null> {
    
    if (!placeId) {
        console.error("placeId가 필요합니다.");
        return null;
    }

    const payload = { placeId: placeId };

    try {
        
        const response = await fetch(SUPABASE_FUNCTION_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY,
            },
            body: JSON.stringify(payload),
        });

        const data: FetchResponse = await response.json();
        
        if (!response.ok) {
            console.error(
                'Supabase Function 응답 오류 (HTTP Status):', 
                response.status, 
                data.error || 'Unknown error'
            );
            if (data.receivedPayload) {
                 console.error('서버가 받은 페이로드:', data.receivedPayload);
            }
            return null;
        }

        if (data.error) {
            console.error('Function 서버 로직 오류:', data.error);
            return null;
        }

        return data.place;

    } catch (e) {
        console.error('예상치 못한 클라이언트 오류 (네트워크/파싱 등):', e);
        return null;
    }
}