import { createReducer } from "typesafe-actions";
import { CounterActions } from ".";
import { CounterState } from "./state";
import { InitAsync, ModifyCounterAsync } from "./actions";

const initialState = {
    errorMessage: "",
    count: 0,
    loading: false,
    successCount: 0,
    failureCount: 0,
    cancelCount: 0
};

const reducers = createReducer<CounterState, CounterActions>(initialState)
    .handleAction(InitAsync.success, (state, action) => ({ ...state, count: action.payload, loading: false, errorMessage: "" }))
    .handleAction(ModifyCounterAsync.request, (state, action) => ({ ...state, loading: true, errorMessage: "" }))
    .handleAction(ModifyCounterAsync.success, (state, action) => ({ ...state, loading: false, errorMessage: "", count: state.count + action.payload, successCount: state.successCount + 1 }))
    .handleAction(ModifyCounterAsync.failure, (state, action) => ({ ...state, loading: false, errorMessage: action.payload.message, failureCount: state.failureCount + 1 }))
    .handleAction(ModifyCounterAsync.cancel, (state, action) => ({ ...state, loading: false, cancelCount: state.cancelCount + 1 }))

export default reducers;