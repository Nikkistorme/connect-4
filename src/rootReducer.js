import { combineReducers } from 'redux';

import session from './dash/reducer';
import board from './board/reducer';

const rootReducer = combineReducers({
  session,
  board
});

export default rootReducer;