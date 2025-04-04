export interface Place {
  id: string;
  displayName: string;
  location?: google.maps.LatLng | null; // Add the location property
  // other properties
}
  
