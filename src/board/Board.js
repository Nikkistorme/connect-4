import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { setBoard } from './actions';
import { toggleGame } from '../session/actions'

import Slot from './Slot'

const ConnectFourBoard = styled.div`
  display: flex;
  height: 525px;
  width: 750px;
  border-radius: 20px;
  background-color: #031f9c;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

class Board extends React.Component {
  state = {
    playerOnesTurn: true,
  }
  // start a new game on page load
  componentDidMount() {
    this.newGame();
  }
  // creates a fresh board
  newGame = () => {
    let board = [];
    for (let x = 0; x < 7; x++) {
      let row = [];
      for (let y = 0; y < 6; y++) {
        let slot = {
          filled: 0,
          coordinate: [x,y]
        }
        row.push(slot)
      }
      board.push(row);
    }
    this.props.setBoard(board);
  }
  // takes in a column index and possible drops a token
  dropToken = (targetColumnIndex) => {
    if (!this.props.gameActive) {
      return false;
    } else {
      let landingSlot = {}
      let board = [...this.props.board];
      let playerOnesTurn = this.state.playerOnesTurn ? true : false;
      for (let x = 0; x < board[targetColumnIndex].length; x++) {
        // if it's unfilled and the final slot
        if (board[targetColumnIndex][x].filled === 0 && !board[targetColumnIndex][x+1]) {
          board[targetColumnIndex][x].filled = this.state.playerOnesTurn ? 1 : 2;
          landingSlot = board[targetColumnIndex][x];
          break;
        // if it's unfilled and not the final slot
        } else if (board[targetColumnIndex][x].filled === 0 && board[targetColumnIndex][x+1].filled !== 0) {
          board[targetColumnIndex][x].filled = this.state.playerOnesTurn ? 1 : 2;
          landingSlot = board[targetColumnIndex][x];
          break;
        }
      }
      // check if the player just won the game
      if (this.checkWin(landingSlot)) {
        console.log(`player ${landingSlot.filled} won!`)
        this.props.setBoard(board);
        this.props.toggleGame();
      } else {
        playerOnesTurn = !playerOnesTurn;
        this.setState({ playerOnesTurn })
        this.props.setBoard(board);
      }
    }
  }
  // take in the freshly placed slot, run through win checkers, and return boolean
  checkWin = (slot) => {
    if (this.checkVerticalWin(slot) || this.checkHorizontalWin(slot) || this.checkPositiveDiagonalWin(slot) || this.checkNegativeDiagonalWin(slot)) {
      return true;
    } else {
      return false;
    }
  }
  // take in a slot, check if it wins vertically
  checkVerticalWin = (slot) => {
    let slotsBelow = 5 - slot.coordinate[1];
    const winnersDown = this.findSlotsInLine('down', slot, slotsBelow)
    if (winnersDown >= 3) {
      return true;
    } else {
      return false
    }
  }
  // take in a slot, check if it wins horizontally
  checkHorizontalWin = (slot) => {
    let slotsToLeft = slot.coordinate[0];
    let slotsToRight = 6 - slot.coordinate[0];
    const winnersLeft = this.findSlotsInLine('left', slot, slotsToLeft);
    const winnersRight = this.findSlotsInLine('right', slot, slotsToRight);
    if (winnersLeft + winnersRight >= 3) {
      return true;
    } else {
      return false
    }
  }
  // take in a slot, check if it wins in a diagonal with a positive slope
  checkPositiveDiagonalWin = (slot) => {
    let slotsToRight = 6 - slot.coordinate[0];
    let slotsToLeft = slot.coordinate[0];
    const winnersUpRight = this.findSlotsInLine('up-right', slot, slotsToRight);
    const winnersDownLeft = this.findSlotsInLine('down-left', slot, slotsToLeft);
    if (winnersUpRight + winnersDownLeft >= 3) {
      return true;
    } else {
      return false
    }
  }
  // take in a slot, check if it wins in a diagonal with a negative slope
  checkNegativeDiagonalWin = (slot) => {
    let slotsToLeft = slot.coordinate[0];
    let slotsToRight = 6 - slot.coordinate[0];
    const winnersUpLeft = this.findSlotsInLine('up-left', slot, slotsToLeft);
    const winnersDownRight = this.findSlotsInLine('down-right', slot, slotsToRight);
    if (winnersUpLeft + winnersDownRight >= 3) {
      return true;
    } else {
      return false
    }
  }
  // take in a direction, slot, and range
  // loop a number of times equal to the range
  // use direction and slot to determine how to find the adjacent slots to inspect
  // if the passed in slot and the adjacentSlot are filled by the same player, add to the counter
  // return the counter
  findSlotsInLine = (direction, newSlot, range) => {
    const board = [...this.props.board]
    let counter = 0;
    for (let x = 0; x < range; x++) {
      let adjacentSlot = {};
      switch (direction) {
        case 'down':
        default:
          adjacentSlot = board[newSlot.coordinate[0]][newSlot.coordinate[1] + 1 + x];
          break;
        case 'left':
          adjacentSlot = board[newSlot.coordinate[0] - 1 - x][newSlot.coordinate[1]];
          break;
        case 'right':
          adjacentSlot = board[newSlot.coordinate[0] + 1 + x][newSlot.coordinate[1]];
          break;
        case 'up-right':
          adjacentSlot = board[newSlot.coordinate[0] + 1 + x][newSlot.coordinate[1] - 1 - x];
          break;
        case 'down-left':
          adjacentSlot = board[newSlot.coordinate[0] - 1 - x][newSlot.coordinate[1] + 1 + x];
          break;
        case 'down-right':
          adjacentSlot = board[newSlot.coordinate[0] + 1 + x][newSlot.coordinate[1] + 1 + x];
          break;
        case 'up-left':
          adjacentSlot = board[newSlot.coordinate[0] - 1 - x][newSlot.coordinate[1] - 1 - x];
          break;
      }
      if (!adjacentSlot) {
        break;
      } else if (adjacentSlot.filled === newSlot.filled) {
        counter += 1;
      } else {
        break;
      }
    }
    return counter;
  }
  render() {
    return (
      <ConnectFourBoard>
        {this.props.board.map((column, index) =>
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

const mapStateToProps = (state) => ({
  gameActive: state.session.gameActive,
  board: state.board.board
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleGame,
  setBoard
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board);
