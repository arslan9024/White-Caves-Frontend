/**
 * Dubai luxury map bounding-box validator (Point 51).
 */
export function isWithinDubaiBounds(lat: number, lng: number): boolean {
  return lat >= 24.7 && lat <= 25.4 && lng >= 54.8 && lng <= 55.6;
}

