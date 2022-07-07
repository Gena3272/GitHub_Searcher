import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from "@mui/material";

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { searchUsers, clearUsers, setSearchUsersValue } from '../../../store';
import { Alert } from "../../Alert";
import classes from "./Search.module.scss";

interface SearchState {
    inputValue: string;
    alert: boolean;
    alertText: string;
}

export const SearchUsers: FC = () => {
    const [state, setState] = useState<SearchState>({
        inputValue: '',
        alert: false,
        alertText: '',
    });

    const firstUpdate = useRef(true);

    const dispatch = useDispatch();

    const count = useTypedSelector(state => state.github.users.count);
    const searchUsersValue = useTypedSelector(state => state.github.searchUsersValue);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setState(state => ({
            ...state,
            inputValue: event.target.value,
        }));
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if(event.key !== 'Enter') {
            return;
        }

        if (state.inputValue.trim()) {
            dispatch(clearUsers());

            setState(state => ({
                ...state,
                inputValue: '',
                alert: false,
                alertText: '',
            }));

            dispatch(setSearchUsersValue(state.inputValue.trim()));
        } else {
            setState(state => ({
                ...state,
                alert: true,
                alertText: 'Please enter username'
            }));
        }
    }


    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: ''
        }));
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false; 
            return;
        }
        if (searchUsersValue !== '') {
            dispatch(searchUsers(searchUsersValue));
        }
    }, [dispatch, searchUsersValue]);


    useEffect(() => {
        if (count === 0 && searchUsersValue !== '') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: 'Username not found'
            }));

            dispatch(clearUsers());
        }
    }, [dispatch, count, searchUsersValue]);


    return (
        <>
            <div className={classes.searchBox}>
                <TextField
                    id="filled-basic"
                    label="SearchUsers for Users"
                    variant="filled"
                    type="text"
                    className={classes.searchInput}
                    placeholder="Enter user name..."
                    onChange={changeHandler}
                    onKeyPress={keyPressHandler}
                    value={state.inputValue}
                />
                {count !== 'init'
                    ? <span className={classes.resultInfo}>Results: {count}</span>
                    : ''
                }
            </div>
            {state.alert && <Alert
                messageText={state.alertText}
                closeClickHandler={closeAlert}
                />
            }
        </>
    );
}
