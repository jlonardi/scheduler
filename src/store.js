import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';


export default function initialize() {
  const reducer = reducers();

  // create the redux store
  const store = createStore(
    reducer,
    applyMiddleware(thunk),
  );

  return store;
}
