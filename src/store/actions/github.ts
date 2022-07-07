import { Dispatch } from 'redux';
import axios from 'axios';

import { GithubActionTypes, GithubAction, errorType } from '../../interfaces/gitHub';

export const setLoading = (): GithubAction => ({
    type: GithubActionTypes.SET_LOADING,
});

export const stopLoading = (): GithubAction => ({
    type: GithubActionTypes.STOP_LOADING
});

const setFetchError = (type: errorType, errorText: string): GithubAction => ({
    type: GithubActionTypes.FETCH_ERROR,
    payload: {errorType: type, errorText}
});

export const clearError = (): GithubAction => ({
    type: GithubActionTypes.CLEAR_FETCH_ERROR,
});

export const setSearchRepoValue = (value: string): GithubAction => ({
    type: GithubActionTypes.SEARCH_REPO_VALUE,
    payload: value
});

export const searchUsers = (value: string, page = 1) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            dispatch(setLoading());

            const response = await axios.get(
                `https://api.github.com/search/users?q=${value}`,
                {params: {per_page: 20, page}}
            );

            const usersPageCount = Math.ceil(response.data.total_count / 20);

            dispatch({
                type: GithubActionTypes.SEARCH_USERS,
                payload: {
                    count: response.data.total_count,
                    pageCount: usersPageCount,
                    items: response.data.items
                }
            });

            dispatch(clearError());

        } catch (error: any) {
            dispatch(setFetchError('searchUsers', error.message));
            dispatch(stopLoading());
        }
    }
};

export const setSearchUsersValue = (value: string): GithubAction => ({
    type: GithubActionTypes.SEARCH_USERS_VALUE,
    payload: value
});

export const getUser = (name: string | undefined) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            dispatch(setLoading());

            const response = await axios.get(
                `https://api.github.com/users/${name}`
            );
            
            dispatch({type: GithubActionTypes.GET_USER, payload: response.data});

            dispatch(clearError());

        } catch (error: any) {
            dispatch(setFetchError('getUser', error.message));
            dispatch(stopLoading());
        }
    }
};

export const searchRepo = (name: string, nameRepo: string) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            dispatch(setLoading());

            const response = await axios.get(
                `https://api.github.com/search/repositories?q=${name}/${nameRepo}`,
            );

            dispatch({
                type: GithubActionTypes.SEARCH_REPO,
                payload: response.data.item,
            });

            dispatch(clearError());

        } catch (error: any) {
            dispatch(setFetchError('searchRepo', error.message));
            dispatch(stopLoading());
        }
    }
};

export const getRepos = (name: string | undefined, page = 1) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            const response = await axios.get(
                `https://api.github.com/users/${name}/repos`,
                {params: {per_page: 20, page}}
            );

            dispatch({type: GithubActionTypes.GET_REPOS, payload: response.data});

            dispatch(clearError());

        } catch (error: any) {
            dispatch(setFetchError('getRepos', error.message));
            dispatch(stopLoading());
        }
    }
};

export const clearUsers = (): GithubAction => ({
    type: GithubActionTypes.CLEAR_USERS,
});
