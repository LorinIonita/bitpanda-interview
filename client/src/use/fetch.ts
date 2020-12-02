export const create = async <T>(url: string, data: Record<string, unknown>): Promise<T> => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.ok) {
    return <Promise<T>>resp.json();
  }

  throw new Error('An generic error has been encountered');
};

export const read = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url);

  if (resp.ok) {
    return <Promise<T>>resp.json();
  }

  throw new Error('An generic error has been encountered');
};

export const remove = async (url: string, identifier: string): Promise<void> => {
  const resp = await fetch(`${url}/${identifier}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    throw new Error('An generic error has been encountered');
  }
};

export const update = async <T>(
  url: string, identifier: string, data: Record<string, unknown>,
): Promise<T> => {
  const resp = await fetch(`${url}/${identifier}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.ok) {
    return <Promise<T>>resp.json();
  }

  throw new Error('An generic error has been encountered');
};
