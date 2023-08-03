import { createStore, combineReducers, applyMiddleware} from 'redux';
import { todos } from './todos/reducers';

// From redux persist to store the data
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension"

const reducers = {
    todos , 
};

const persistCofig = {
    key : 'root',
    storage,
    stateReconciler : autoMergeLevel2 ,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistCofig, rootReducer);

export const configureStore = ()=> createStore(
    persistedReducer,

    composeWithDevTools(
        applyMiddleware(thunk)
    )
    // window.__REDUX_DEVTOOLS_EXTENTION__ &&
    // window.__REDUX_DEVTOOLS_EXTENTION__(),
    );