export const create = async <T>(
  url: string, data: Record<string, unknown>,
): Promise<T> => await (fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((resp) => {
  if (resp.ok) {
    return resp.json();
  }

  throw new Error('An generic error has been encountered');
})) as T;

export const read = async <T>(
  url: string,
): Promise<T> => await (fetch(url).then((resp) => {
  if (resp.ok) {
    return resp.json();
  }

  throw new Error('An generic error has been encountered');
})) as T;

export const remove = async <T>(
  url: string, identifier: string,
): Promise<T> => await (fetch(`${url}/${identifier}`, {
  method: 'DELETE',
}).then((resp) => {
  if (resp.ok) {
    return resp.json();
  }

  throw new Error('An generic error has been encountered');
})) as T;

export const update = async <T>(
  url: string, identifier: string, data: Record<string, unknown>,
): Promise<T> => await (fetch(`${url}/${identifier}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((resp) => {
  if (resp.ok) {
    return resp.json();
  }

  throw new Error('An generic error has been encountered');
})) as T;
