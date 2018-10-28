import colors from '../colors';
import { ADD_TASK, UPDATE_TASK_CONSUMATION, REMOVE_TASK, REPLACE_TASKS } from '../actions';


const colorPicker = (state) => {
  const counter = {};

  // counts the amount of each color already in use
  state.forEach(({ color }) => {
    if (counter[color] === undefined) {
      counter[color] = 1;
    } else {
      counter[color] += 1;
    }
  });

  const colorKeys = Object.keys(colors);
  let pickedColor = colorKeys[0];

  colorKeys.forEach((key) => {
    const currentColorInCounter = counter[key] || 0;
    const pickedColorCandidateCount = counter[pickedColor] || 0;
    if (pickedColorCandidateCount >= currentColorInCounter) {
      pickedColor = key;
    }
  });

  return pickedColor;
};

const initialState = [];

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, { ...action.payload, color: colorPicker(state) }];
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
