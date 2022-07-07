import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from "@mui/material";

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { clearUsers, searchRepo, setSearchRepoValue } from '../../../store';
import { Alert } from "../../Alert";
import classes from "./SearchRepo.module.scss";

interface SearchState {
    inputValue: string;
    alert: boolean;
    alertText: string;
}

interface Props {
    name: string,
}

export const SearchRepo: FC<Props> = ({name}) => {
    const [state, setState] = useState<SearchState>({
        inputValue: '',
        alert: false,
        alertText: '',
    });

    const firstUpdate = useRef(true);

    const dispatch = useDispatch();

    const count = useTypedSelector(state => state.github.users.count);
    const searchRepoValue = useTypedSelector(state => state.github.searchRepoValue);

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

            setState(state => ({
                ...state,
                inputValue: '',
                alert: false,
                alertText: '',
            }));

            dispatch(setSearchRepoValue(state.inputValue.trim()));
        } else {
            setState(state => ({
                ...state,
                alert: true,
                alertText: 'Please enter repositories'
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
        if (searchRepoValue !== '') {
            dispatch(searchRepo(name ,searchRepoValue));
        }
    }, [dispatch, name, searchRepoValue]);


    useEffect(() => {
        if (count === 0 && searchRepoValue !== '') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: 'Repositories not found'
            }));

            dispatch(clearUsers());
        }
    }, [dispatch, count, searchRepoValue]);


    return (
        <>
            <div className={classes.searchBox}>
                <TextField
                    id="filled-basic"
                    label="Search Repositories"
                    variant="filled"
                    type="text"
                    className={classes.searchInput}
                    placeholder="Enter Repositories..."
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
