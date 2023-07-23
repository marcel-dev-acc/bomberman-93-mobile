const _bomb = require('../../../assets/icons/bomb.png');
const _arrowUp = require('../../../assets/icons/arrow-up.png');
const _arrowDown = require('../../../assets/icons/arrow-down.png');
const _arrowLeft = require('../../../assets/icons/arrow-left.png');
const _arrowRight = require('../../../assets/icons/arrow-right.png');
const _fire = require('../../../assets/icons/fire.png');
const _reload = require('../../../assets/icons/reload.png');
const _runFast = require('../../../assets/icons/run-fast.png');
const _bombOff = require('../../../assets/icons/bomb-off.png');
const _accessPointMinus = require('../../../assets/icons/access-point-minus.png');
const _arrowULeftBottom = require('../../../assets/icons/arrow-u-left-bottom.png');
const _timer = require('../../../assets/icons/timer.png');
const _pause = require('../../../assets/icons/pause.png');
const _screenRotation = require('../../../assets/icons/screen-rotation.png');
const _faceMan = require('../../../assets/icons/face-man.png');
const _faceWoman = require('../../../assets/icons/face-woman.png');
const _robot = require('../../../assets/icons/robot.png');
const _help = require('../../../assets/icons/help.png');
const _play = require('../../../assets/icons/play.png');
const _dotsVertical = require('../../../assets/icons/dots-vertical.png');
const _close = require('../../../assets/icons/close.png');
const _exitRun = require('../../../assets/icons/exit-run.png');
const _timerSandEmpty = require('../../../assets/icons/timer-sand-empty.png');
const _connection = require('../../../assets/icons/connection.png');
const _music = require('../../../assets/icons/music.png');
const _musicOff = require('../../../assets/icons/music-off.png');

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
      return _bomb;
    case Icons.arrowUp:
      return _arrowUp;
    case Icons.arrowDown:
      return _arrowDown;
    case Icons.arrowLeft:
      return _arrowLeft;
    case Icons.arrowRight:
      return _arrowRight;
    case Icons.fire:
      return _fire;
    case Icons.reload:
      return _reload;
    case Icons.runFast:
      return _runFast;
    case Icons.bombOff:
      return _bombOff;
    case Icons.accessPointMinus:
      return _accessPointMinus;
    case Icons.arrowULeftBottom:
      return _arrowULeftBottom;
    case Icons.timer:
      return _timer;
    case Icons.pause:
      return _pause;
    case Icons.screenRotation:
      return _screenRotation;
    case Icons.faceMan:
      return _faceMan;
    case Icons.faceWoman:
      return _faceWoman;
    case Icons.robot:
      return _robot;
    case Icons.help:
      return _help;
    case Icons.play:
      return _play;
    case Icons.dotsVertical:
      return _dotsVertical;
    case Icons.close:
      return _close;
    case Icons.exitRun:
      return _exitRun;
    case Icons.timerSandEmpty:
      return _timerSandEmpty;
    case Icons.connection:
      return _connection;
    case Icons.music:
      return _music;
    case Icons.musicOff:
      return _musicOff;
    default:
      return _bomb;
  }
};
