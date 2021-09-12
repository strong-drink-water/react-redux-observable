import { Epic, combineEpics, ofType } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { InitAsync, ModifyCounterAsync } from './actions';
import { filter, map, mergeMap, catchError, switchMap, takeUntil } from 'rxjs/operators';
import { defer, from, of } from 'rxjs';
import { RootState, RootActions } from '..';

const modifyCounter = (count: number) => new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        if (count > 10 || count < -10)
            reject(new Error(`Invalid Number ${count}`))
        resolve(count);
    }, 500);
});

export const initAsyncEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(InitAsync.request)),
        mergeMap(action =>
            from(of(831)).pipe(
                map(InitAsync.success),
                catchError(error => of(InitAsync.failure(error as Error)))
            )
        )
    );

export const ModifyCounterInitAsyncEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(ModifyCounterAsync.request)),
        switchMap(action => defer(() => modifyCounter(action.payload)).pipe(
            map((number: number) => ModifyCounterAsync.success(number)),
            takeUntil(action$.pipe(ofType(ModifyCounterAsync.cancel))),
            catchError((error: Error) => of(ModifyCounterAsync.failure(error)))
        ))
    );

export default combineEpics(
    initAsyncEpic,
    ModifyCounterInitAsyncEpic
);