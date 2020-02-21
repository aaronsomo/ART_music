import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

// import logger from 'redux-logger';

import rootReducer from './root-reducer';

// const middlewares = [logger];
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// const store = createStore(rootReducer, applyMiddleware(...middlewares));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
// const store = createStore(rootReducer);


export default store;