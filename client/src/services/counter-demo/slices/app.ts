import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {
    // TODO app state
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {},
    reducers: {
        initApp(state: AppState): AppState {
            return state;
        }
    }
});

export const { initApp } = appSlice.actions;
