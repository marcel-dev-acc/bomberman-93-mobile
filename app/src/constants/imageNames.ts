const imageNames = {
  introImage: require('../assets/images/introduction.gif'),
  animatedBackground: require('../assets/images/animated-background.jpg'),
  bomb: require('../assets/images/bomb.png'),
  brick: require('../assets/images/brick.png'),

  fireEffectSprite: require('../assets/images/fire-effect-sprite.png'),
  bomberBlackInvertedSprite: require('../assets/images/bomber-black-inverted-sprite.png'),
  bomberBlackSprite: require('../assets/images/bomber-black-sprite.png'),
  bomberBlueInvertedSprite: require('../assets/images/bomber-blue-inverted-sprite.png'),
  bomberBlueSprite: require('../assets/images/bomber-blue-sprite.png'),
  bomberGreenInvertedSprite: require('../assets/images/bomber-green-inverted-sprite.png'),
  bomberGreenSprite: require('../assets/images/bomber-green-sprite.png'),
  bomberRedInvertedSprite: require('../assets/images/bomber-red-inverted-sprite.png'),
  bomberRedSprite: require('../assets/images/bomber-red-sprite.png'),
  bomberWhiteInvertedSprite: require('../assets/images/bomber-white-inverted-sprite.png'),
  bomberWhiteSprite: require('../assets/images/bomber-white-sprite.png'),

  controlsText: require('../assets/images/controls-text.png'),
  createSessionText: require('../assets/images/create-session-text.png'),
  joinSessionText: require('../assets/images/join-session-text.png'),
  enterText: require('../assets/images/enter-text.png'),
  sessionNameText: require('../assets/images/session-name-text.png'),
  startGameText: require('../assets/images/start-game-text.png'),
  gameWillStartInText: require('../assets/images/game-will-start-in-text.png'),
  playersText: require('../assets/images/players-text.png'),
  youArePlayer1Text: require('../assets/images/you-are-player-1-text.png'),
  youArePlayer2Text: require('../assets/images/you-are-player-2-text.png'),
  youArePlayer3Text: require('../assets/images/you-are-player-3-text.png'),
  youArePlayer4Text: require('../assets/images/you-are-player-4-text.png'),
  youArePlayer5Text: require('../assets/images/you-are-player-5-text.png'),
  pleaseRotateText: require('../assets/images/please-rotate-text.png'),
  yourScreenText: require('../assets/images/your-screen-text.png'),
  controlsSettingsText: require('../assets/images/controls-settings-text.png'),
  enableGamepadsText: require('../assets/images/enable-gamepads-text.png'),
  devicesText: require('../assets/images/devices-text.png'),
  keysText: require('../assets/images/keys-text.png'),
  profilesText: require('../assets/images/profiles-text.png'),
  playAgainText: require('../assets/images/play-again-text.png'),
  theWinnerIsText: require('../assets/images/the-winner-is-text.png'),
  forEducationalPurposesOnlyText: require('../assets/images/for-educational-purposes-only-text.png'),
  registerText: require('../assets/images/register-text.png'),
  registerPart1Text: require('../assets/images/registration-part-1-text.png'),
  registerPart2Text: require('../assets/images/registration-part-2-text.png'),
  registerPart3Text: require('../assets/images/registration-part-3-text.png'),
  enterEmailText: require('../assets/images/enter-email-text.png'),
  submitText: require('../assets/images/submit-text.png'),
  codeText: require('../assets/images/code-text.png'),
  deregisterText: require('../assets/images/deregister-text.png'),
  settingsText: require('../assets/images/settings-text.png'),

  zeroText: require('../assets/images/0-text.png'),
  oneText: require('../assets/images/1-text.png'),
  twoText: require('../assets/images/2-text.png'),
  threeText: require('../assets/images/3-text.png'),
  fourText: require('../assets/images/4-text.png'),
  fiveText: require('../assets/images/5-text.png'),
  sixText: require('../assets/images/6-text.png'),
  sevenText: require('../assets/images/7-text.png'),
  eightText: require('../assets/images/8-text.png'),
  nineText: require('../assets/images/9-text.png'),
  aText: require('../assets/images/a-text.png'),
  bText: require('../assets/images/b-text.png'),
  cText: require('../assets/images/c-text.png'),
  dText: require('../assets/images/d-text.png'),
  eText: require('../assets/images/e-text.png'),
  fText: require('../assets/images/f-text.png'),
  gText: require('../assets/images/g-text.png'),
  hText: require('../assets/images/h-text.png'),
  iText: require('../assets/images/i-text.png'),
  jText: require('../assets/images/j-text.png'),
  kText: require('../assets/images/k-text.png'),
  lText: require('../assets/images/l-text.png'),
  mText: require('../assets/images/m-text.png'),
  nText: require('../assets/images/n-text.png'),
  oText: require('../assets/images/o-text.png'),
  pText: require('../assets/images/p-text.png'),
  qText: require('../assets/images/q-text.png'),
  rText: require('../assets/images/r-text.png'),
  sText: require('../assets/images/s-text.png'),
  tText: require('../assets/images/t-text.png'),
  uText: require('../assets/images/u-text.png'),
  vText: require('../assets/images/v-text.png'),
  wText: require('../assets/images/w-text.png'),
  xText: require('../assets/images/x-text.png'),
  yText: require('../assets/images/y-text.png'),
  zText: require('../assets/images/z-text.png'),
  AText: require('../assets/images/A-cap-text.png'),
  BText: require('../assets/images/B-cap-text.png'),
  CText: require('../assets/images/C-cap-text.png'),
  DText: require('../assets/images/D-cap-text.png'),
  EText: require('../assets/images/E-cap-text.png'),
  FText: require('../assets/images/F-cap-text.png'),
  GText: require('../assets/images/G-cap-text.png'),
  HText: require('../assets/images/H-cap-text.png'),
  IText: require('../assets/images/I-cap-text.png'),
  JText: require('../assets/images/J-cap-text.png'),
  KText: require('../assets/images/K-cap-text.png'),
  LText: require('../assets/images/L-cap-text.png'),
  MText: require('../assets/images/M-cap-text.png'),
  NText: require('../assets/images/N-cap-text.png'),
  OText: require('../assets/images/O-cap-text.png'),
  PText: require('../assets/images/P-cap-text.png'),
  QText: require('../assets/images/Q-cap-text.png'),
  RText: require('../assets/images/R-cap-text.png'),
  SText: require('../assets/images/S-cap-text.png'),
  TText: require('../assets/images/T-cap-text.png'),
  UText: require('../assets/images/U-cap-text.png'),
  VText: require('../assets/images/V-cap-text.png'),
  WText: require('../assets/images/W-cap-text.png'),
  XText: require('../assets/images/X-cap-text.png'),
  YText: require('../assets/images/Y-cap-text.png'),
  ZText: require('../assets/images/Z-cap-text.png'),
  symbolQuestionMarkText: require('../assets/images/symbol-question-mark-text.png'),
  symbolColonText: require('../assets/images/symbol-colon-text.png'),
  symbolFullStopText: require('../assets/images/symbol-full-stop-text.png'),

  arrowUpText: require('../assets/images/arrow-up-text.png'),
  arrowDownText: require('../assets/images/arrow-down-text.png'),
  arrowLeftText: require('../assets/images/arrow-left-text.png'),
  arrowRightText: require('../assets/images/arrow-right-text.png'),

  splashHorizontalWithoutHeader: require('../assets/images/splash-horizontal-without-header.png'),
  splashHorizontal: require('../assets/images/splash-horizontal.png'),
  splashVerticalWithouthHeader: require('../assets/images/splash-vertical-without-header.png'),
  splashVertical: require('../assets/images/splash-vertical.png'),

  winnerLoopRed: require('../assets/images/winner-loop-red.gif'),
  winnerGrassBackground: require('../assets/images/winner-grass-background.png'),
}
export default imageNames
