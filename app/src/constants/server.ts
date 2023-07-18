import ENV from "../../env";
import { DEBUG } from "./app"

// export const webSocketServer = DEBUG ? 'http://10.0.2.2:3000' : ENV.gameServer;
// export const webSocketServer = ENV.gameServer;

interface GetServerUrl {
  ok: boolean;
  serverUrl?: string;
  message?: string;
}

const getServerUrl = async (): Promise<GetServerUrl | undefined> => {
  const webSocketUrlStorageUrl = `${ENV.serverUrlStorageUrl}?token=${ENV.serverUrlStorageAccessToken}`;
  try {
    const res = await fetch(webSocketUrlStorageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow'
    } as any);
    return await res.json();
  } catch (err) {
    return undefined;
  }
};

export const webSocketServer = async (): Promise<string | undefined> => {
  if (DEBUG) return 'http://0.0.0.0:3000'

  const res = await getServerUrl();
  if (!res || !res?.ok) return undefined;
  return res?.serverUrl;
};