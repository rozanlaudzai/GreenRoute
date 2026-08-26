"use client";

import { FormEvent, useMemo, useState } from "react";
import { calculateEmissions, MODES, TransportMode } from "./emissions";

type RouteResult = { distanceKm: number; durationMinutes: number; originLabel: string; destinationLabel: string };
type IconName = "leaf" | "pin" | "arrow" | "swap" | "walk" | "bike" | "bolt" | "car" | "route";

const Icon = ({ name }: { name: IconName }) => {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths = {
    leaf: <><path d="M20 4C11 4 5.5 8.5 5.5 15.5c0 2.5 1.8 4.5 4.5 4.5 7 0 10-7 10-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
    pin: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    swap: <><path d="m7 7 3-3 3 3" /><path d="M10 4v14" /><path d="m17 17-3 3-3-3" /></>,
    walk: <><circle cx="13" cy="4.5" r="1.7" /><path d="m10 21 2-6-3-3 2-5 4 3 3 .5M12 15l4 6M9 12l-4 4" /></>,
    bike: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="m8 17 3-7 3 7H8Zm3-7h4l3 7M9 7h3" /></>,
    bolt: <path d="m13 2-7 12h6l-1 8 7-12h-6l1-8Z" />,
    car: <><path d="m4 15 1.5-6h13l1.5 6v4h-2v-2H6v2H4v-4Z" /><path d="M7 9 9 6h6l2 3" /><path d="M7.5 14h.01M16.5 14h.01" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 3-3v-6a3 3 0 0 1 3-3" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" {...common}>{paths[name]}</svg>;
};

function ModeIcon({ mode }: { mode: TransportMode }) {
  if (mode === "walk") return <Icon name="walk" />;
  if (mode === "motorcycle") return <Icon name="bike" />;
  if (mode === "electric-motorcycle") return <span className="combo-icon"><Icon name="bike" /><Icon name="bolt" /></span>;
  if (mode === "electric-car") return <span className="combo-icon"><Icon name="car" /><Icon name="bolt" /></span>;
  return <Icon name="car" />;
}

export function RouteCalculator() {
  const [origin, setOrigin] = useState("Monas, Jakarta");
  const [destination, setDestination] = useState("Gelora Bung Karno, Jakarta");
  const [mode, setMode] = useState<TransportMode>("electric-motorcycle");
  const [result, setResult] = useState<RouteResult>({ distanceKm: 6.8, durationMinutes: 18, originLabel: "Monas, Jakarta", destinationLabel: "Gelora Bung Karno" });
  const [manualDistance, setManualDistance] = useState("6.8");
  const [useManual, setUseManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selected = MODES.find((item) => item.id === mode) ?? MODES[0];
  const emissions = calculateEmissions(result.distanceKm, selected.factor);
  const petrolEmissions = calculateEmissions(result.distanceKm, 0.16152);
  const savedPercent = petrolEmissions ? Math.max(0, (1 - emissions / petrolEmissions) * 100) : 0;
  const comparisons = useMemo(() => MODES.map((item) => ({ ...item, value: calculateEmissions(result.distanceKm, item.factor) })), [result.distanceKm]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (useManual) {
      const distance = Number(manualDistance);
      if (!Number.isFinite(distance) || distance <= 0) return setError("Enter a distance greater than zero.");
      setResult({ distanceKm: distance, durationMinutes: distance / 25 * 60, originLabel: origin, destinationLabel: destination });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/route", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ origin, destination }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not calculate the route.");
      setResult(data);
      setManualDistance(data.distanceKm.toFixed(1));
    } catch (err) {
      setError(`${err instanceof Error ? err.message : "Route lookup failed"} You can use manual distance instead.`);
      setUseManual(true);
    } finally { setLoading(false); }
  }

  function swap() { setOrigin(destination); setDestination(origin); }
  const maxComparison = Math.max(...comparisons.map((item) => item.value));

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="GreenRoute home"><span><Icon name="leaf" /></span> GreenRoute</a>
        <nav aria-label="Main navigation"><a href="#calculator">Calculator</a><a href="#impact">Your impact</a><a href="#method">Method</a></nav>
        <a className="header-cta" href="#calculator">Plan a route <Icon name="arrow" /></a>
      </header>
      <section className="hero" id="top">
        <div className="eyebrow"><span>●</span> Small choices. Cleaner air.</div>
        <h1>Move through the city.<br /><em>Leave less behind.</em></h1>
        <p>Compare the climate impact of your journey and find a cleaner way to get there.</p>
        <div className="hero-stats" aria-label="GreenRoute benefits"><span><b>5</b> travel modes</span><span><b>2026</b> emission factors</span><span><b>1</b> better choice</span></div>
      </section>

      <section className="calculator-wrap" id="calculator">
        <div className="route-card">
          <form onSubmit={submit}>
            <div className="card-heading"><div><span>01</span><h2>Plan your journey</h2></div><p>Enter your route, then choose how you’ll travel.</p></div>
            <div className="location-grid">
              <label><span>Starting point</span><div className="input-wrap origin"><Icon name="pin" /><input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Enter a location" required /></div></label>
              <button className="swap" type="button" onClick={swap} aria-label="Swap locations"><Icon name="swap" /></button>
              <label><span>Destination</span><div className="input-wrap destination"><Icon name="pin" /><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where are you going?" required /></div></label>
            </div>
            <label className="manual-toggle"><input type="checkbox" checked={useManual} onChange={(e) => setUseManual(e.target.checked)} /> <span>Enter distance manually</span></label>
            {useManual && <label className="manual-field"><span>Road distance</span><div><input type="number" min="0.1" step="0.1" value={manualDistance} onChange={(e) => setManualDistance(e.target.value)} /><b>km</b></div></label>}
            <fieldset><legend>How are you travelling?</legend><div className="mode-grid">{MODES.map((item) => <label key={item.id} className={mode === item.id ? "mode active" : "mode"}><input type="radio" name="mode" checked={mode === item.id} onChange={() => setMode(item.id)} /><span className="mode-icon"><ModeIcon mode={item.id} /></span><b>{item.shortLabel}</b><small>{item.factor === 0 ? "0" : Math.round(item.factor * 1000)} g/km</small></label>)}</div></fieldset>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="calculate" type="submit" disabled={loading}>{loading ? "Finding your route…" : "Calculate my impact"}<Icon name="arrow" /></button>
          </form>

          <aside className="result-panel" aria-live="polite">
            <div className="result-top"><span>YOUR TRIP IMPACT</span><span className="live-dot">● ESTIMATE</span></div>
            <div className="route-visual"><div className="map-lines" /><span className="map-pin pin-a"><Icon name="pin" /></span><span className="map-pin pin-b"><Icon name="pin" /></span><div className="route-dash" /></div>
            <div className="result-route"><div><span>A</span><p>{result.originLabel}</p></div><div><span>B</span><p>{result.destinationLabel}</p></div></div>
            <div className="distance-line"><span><Icon name="route" /> {result.distanceKm.toFixed(1)} km</span><span>≈ {Math.round(result.durationMinutes)} min by road</span></div>
            <div className="emission-result"><p>Estimated emissions</p><div><strong>{emissions < 0.01 ? emissions.toFixed(3) : emissions.toFixed(2)}</strong><span>kg CO₂e</span></div><small>{Math.round(selected.factor * 1000)} g CO₂e per kilometre</small></div>
            <div className="saving"><span><Icon name="leaf" /></span><p><b>{savedPercent.toFixed(0)}% less</b> than the same trip in an average petrol car.</p></div>
          </aside>
        </div>
      </section>

      <section className="comparison" id="impact">
        <div className="section-kicker">YOUR OPTIONS</div><h2>One route. Five different footprints.</h2><p>Estimated operational and energy emissions for this {result.distanceKm.toFixed(1)} km journey.</p>
        <div className="comparison-list">{comparisons.map((item) => <div className="compare-row" key={item.id}><span className="compare-icon"><ModeIcon mode={item.id} /></span><b>{item.label}</b><div className="bar"><i style={{ width: `${Math.max(1.5, item.value / maxComparison * 100)}%` }} /></div><strong>{item.value === 0 ? "0" : item.value.toFixed(2)} kg</strong></div>)}</div>
      </section>

      <section className="method" id="method"><div><span className="section-kicker">BUILT ON OPEN DATA</span><h2>Simple math.<br />Transparent assumptions.</h2></div><div><p>GreenRoute multiplies road distance by a per-kilometre emissions factor. Results are planning estimates—not live air-quality readings or full vehicle life-cycle assessments.</p><p className="formula">Trip CO₂e <b>=</b> distance <b>×</b> emission factor</p><a href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026" target="_blank" rel="noreferrer">Read the official source <Icon name="arrow" /></a></div></section>
      <footer><a className="brand" href="#top"><span><Icon name="leaf" /></span> GreenRoute</a><p>Better routes for a lighter footprint.</p><small>© 2026 GreenRoute · OpenStreetMap data · OSRM routing</small></footer>
    </main>
  );
}
