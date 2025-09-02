import infrastructure from '@/infrastructure/index.ts';
import { LocalStorageKeys } from '@/infrastructure/localstorage/consts.ts';

const IGNORE_PATHS = [
  'auth/register',
  'auth/login',
  'auth/code',
  'auth/refresh',
];

async function query<T>(
  path: string,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  options?: any
) {
  let needAuth = false;

  if (!IGNORE_PATHS.includes(path)) {
    needAuth = true;
  }

  // @ts-ignore
  const url = new URL(window.VUE_APP_API_URL + path);

  if (options?.query) {
    for (let key of Object.keys(options.query)) {
      url.searchParams.set(key, options.query[key]);
    }
  }

  const token =
    infrastructure.localstorage.getItem(LocalStorageKeys.ACCESS_TOKEN) || '';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(needAuth && { Authorization: 'Bearer ' + token }),
    },
    ...(options?.body && { body: JSON.stringify(options.body) }),
  });
  if (response.status === 400 || response.status === 500) {
    return await new Promise(async (resolve, reject) =>
      reject(await response.json())
    );
  }
  if (response.status === 401) {
    const refresh =
      infrastructure.localstorage.getItem(LocalStorageKeys.REFRESH_TOKEN) || '';
    try {
      const { access } = await infrastructure.auth.getByRefresh({
        refresh: refresh,
      });
      infrastructure.localstorage.setItem(
        LocalStorageKeys.ACCESS_TOKEN,
        access
      );
      window.location.reload();
    } catch (error) {
      window.location.href = '/login';
      return;
    }
  }
  return await response.json();
}

export default query;
