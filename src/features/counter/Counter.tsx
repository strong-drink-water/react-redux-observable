import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Counter.module.css';
import { RootState } from '..';
import { InitAsync, ModifyCounterAsync } from './actions';

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>(state => state.counter.count);
  const errorMessage = useSelector<RootState, string>(state => state.counter.errorMessage);
  const running = useSelector<RootState, boolean>(state => state.counter.loading);
  const successCount = useSelector<RootState, number>(state => state.counter.successCount);
  const cancelCount = useSelector<RootState, number>(state => state.counter.cancelCount);
  const failCount = useSelector<RootState, number>(state => state.counter.failureCount);

  useEffect(() => {
    dispatch(InitAsync.request());
  }, [dispatch]);

  const [incrementAmount, setIncrementAmount] = useState('2');
  const amount = parseInt(incrementAmount, 10);

  return (
    <div>
      <div className={styles.row}>
        Trigger an Error if the value is larger than 10
      </div>
      <div className={styles.row}>
        Current state: {running? "running": "not running"}
      </div>
      <div className={styles.error}>
        {errorMessage}
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(ModifyCounterAsync.request(amount))}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(ModifyCounterAsync.request(amount* -1))}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
          disabled={running}
        />
      </div>
      <div className={styles.row}>
      <button
          className={styles.button}
          aria-label="cancel"
          onClick={() => dispatch(ModifyCounterAsync.cancel())}
          disabled={!running}
        > Cancel current request</button>
      </div>
      <div className={styles.row}>
        Success: {successCount} | Cancel: {cancelCount} | Reject: {failCount}
      </div>
    </div>
  );
}
