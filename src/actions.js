import { AsyncStorage } from "react-native"
import { v4 } from "uuid";

export const REPLACE_TASKS = 'REPLACE_TASKS';
export const RESET = "RESET";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK_CONSUMATION = "UPDATE_TASK_CONSUMATION";
export const REMOVE_TASK = 'REMOVE_TASK'

const save = action => (dispatch, getState) => {
  dispatch(action);
  const { tasks } = getState();
  AsyncStorage.setItem('task_list', JSON.stringify(tasks));
};

export const loadTasks = tasks => ({
  type: REPLACE_TASKS,
  payload: tasks,
});

export const addTask = ({ name, duration }) => save({
  type: ADD_TASK,
  payload: { name, duration, id: v4(), consumed: 0 }
});

export const updateTaskConsume = (consumed, id) => save({
  type: UPDATE_TASK_CONSUMATION,
  consumed,
  id
});

export const removeTask = (id) => save({
  type: REMOVE_TASK,
  id
});
