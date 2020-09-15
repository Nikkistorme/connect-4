const initialState = {
  board: []
}

export default function (state = initialState, action) {
  const { type, data } = action;
  switch(type) {
    case 'SET_BOARD':
      return {
        ...state,
        board: data
      };
    default:
      return state;
  }
}
