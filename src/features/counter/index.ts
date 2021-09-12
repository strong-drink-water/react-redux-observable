import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type CounterActions = ActionType<typeof actions>;