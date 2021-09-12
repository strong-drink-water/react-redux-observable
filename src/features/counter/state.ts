export interface CounterState {
    errorMessage: string,
    count: number,
    loading: boolean,
    successCount: number,
    failureCount: number,
    cancelCount: number
}