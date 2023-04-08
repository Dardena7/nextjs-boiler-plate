let accessToken = null;
let managementAccessToken = null;

self.addEventListener('message', async (event) => {
  const { type, value } = event.data;
  switch (type) {
    case 'getAccessToken':
      self.postMessage({ type: 'accessToken', value: accessToken });
      break;
    case 'setAccessToken':
      accessToken = value;
      break;
    case 'getManagementAccessToken':
      self.postMessage({ type: 'accessTokenManagement', value: managementAccessToken });
      break;
    case 'setManagementAccessToken':
      managementAccessToken = value;
      break;
    default:
      break;
  }
});