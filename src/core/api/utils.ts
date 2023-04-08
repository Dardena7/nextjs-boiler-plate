import { AxiosStatic } from 'axios';
import jwtDecode from 'jwt-decode'

const getAccessTokenWorker = (() => {
  let worker: Worker | null = null;
  return () => {
    if (!worker) {
      worker = new Worker('/token-worker.js');
    }
    return worker;
  };
})();

const hasValidToken = (token: string | null) => {
  if (!token) return false;

  const parsedToken = jwtDecode<{ exp: number }>(token);
  const now = new Date();
  const exp = new Date(parsedToken.exp * 1000); //exp timestamp is in seconds
  exp.setHours(exp.getHours() - 1); //So we invalidate before it really expires

  return now.getTime() < exp.getTime();
};

const getTokenUrl = (type?: string) => {
  switch(type) {
    case 'management':
      return '/api/auth/management-token';
    default:
      return '/api/auth/token';
  }
}

const getMessageType = (action: 'set' | 'get', type?: string) => {
  switch(type) {
    case 'management':
      return action === 'get' ? 'getManagementAccessToken' : 'setManagementAccessToken';
    default:
      return action === 'get' ? 'getAccessToken' : 'setAccessToken';
  }
}

export const getAccessToken = async (axios: AxiosStatic, type?: string) => {
  const tokenWorker = getAccessTokenWorker();

   const accessTokenPromise = new Promise((resolve) => {
      tokenWorker.addEventListener('message', (event) => {
        const { type, value } = event.data;
        if (type === 'accessToken') {
          resolve(value);
        }
      });
      tokenWorker.postMessage({ type: getMessageType('get', type) });
    });

    let accessToken = await accessTokenPromise as string;

    if (!hasValidToken(accessToken)) {
      const returnObject = await axios.get(getTokenUrl(type));
      accessToken = returnObject?.data?.accessToken;
      if (!!accessToken) tokenWorker.postMessage({ type: getMessageType('set', type), value: accessToken });
    }

    return accessToken;
}