import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  /* height: 100px; */
`;

export default function Header () {
  return(
    <HeaderContainer>
      <h1>Connect 4</h1>
    </HeaderContainer>
  );
}