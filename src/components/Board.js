import React from 'react';
import styled from 'styled-components';

import Slot from './Slot'

const ConnectFourBoard = styled.div`
  /* display: grid; */
  /* grid-template: repeat(6, 1fr) / repeat(7, 1fr); */
  display: flex;
  height: 700px;
  width: 1000px;
  border-radius: 20px;
  background-color: #031f9c;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default class Board extends React.Component {
  state = {
    boardData: [],
    playerOnesTurn: true,
    gameActive: true
  }
  componentDidMount() {
    this.newGame();
  }
  newGame = () => {
    let boardData = [];
    for (let x = 0; x < 7; x++) {
      let row = [];
      for (let y = 0; y < 6; y++) {
        let slot = {
          filled: 0,
          coordinate: [x,y]
        }
        row.push(slot)
      }
      boardData.push(row);
    }
    this.setState({ boardData })
  }
  dropToken = (targetColumnIndex) => {
    console.log('targetColumnIndex', targetColumnIndex);
    let boardData = [...this.state.boardData];
    let playerOnesTurn = this.state.playerOnesTurn ? true : false;
    console.log('playerOnesTurn', playerOnesTurn);
    for (let x = 0; x < boardData[targetColumnIndex].length; x++) {
      // if it's unfilled and the final slot
      if (boardData[targetColumnIndex][x].filled === 0 && !boardData[targetColumnIndex][x+1]) {
        boardData[targetColumnIndex][x].filled = this.state.playerOnesTurn ? 1 : 2;
        break;
      // if it's unfilled and not the final slot
      } else if (boardData[targetColumnIndex][x].filled === 0 && boardData[targetColumnIndex][x+1].filled !== 0) {
        boardData[targetColumnIndex][x].filled = this.state.playerOnesTurn ? 1 : 2;
        break;
      }
    }
    playerOnesTurn = !playerOnesTurn;
    this.setState({ boardData: boardData, playerOnesTurn: playerOnesTurn })
  }
  render() {
    return (
      <ConnectFourBoard>
        {this.state.boardData.map((column, index) =>
          <Column key={index} onClick={() => this.dropToken(index)}>
            {column.map(key =>
              <Slot
                key={`${key.coordinate[0]}-${key.coordinate[1]}`}
                filled={key.filled}
                coordinate={key.coordinate}
              />
            )}
          </Column>
        )}
      </ConnectFourBoard>
    )
  }
}