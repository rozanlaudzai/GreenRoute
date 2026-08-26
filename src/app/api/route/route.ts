type NominatimResult = { lat: string; lon: string; display_name: string };

async function geocode(query: string): Promise<NominatimResult> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  const response = await fetch(url, {
    headers: { "User-Agent": "GreenRoute educational route calculator/1.0" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Location search is unavailable.");
  const results = (await response.json()) as NominatimResult[];
  if (!results[0]) throw new Error(`We could not find “${query}”.`);
  return results[0];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { origin?: string; destination?: string };
    const origin = body.origin?.trim();
    const destination = body.destination?.trim();
    if (!origin || !destination) return Response.json({ error: "Enter both locations." }, { status: 400 });
    const [from, to] = await Promise.all([geocode(origin), geocode(destination)]);
    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`;
    const routeResponse = await fetch(routeUrl, { signal: AbortSignal.timeout(8000) });
    if (!routeResponse.ok) throw new Error("Routing is unavailable.");
    const routeData = (await routeResponse.json()) as { code: string; routes?: { distance: number; duration: number }[] };
    const route = routeData.routes?.[0];
    if (!route || routeData.code !== "Ok") throw new Error("No road route was found.");
    return Response.json({
      distanceKm: route.distance / 1000,
      durationMinutes: route.duration / 60,
      originLabel: from.display_name.split(",").slice(0, 2).join(","),
      destinationLabel: to.display_name.split(",").slice(0, 2).join(","),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not calculate this route.";
    return Response.json({ error: message }, { status: 502 });
  }
}
