export const http = (fetch: (url: string) => Promise<any>) => (baseUrl: string) =>
  (url: string) =>
    fetch(`${baseUrl}${url}`).then(handleApiResponse);

export type HttpFunction = ReturnType<ReturnType<typeof http>>;

export async function handleApiResponse(res: Response) {
  return getJsonOrText(res).then((value) => {
    if (res.ok) {
      return value;
    } else {
      throw value;
    }
  });
}

async function getJsonOrText(res: Response) {
  return res.text().then((text) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  });
}
