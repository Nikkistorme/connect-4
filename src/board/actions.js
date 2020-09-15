export function setBoard(data) {
  return {
    type: 'SET_BOARD',
    data
  }
}

export function changeTurn(data) {
  return {
    type: 'CHANGE_TURN',
    data
  }
}