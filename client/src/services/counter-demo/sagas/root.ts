import { all } from 'redux-saga/effects';
import { appSaga } from './app';

export function* rootSaga(): Iterator<unknown> {
    yield all([
        appSaga()
    ]);
}
