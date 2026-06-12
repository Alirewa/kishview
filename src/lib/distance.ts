/** Haversine distance in km between two [lng, lat] points */
export function haversineKm(
  [lng1, lat1]: [number, number],
  [lng2, lat2]: [number, number],
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function fmtDistance(km: number, fa: boolean): string {
  if (km < 1) return fa ? `${Math.round(km * 1000)} متر` : `${Math.round(km * 1000)} m`;
  return fa ? `${km.toFixed(1)} کیلومتر` : `${km.toFixed(1)} km`;
}

/** Rough driving time estimate (city roads ~30 km/h average) */
export function estDriveMin(km: number): number {
  return Math.round((km / 30) * 60);
}
