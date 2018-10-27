import { v4 } from 'uuid';
import { ADD_TASK, UPDATE_TASK_CONSUMATION, REMOVE_TASK, REPLACE_TASKS } from '../actions';
import { timeToMs } from '../utils/time';

const initialState = [];

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case UPDATE_TASK_CONSUMATION:
      return state.map(task => (task.id === action.id ? { ...task, consumed: action.consumed } : task));
    case REPLACE_TASKS:
      return action.payload;
    case REMOVE_TASK:
      return state.filter(x => x.id !== action.id);
    default:
      return state;
  }
}

export default taskReducer;

