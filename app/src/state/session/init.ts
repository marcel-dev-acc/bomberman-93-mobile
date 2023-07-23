import {Avatar, Session} from '../../types/session'

const defaultAvatar: Avatar = {
  gender: 'male',
}

const initialState: Session = {
  name: '',
  playerNumber: 1,
  winner: undefined,
  players: [
    {
      number: 1,
      name: 'Player 1',
      isActive: true,
      isReal: true,
      avatar: defaultAvatar,
    },
    {
      number: 2,
      name: 'Player 2',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
    {
      number: 3,
      name: 'Player 3',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
    {
      number: 4,
      name: 'Player 4',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
    {
      number: 5,
      name: 'Player 5',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
  ],
}

export default initialState
