# GreenRoute emissions methodology

Last reviewed: 26 August 2026

## What GreenRoute estimates

GreenRoute estimates the greenhouse-gas emissions associated with travelling a route, expressed as kilograms of carbon-dioxide equivalent (`kg CO2e`). It is a planning estimate, not a sensor measurement of the air at the roadside.

“Air pollution” can also mean local pollutants such as nitrogen oxides (`NOx`), carbon monoxide (`CO`) and particulate matter (`PM2.5`/`PM10`). Those pollutants depend strongly on vehicle age, engine standard, congestion, temperature and road conditions. The current prototype does **not** calculate those pollutants and should not be presented as a local air-quality or health-risk reading.

## Core formula

For a one-way trip:

```text
trip_emissions_kgCO2e = road_distance_km × emission_factor_kgCO2e_per_km
```

For a return trip or repeated journey:

```text
total_emissions_kgCO2e = road_distance_km × emission_factor × number_of_trips
```

Example for a 10 km trip in an average petrol car:

```text
10 km × 0.16152 kgCO2e/km = 1.6152 kgCO2e
```

The website rounds the displayed total, but calculations use the unrounded factors below.

## Factors used by the prototype

| Mode | Factor (kg CO2e/vehicle-km) | Display value | Basis |
|---|---:|---:|---|
| Walking | 0 | 0 g/km | Operational transport emissions only; food and infrastructure are outside the boundary. |
| Average motorcycle | 0.11367 | 114 g/km | UK Government 2026, direct emissions, average motorbike. |
| Electric motorcycle | 0.00600 | 6 g/km | Engineering proxy: 0.04 kWh/km × 0.15 kg CO2e/kWh. Replace with a local grid and tested vehicle-energy factor for production use. |
| Average petrol car | 0.16152 | 162 g/km | UK Government 2026, direct emissions, average petrol car. |
| Average battery-electric car | 0.02951 | 30 g/km | UK Government 2026, business travel—land, average battery-electric car; includes UK electricity emissions in the published factor. |

The source dataset is the latest publication available on the review date: the [UK Government greenhouse-gas conversion factors 2026](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026), published by the Department for Energy Security and Net Zero. Its [methodology report](https://assets.publishing.service.gov.uk/media/6a2940543b15d05a7ce3202e/2026-GHG-conversion-factors-methodology-report.pdf) explains that activity data can be multiplied by conversion factors, distinguishes tank-to-wheel (`TTW`) from well-to-tank (`WTT`) emissions, and documents the passenger-land-transport calculations.

## Route distance

1. The server geocodes the origin and destination with the public [Nominatim API](https://nominatim.org/release-docs/latest/api/Search/).
2. It sends the two coordinates to the [OSRM route service](https://project-osrm.org/docs/v5.24.0/api/#route-service).
3. OSRM’s road distance in metres is divided by 1,000 to produce kilometres.
4. If either public service is unavailable, the user can enter a known road distance manually.

The public Nominatim service has a strict [usage policy](https://operations.osmfoundation.org/policies/nominatim/). A production deployment with significant traffic should use a commercial provider or a self-hosted geocoder and router, add caching, and retain OpenStreetMap attribution.

## Boundary and limitations

- Results are per vehicle, not per passenger. To allocate shared-car emissions per passenger, divide the trip result by actual occupancy.
- Walking is zero only within the operational-travel boundary.
- Vehicle manufacturing, battery production, road construction, maintenance, tyre/brake wear, and disposal are excluded.
- Petrol-car and motorcycle values represent UK fleet averages. They are useful defaults, not a vehicle-specific test.
- Electric-vehicle results are especially sensitive to the electricity grid. The electric-car factor reflects the UK grid; the electric-motorcycle value is explicitly a proxy.
- The router currently uses a road-driving profile for all modes. Walking distance may differ because footpaths and pedestrian restrictions are not represented by that profile.
- Real trips vary with traffic, speed, terrain, weather, driving style, vehicle condition and route changes.

## Recommended next research step for Indonesia

Before treating GreenRoute as an Indonesia-specific reporting tool, replace the electricity assumptions with the latest official factor for the relevant PLN grid (for example, Jamali rather than a national average), validate motorcycle energy use using locally sold models, and add Indonesian fleet-specific petrol-car and motorcycle factors. Store the factor year, geography, system boundary and source alongside every result so that estimates remain reproducible.
