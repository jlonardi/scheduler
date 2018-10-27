import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import { RESET } from '../actions';

export default function reducers() {
  const appReducer = combineReducers({
    tasks: taskReducer,
  });

  const rootReducer = (state, action) => {
    const resetState = action.type === RESET;
    const nextState = resetState ? undefined : state;
    return appReducer(nextState, action);
  };

  return rootReducer;
}
