enum SocketTypes {
  connectionError = 'connect_error',
  connection = 'connection',
  createSession = 'createSession',
  createSessionPositiveResponse = 'createSessionResponse',
  createSessionNegativeResponse = 'createSessionNegativeResponse',
  joinSession = 'joinSession',
  joinSessionPositiveResponse = 'joinSessionPositiveResponse',
  joinSessionNegativeResponse = 'joinSessionNegativeResponse',
  move = 'move',
  movePositiveResponse = 'movePositiveResponse',
  moveNegativeResponse = 'moveNegativeResponse',
  event = 'event',
  eventPositiveResponse = 'eventPositiveResponse',
  eventNegativeResponse = 'eventNegativeResponse',
  state = 'state',
  stateNegativeResponse = 'stateNegativeResponse',
  statePositiveResponse = 'statePositiveResponse',
  tick = 'tick',
  tickPositiveResponse = 'tickPositiveResponse',
  tickNegativeResponse = 'tickNegativeResponse',
  disconnect = 'disconnect',
  disconnectPositiveResponse = 'disconnectPositiveResponse',
  disconnectNegativeResponse = 'disconnectNegativeResponse',
};

export default SocketTypes;