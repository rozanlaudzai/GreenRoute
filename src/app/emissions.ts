export type TransportMode = "walk" | "motorcycle" | "electric-motorcycle" | "petrol-car" | "electric-car";
export type ModeDetail = { id: TransportMode; label: string; shortLabel: string; factor: number };

// kg CO2e per vehicle-km. See EMISSIONS-METHODOLOGY.md.
export const MODES: ModeDetail[] = [
  { id: "walk", label: "On foot", shortLabel: "Walk", factor: 0 },
  { id: "motorcycle", label: "Motorcycle", shortLabel: "Motorbike", factor: 0.11367 },
  { id: "electric-motorcycle", label: "Electric motorcycle", shortLabel: "E-motorbike", factor: 0.006 },
  { id: "petrol-car", label: "Petrol car", shortLabel: "Petrol car", factor: 0.16152 },
  { id: "electric-car", label: "Electric car", shortLabel: "Electric car", factor: 0.02951 },
];

export function calculateEmissions(distanceKm: number, factor: number) {
  return distanceKm * factor;
}
