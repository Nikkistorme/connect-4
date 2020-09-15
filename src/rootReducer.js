import { combineReducers } from 'redux';

import session from './session/reducer';
import board from './board/reducer';

const rootReducer = combineReducers({
  session,
  board
});

export default rootReducer;