import React from 'react';
import styled from 'styled-components';

import './App.css';
import Board from './components/Board';

const HeaderContainer = styled.header`
  height: 100px;
`;

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <div className="App">
      <HeaderContainer>
      </HeaderContainer>
      <MainContainer>
        <Board />
      </MainContainer>
    </div>
  );
}

export default App;
