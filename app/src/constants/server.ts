import ENV from "../../env";
import { DEBUG } from "./app"

export const webSocketServer = DEBUG ? 'http://10.0.2.2:3000' : ENV.gameServer;