import axios from 'axios';

import ENV from '../../env';
import {DEBUG} from './app';

const getServerUrl = async (): Promise<string | undefined> => {
  const webSocketUrlStorageUrl = `${ENV.serverUrlStorageUrl}?token=${ENV.serverUrlStorageAccessToken}`;
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: webSocketUrlStorageUrl,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data?.serverUrl;
  } catch (err) {
    return undefined;
  }
};

export const webSocketServer = async (): Promise<string | undefined> => {
  if (DEBUG) {
    // return 'http://10.0.2.2:3000';
  }

  return await getServerUrl();
};
