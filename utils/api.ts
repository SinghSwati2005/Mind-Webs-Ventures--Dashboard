export async function fetchTemperature(lat: number, lon: number, start: string, end: string) {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=temperature_2m`;
  const res = await fetch(url);
  return res.json();
}