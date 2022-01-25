import { getContext, GetContextEffect } from 'redux-saga/effects';
import { AppContext } from '../core/store';

export function* getAppContext(): Generator<GetContextEffect, AppContext, () => AppContext> {
    return (yield getContext('get'))();
}
