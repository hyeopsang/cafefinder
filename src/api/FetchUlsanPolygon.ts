export async function fetchUlsanPolygon() {
  const res = await fetch('/ulsan-outer-boundary.json');
  return res.json();
}
