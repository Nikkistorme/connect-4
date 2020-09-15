import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { setBoard, changeWinner } from '../board/actions';
import { toggleGame } from '../session/actions';

const DashBox = styled(Box)({
  width: '100%',
  padding: '30px 50px'
});

class Dashboard extends Component {
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
    this.props.changeWinner(0);
    this.props.toggleGame();
  }
  render() {
    let message;
    if (!this.props.gameActive) {
      message = <h2> Start a new game to play! </h2>
    } else if (this.props.winner === 1) {
      message = <h2>Red Player won!</h2>
    } else if (this.props.winner === 2) {
      message = <h2>Yellow Player won!</h2>
    } else if (this.props.turnOne) {
      message = <h2>Red Player's turn</h2>
    } else if (!this.props.turnOne) {
      message = <h2>Yellow Player's turn</h2>
    }
    return (
      <DashBox>
        <Box>
          { message }
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.newGame()}
        >{this.props.gameActive ? 'Reset board' : 'Start new game'}</Button>
      </DashBox>
    )
  }
}

const mapStateToProps = (state) => ({
  gameActive: state.session.gameActive,
  board: state.game.board,
  turnOne: state.game.turnOne,
  winner: state.game.winner
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setBoard,
  toggleGame,
  changeWinner
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
