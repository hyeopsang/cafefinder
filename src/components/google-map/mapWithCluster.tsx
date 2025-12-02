import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer, Cluster } from '@googlemaps/markerclusterer';
import CafeMarker from '@/assets/cafemarker.svg?react';
import { createRoot } from 'react-dom/client';

interface MapWithClusterProps {
  locations: { lat: number; lng: number }[];
}

export default function MapWithCluster({ locations }: MapWithClusterProps) {
  const map = useMap();

  const renderer = {
    render: ({ count, position }: Cluster) => {
      return new google.maps.marker.AdvancedMarkerElement({
        position,
        content: createClusterIcon(count),
      });
    },
  };

  useEffect(() => {
    if (!map) return;
    if (!locations.length) return;

    const markers = locations.map(
      (loc) =>
        new google.maps.marker.AdvancedMarkerElement({
          position: loc,
          content: createCustomMarkerIcon(loc, map),
        }),
    );

    const clusterer = new MarkerClusterer({
      map,
      markers,
      renderer,
    });

    const clickListener = clusterer.addListener('click', (cluster: Cluster) => {
      const position = cluster.position;

      if (!map || !position) return;

      const currentZoom = map.getZoom() ?? 12;
      const newZoom = Math.min(currentZoom + 2, 18);

      map.setCenter(position);
      map.setZoom(newZoom);
    });

    return () => {
      clusterer.clearMarkers();
      google.maps.event.removeListener(clickListener);
    };
  }, [map, locations]);

  return null;
}

function createCustomMarkerIcon(
  position: { lat: number; lng: number },
  map: google.maps.Map | null,
) {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<CafeMarker className="h-10 w-10 cursor-pointer" />);

  div.style.cursor = 'pointer';

  div.onclick = () => {
    if (!map) return;

    const currentZoom = map.getZoom() ?? 12;
    const newZoom = Math.min(currentZoom + 2, 18);

    map.setCenter(position);
    map.setZoom(newZoom);
  };

  return div;
}

function createClusterIcon(count: number) {
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  const iconContainer = document.createElement('div');
  const root = createRoot(iconContainer);
  root.render(<CafeMarker className="h-10 w-10" />);
  container.appendChild(iconContainer);

  const badge = document.createElement('div');
  badge.innerText = String(count);
  badge.style.position = 'absolute';
  badge.style.top = '-4px';
  badge.style.right = '-4px';
  badge.style.background = '#7C3AED';
  badge.style.color = 'white';
  badge.style.width = '20px';
  badge.style.height = '20px';
  badge.style.borderRadius = '50%';
  badge.style.fontSize = '12px';
  badge.style.display = 'flex';
  badge.style.alignItems = 'center';
  badge.style.justifyContent = 'center';
  badge.style.border = '1.5px solid white';
  badge.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';

  container.appendChild(badge);

  return container;
}
