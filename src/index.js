import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split('/').pop()}`;
  };

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={getBasename()}>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
