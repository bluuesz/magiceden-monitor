import fetch from 'node-fetch';

const request = async <T>(endpoint: string /* method: 'POST' | 'GET' */) => {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as T;

  if (response.ok) {
    return data;
  }
  return Promise.reject(new Error(`No data"`));
};

export { request };
