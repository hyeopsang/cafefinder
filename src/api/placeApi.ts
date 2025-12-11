import type { Place } from '@/app/zustand/usePlaceStore';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase URL 또는 Anonymous Key가 환경 변수에 설정되지 않았습니다.');
}

const SUPABASE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/fetchPlace`;

export async function fetchPlaceDetails(placeId: string | string[]): Promise<Place[] | null> {
  if (!placeId) {
    console.error('placeId가 필요합니다.');
    return null;
  }

  const payload = { placeId: placeId };

  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data: Place[] = await response.json();
    console.log(data);
    if (!response.ok) {
      console.error('Supabase Function 응답 오류 (HTTP Status):', response.status);

      return null;
    }

    return data;
  } catch (e) {
    console.error('예상치 못한 클라이언트 오류 (네트워크/파싱 등):', e);
    return null;
  }
}
