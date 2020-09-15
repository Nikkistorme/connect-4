const initialState = {
  board: [],
  turnOne: true,
  winner: 0
}

export default function (state = initialState, action) {
  const { type, data } = action;
  switch(type) {
    case 'SET_BOARD':
      return {
        ...state,
        board: data
      };
    case 'CHANGE_TURN':
      return {
        ...state,
        turnOne: !state.turnOne
      }
    case 'CHANGE_WINNER':
      return {
        ...state,
        winner: data
      }
    default:
      return state;
  }
}
