export interface TimezoneGroup {
  items: {
    index: number;
    zone: string;
  }[];
  region: string;
}

export function getTimezoneGroups(
  zones: readonly string[],
  query: string,
): TimezoneGroup[] {
  const search = normalize(query.trim());
  const matches = search
    ? zones.filter((zone) => normalize(zone).includes(search))
    : zones;

  let index = 0;
  return Array.from(Map.groupBy(matches, zoneRegion), ([region, items]) => ({
    items: items.map((zone) => ({ index: index++, zone })),
    region,
  }));
}

export function normalize(text: string): string {
  return text.replaceAll('_', ' ').toLowerCase();
}

export function zoneLabel(zone: string): string {
  return zone.slice(zone.lastIndexOf('/') + 1).replaceAll('_', ' ');
}

export function zoneRegion(zone: string): string {
  const separator = zone.indexOf('/');
  return separator === -1 ? 'Other' : zone.slice(0, separator);
}
