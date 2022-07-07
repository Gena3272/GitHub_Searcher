import { GithubAction, GithubActionTypes, GithubState } from '../../interfaces/gitHub';

const initialState: GithubState = {
    users: { count: 'init', pageCount: 1, items: [] },
    searchUsersValue: '',
    searchRepoValue: '',
    user: {},
    loading: false,
    repos: [],
    reposPage: 1,
    error: {errorType: false, errorText: ''},
    repo: {},
}

export const githubReducer = (state = initialState, action: GithubAction): GithubState => {
    switch (action.type) {
        case GithubActionTypes.SEARCH_USERS:
            return {
                ...state,
                loading: false,
                error: {errorType: false, errorText: ''},
                users: {
                    count: action.payload.count,
                    pageCount: action.payload.pageCount,
                    items: action.payload.items
                }
            }
        case GithubActionTypes.SEARCH_REPO:
            return {...state, repo: action.payload}
        case GithubActionTypes.SEARCH_USERS_VALUE:
            return {...state, searchUsersValue: action.payload}
        case GithubActionTypes.SEARCH_REPO_VALUE:
            return {...state, searchUsersValue: action.payload}
        case GithubActionTypes.GET_USER:
            return {
                ...state, loading: false,
                error: {errorType: false, errorText: ''},
                user: action.payload
            }
        case GithubActionTypes.GET_REPOS:
            return {
                ...state,
                loading: false,
                error: {errorType: false, errorText: ''},
                repos: action.payload
            }
        case GithubActionTypes.SET_LOADING:
            return {...state, loading: true}
        case GithubActionTypes.STOP_LOADING:
            return {...state, loading: false}
        case GithubActionTypes.CLEAR_USERS:
            return {...state, users: {count: 'init', pageCount: 1, items: []}}
        case GithubActionTypes.FETCH_ERROR:
            return {
                ...state,
                error: {
                    errorType: action.payload.errorType,
                    errorText: action.payload.errorText}
                }
        case GithubActionTypes.CLEAR_FETCH_ERROR:
            return {...state, error: {errorType: false, errorText: ''}}
        default:
            return state
    }
}
