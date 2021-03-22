import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './Redux/Utils/createStore';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './Components/AppRouter';



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

