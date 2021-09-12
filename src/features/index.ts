import { combineReducers } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import counterReducers from "./counter/reducers";
import { CounterActions } from "./counter";
import CounterEpics from "./counter/epics"
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import logger from 'redux-logger';

const reducer = combineReducers({
    counter: counterReducers
});

export type RootState = ReturnType<typeof reducer>;
export type RootActions = CounterActions;

const rootEpics = combineEpics(
    CounterEpics
);

const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState>();
export const store = configureStore({
    reducer,
    middleware: [ epicMiddleware, logger ],
    devTools: process.env.NODE_ENV !== 'production',
});
epicMiddleware.run(rootEpics);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();