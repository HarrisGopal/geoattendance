import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './reducers/globalReducer';
import { modelReducer } from './reducers/modelReducer';

const rootReducer = combineReducers({
    GlobalVariables: globalReducer,
    models: modelReducer
});

export const store = configureStore({ reducer: rootReducer });