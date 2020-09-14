import React from 'react';
import styled from 'styled-components';

const SlotContainer = styled.div`
  align-self: center;
  justify-self: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: white;
  &.player-one {
    background-color: red;
  }
  &.player-two {
    background-color: blue;
  }
`;

export default class Slot extends React.Component {
  // constructor() {
  //   super()
  //   let dimensionUrl = '';
  // }
  // componentDidMount() {
  //   fetch("https://picsum.photos/200")
  //   .then(res => {
  //     this.dimensionUrl = res.url;
  //   })
  // }
  render() {
    return(
      <SlotContainer
        className={`${this.props.filled === 1 ? 'player-one' : ''} ${this.props.filled === 2 ? 'player-two' : ''}`}
      />
    )
  }
}