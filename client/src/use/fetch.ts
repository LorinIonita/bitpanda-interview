export const create = (
  url: string, data: Record<string, unknown>,
): Promise<Response> => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export const read = (url: string): Promise<Response> => fetch(url);

export const remove = (
  url: string, identifier: string,
): Promise<Response> => fetch(`${url}/${identifier}`, {
  method: 'DELETE',
});

export const update = (
  url: string, identifier: string, data: Record<string, unknown>,
): Promise<Response> => fetch(`${url}/${identifier}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
