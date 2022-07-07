import { combineReducers } from 'redux';

import { githubReducer } from './githubReducer';

export const rootReducer = combineReducers({
    github: githubReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
