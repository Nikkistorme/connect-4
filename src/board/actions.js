export function setBoard(data) {
  return {
    type: 'SET_BOARD',
    data
  }
}

export function changeTurn() {
  return {
    type: 'CHANGE_TURN'
  }
}

export function changeWinner(data) {
  return {
    type: 'CHANGE_WINNER',
    data
  }
}
