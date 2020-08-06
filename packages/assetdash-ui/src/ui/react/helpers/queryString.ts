export function getQueryParam(name: string, location: any) {
  return new URLSearchParams(location.search).get(name);
}
