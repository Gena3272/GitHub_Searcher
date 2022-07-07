interface Users {
    count: number | 'init';
    pageCount: number;
    items: any[];
}

export type errorType = false
    | 'searchUsers'
    | 'getUser'
    | 'getRepos'
    | 'searchRepo'

interface Error {
    errorType: errorType;
    errorText: string;
}

export interface GithubState {
    users: Users;
    searchUsersValue: string;
    searchRepoValue: string
    user: Record<string, any>;
    loading: boolean;
    repos: any[];
    reposPage: number;
    error: Error;
    repo: {};
}

export enum GithubActionTypes {
    SEARCH_USERS = 'SEARCH_USERS',
    SEARCH_REPO = 'SEARCH_REPO',
    SEARCH_USERS_VALUE = 'SEARCH_USERS_VALUE',
    SEARCH_REPO_VALUE = 'SEARCH_REPO_VALUE',
    SET_USERS_PAGE = 'SET_USERS_PAGE',
    GET_USER = 'GET_USER',
    GET_REPOS = 'GET_REPOS',
    SET_REPOS_PAGE = 'SET_REPOS_PAGE',
    SET_LOADING = 'SET_LOADING',
    STOP_LOADING = 'STOP_LOADING',
    CLEAR_USERS = 'CLEAR_USERS',
    FETCH_ERROR = 'FETCH_ERROR',
    CLEAR_FETCH_ERROR = 'CLEAR_FETCH_ERROR'
}

interface SearchUsersAction {
    type: GithubActionTypes.SEARCH_USERS;
    payload: Users;
}

interface SearchRepoAction {
    type: GithubActionTypes.SEARCH_REPO;
    payload: Object;
}

interface SearchUserValueAction {
    type: GithubActionTypes.SEARCH_USERS_VALUE;
    payload: string;
}

interface SearchRepoValueAction {
    type: GithubActionTypes.SEARCH_REPO_VALUE;
    payload: string;
}

interface SetUsersPageAction {
    type: GithubActionTypes.SET_USERS_PAGE;
    payload: number;
}

interface GetUserAction {
    type: GithubActionTypes.GET_USER;
    payload: {};
}

interface GetReposAction {
    type: GithubActionTypes.GET_REPOS;
    payload: any[];
}

interface SetReposPageAction {
    type: GithubActionTypes.SET_REPOS_PAGE;
    payload: number;
}

interface SetLoadingAction {
    type: GithubActionTypes.SET_LOADING;
}

interface ClearUsersAction {
    type: GithubActionTypes.CLEAR_USERS;
}

interface FetchErrorAction {
    type: GithubActionTypes.FETCH_ERROR;
    payload: Error;
}

interface ClearFetchErrorAction {
    type: GithubActionTypes.CLEAR_FETCH_ERROR;
}

interface StopLoadingAction {
    type: GithubActionTypes.STOP_LOADING;
}

export type GithubAction = SearchUsersAction
    | SearchRepoValueAction
    | SearchUserValueAction
    | SetUsersPageAction
    | GetUserAction
    | GetReposAction
    | SetReposPageAction
    | SetLoadingAction
    | ClearUsersAction
    | FetchErrorAction
    | ClearFetchErrorAction
    | StopLoadingAction
    | SearchRepoAction
