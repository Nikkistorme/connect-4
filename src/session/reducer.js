const initialState = {
  gameActive: true
}

export default function (state = initialState, action) {
  const { type } = action;
  switch(type) {
    case 'TOGGLE_GAME':
      return {
        ...state,
        gameActive: !state.gameActive
      };
    default:
      return state;
  }
}
