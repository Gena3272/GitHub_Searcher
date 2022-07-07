import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { Box, List, ListItemText } from "@mui/material";

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getUser } from '../../store';
import { Loader, Alert, Repos, SearchRepo } from "../../components";
import classes from "./Profile.module.scss";

interface State {
    day: string;
    month: string;
    year: string;
    alert: boolean;
    alertText: string;
}

export const Profile: FC = () => {
    const [state, setState] = useState<State>({
        day: '',
        month: '',
        year: '',
        alert: false,
        alertText: ''
    });

    const params = useParams();

    const dispatch = useDispatch();

    const {user, loading, error} = useTypedSelector(state => state.github);

    useEffect(() => {
        dispatch(getUser(params.name));
    }, [dispatch, params.name]);

    useEffect(() => {
        if (error.errorType === 'getUser') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: error.errorText
            }));
        }
    }, [error]);

    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: ''
        }));
    }

    useEffect(() => {
        if (Object.keys(user).length) {
            const date = new Date(user.created_at);

            const year = new Intl.DateTimeFormat(
                'en', { year: 'numeric' }).format(date);
            const month = new Intl.DateTimeFormat(
                'en', { month: 'short' }).format(date);
            const day = new Intl.DateTimeFormat(
                'en', { day: '2-digit' }).format(date);

            setState(state => ({...state, day, month, year}));
        }
    }, [user]);

    if (loading) return <Loader />

    return (
        <Box>
            {state.alert &&
                <Alert
                    messageText={state.alertText}
                    messageType={'danger'}
                    closeClickHandler={closeAlert}
                />
            }
            <h1 className={classes.title}>GitHub Searcher</h1>
            <Box className={classes.card}>
                <Box className={classes.photoContainer}>
                    <img src={user.avatar_url} alt="user_avatar"/>
                </Box>
                <Box className={classes.infoUser}>
                    <List>
                        <ListItemText>User Name/Login: {user.login}</ListItemText>
                        <ListItemText>User Email: {user.email}</ListItemText>
                        <ListItemText>Location: {user.location}</ListItemText>
                        <ListItemText>
                            <span>Join Date: {state.month} </span>
                            <span>{state.day}, </span>
                            <span>{state.year} </span>
                        </ListItemText>
                        <ListItemText>Followers: {user.followers}</ListItemText>
                        <ListItemText>Following: {user.following}</ListItemText>
                    </List>
                </Box>
            </Box>
            <SearchRepo name={user.login}/>
            <Repos name={params.name} reposCount={user.public_repos} />
        </Box>
    );
}
