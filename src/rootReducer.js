import { combineReducers } from 'redux';

import session from './session/reducer';
import game from './board/reducer';

const rootReducer = combineReducers({
  session,
  game
});

export default rootReducer;