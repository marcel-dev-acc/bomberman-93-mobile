export interface AndroidGamepadProfile {
  profileName: string;
  deviceId: number;
  selected: boolean;
  bombKey?: number;
  upKey?: number;
  downKey?: number;
  leftKey?: number;
  rightKey?: number;
}
