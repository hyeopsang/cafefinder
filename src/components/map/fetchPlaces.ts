export const fetchPlaces = async (keyword: string) => {
  if (!keyword) return [];

  const { AutocompleteSuggestion }: any = (await google.maps.importLibrary('places')) as any;

  const autocomplete = new AutocompleteSuggestion({
    input: keyword,
    language: 'ko',
    region: 'kr',
    locationBias: {
      center: { lat: 35.539, lng: 129.3114 },
      radius: 30000,
    },
  });

  const data = await autocomplete.fetchSuggestions();
  return data?.suggestions ?? [];
};
