import { createAsyncAction } from 'typesafe-actions';
export const ModifyCounterAsync = createAsyncAction('COUNTER/MODIFY/INIT', 'COUNTER/MODIFY/INIT/SUCCESS', 'COUNTER/MODIFY/INIT/FAILURE', 'COUNTER/MODIFY/INIT/CANCEL')<number, number, Error, undefined>();

export const InitAsync = createAsyncAction('COUNTER/INIT', 'COUNTER/INIT/SUCCESS', 'COUNTER/INIT/FAILURE', 'COUNTER/INIT/CANCEL')<undefined, number, Error, undefined>();