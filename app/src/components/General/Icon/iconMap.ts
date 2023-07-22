const bomb = require('../../../assets/icons/bomb.png');
const arrowUp = require('../../../assets/icons/arrow-up.png');
const arrowDown = require('../../../assets/icons/arrow-down.png');
const arrowLeft = require('../../../assets/icons/arrow-left.png');
const arrowRight = require('../../../assets/icons/arrow-right.png');
const fire = require('../../../assets/icons/fire.png');
const reload = require('../../../assets/icons/reload.png');
const runFast = require('../../../assets/icons/run-fast.png');
const bombOff = require('../../../assets/icons/bomb-off.png');
const accessPointMinus = require('../../../assets/icons/access-point-minus.png');
const arrowULeftBottom = require('../../../assets/icons/arrow-u-left-bottom.png');
const timer = require('../../../assets/icons/timer.png');
const pause = require('../../../assets/icons/pause.png');
const screenRotation = require('../../../assets/icons/screen-rotation.png');
const faceMan = require('../../../assets/icons/face-man.png');
const faceWoman = require('../../../assets/icons/face-woman.png');
const robot = require('../../../assets/icons/robot.png');
const help = require('../../../assets/icons/help.png');
const play = require('../../../assets/icons/play.png');
const dotsVertical = require('../../../assets/icons/dots-vertical.png');
const close = require('../../../assets/icons/close.png');
const exitRun = require('../../../assets/icons/exit-run.png');
const timerSandEmpty = require('../../../assets/icons/timer-sand-empty.png');
const connection = require('../../../assets/icons/connection.png');
const music = require('../../../assets/icons/music.png');
const musicOff = require('../../../assets/icons/music-off.png');

export enum Icons {
  bomb = 'bomb',
  arrowUp = 'arrow-up',
  arrowDown = 'arrow-down',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  fire = 'fire',
  reload = 'reload',
  runFast = 'run-fast',
  bombOff = 'bomb-off',
  accessPointMinus = 'access-point-minus',
  arrowULeftBottom = 'arrow-u-left-bottom',
  timer = 'timer',
  pause = 'pause',
  screenRotation = 'screen-rotation',
  faceMan = 'face-man',
  faceWoman = 'face-woman',
  robot = 'robot',
  help = 'help',
  play = 'play',
  dotsVertical = 'dots-vertical',
  close = 'close',
  exitRun = 'exit-run',
  timerSandEmpty = 'timer-sand-empty',
  connection = 'connection',
  music = 'music',
  musicOff = 'music-off',
}

export const getIconImage = (name: Icons) => {
  switch (name) {
    case Icons.bomb:
      return bomb;
    case Icons.arrowUp:
      return arrowUp;
    case Icons.arrowDown:
      return arrowDown;
    case Icons.arrowLeft:
      return arrowLeft;
    case Icons.arrowRight:
      return arrowRight;
    case Icons.fire:
      return fire;
    case Icons.reload:
      return reload;
    case Icons.runFast:
      return runFast;
    case Icons.bombOff:
      return bombOff;
    case Icons.accessPointMinus:
      return accessPointMinus;
    case Icons.arrowULeftBottom:
      return arrowULeftBottom;
    case Icons.timer:
      return timer;
    case Icons.pause:
      return pause;
    case Icons.screenRotation:
      return screenRotation;
    case Icons.faceMan:
      return faceMan;
    case Icons.faceWoman:
      return faceWoman;
    case Icons.robot:
      return robot;
    case Icons.help:
      return help;
    case Icons.play:
      return play;
    case Icons.dotsVertical:
      return dotsVertical;
    case Icons.close:
      return close;
    case Icons.exitRun:
      return exitRun;
    case Icons.timerSandEmpty:
      return timerSandEmpty;
    case Icons.connection:
      return connection;
    case Icons.music:
      return music;
    case Icons.musicOff:
      return musicOff;
    default:
      return bomb;
  }
};
