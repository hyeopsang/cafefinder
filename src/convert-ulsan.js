import fs from 'fs';

const geojson = JSON.parse(fs.readFileSync('./hangjeongdong_울산광역시.geojson', 'utf-8'));

const coords = [];

for (const feature of geojson.features) {
  const geom = feature.geometry;
  if (!geom) continue;

  if (geom.type === 'Polygon') {
    for (const ring of geom.coordinates) {
      for (const [lng, lat] of ring) {
        coords.push({ lat, lng });
      }
    }
  } else if (geom.type === 'MultiPolygon') {
    for (const poly of geom.coordinates) {
      for (const ring of poly) {
        for (const [lng, lat] of ring) {
          coords.push({ lat, lng });
        }
      }
    }
  }
}

fs.writeFileSync('./ulsan-polygon-full.json', JSON.stringify(coords));
console.log('변환 완료! 총 좌표 수:', coords.length);
