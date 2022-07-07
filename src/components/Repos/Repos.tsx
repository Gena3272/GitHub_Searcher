import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from "@mui/material";

import { getRepos } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Repo, Alert } from "../../components";
import classes from "./Repos.module.scss";

interface ReposProp {
    name: string | undefined;
    reposCount: number;
}

interface ReposState {
    alert: boolean;
    alertText: string;
}

export const Repos: FC<ReposProp> = ({name, reposCount}) => {
    const [state, setState] = useState<ReposState>({
        alert: false,
        alertText: '',
    });

    const dispatch = useDispatch();

    const {repos, reposPage, error} =  useTypedSelector(state => state.github);

    useEffect(() => {
        dispatch(getRepos(name, reposPage));
    }, [dispatch, name, reposPage]);

    useEffect(() => {
        if (error.errorType === 'getRepos') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: error.errorText,
            }));
        }
    }, [error]);

    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: '',
        }));
    }

    return (
        <Box className={classes.card}>
            <Box className={classes.header}>User Public Repos: {reposCount}</Box>
            {state.alert &&
                <Box>
                    <Alert messageText={state.alertText} messageType={'danger'} closeClickHandler={closeAlert}/>
                </Box>
            }
            <Box>
                {repos.map(({id, name, description, html_url, stargazers_count, forks} : any) => (
                    <Repo
                        key={id}
                        name={name}
                        description={description}
                        url={html_url}
                        stargazers={stargazers_count}
                        forks={forks}
                    />
                ))}
            </Box>
        </Box>
    );
}
