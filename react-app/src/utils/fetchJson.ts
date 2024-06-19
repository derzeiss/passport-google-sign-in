const getJsonInit = (init?: RequestInit): RequestInit => ({
  ...init,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...init?.headers,
  },
});

const cache: Record<string, unknown> = {};

export const fetchJson = <T = unknown>(url: string, init?: RequestInit) => {
  const isGet = !init || !init.method || init.method === 'get';

  if (isGet) {
    const cacheHit = cache[url];
    if (cacheHit) return Promise.resolve(cacheHit) as Promise<T>;
  }

  let promise = fetch(url, getJsonInit(init)).then((res) => {
    if (res.status === 204) return;
    if (!res.ok) return Promise.reject(res);
    return res.json();
  });

  // cache promise + result
  if (isGet) {
    cache[url] = promise;
    promise = promise.then((data) => (cache[url] = data));
  }

  return promise as Promise<T>;
};
