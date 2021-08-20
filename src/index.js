import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {compose ,createStore} from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));//создаём стор и уидаем в него главный рельюсер а так же вводи строку для работы с redux devtools

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
