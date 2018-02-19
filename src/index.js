import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import accountReducer from './store/reducers/account';
import registerReducer from './store/reducers/register';
import sendReducer from './store/reducers/send';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const mainReducer = combineReducers({
    accountRedu: accountReducer,
    registerRedu: registerReducer,
    sendRedu: sendReducer,
})

const store = createStore(mainReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
