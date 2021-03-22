import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import reducers from './reducer'

const middlewares = [thunkMiddleware]
export const store: any = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
export const persistor = persistStore(store)