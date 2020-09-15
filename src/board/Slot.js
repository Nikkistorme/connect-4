import React from 'react';

import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const SlotContainer = styled(Box)({
  width: 70,
  height: 70,
  borderRadius: '50%',
  backgroundColor: 'white',
  '&.player-one': {
    backgroundColor: '#f60000'
  },
  '&.player-two': {
    backgroundColor: '#eabf42'
  }
});

export default class Slot extends React.Component {
  render() {
    return(
      <SlotContainer
        className={`${this.props.filled === 1 ? 'player-one' : ''} ${this.props.filled === 2 ? 'player-two' : ''}`}
      />
    )
  }
}