import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Card, Alert, Loader, SearchUsers } from "../../components/";
import classes from "./Home.module.scss";

interface HomeState {
    alert: boolean;
    alertText: string;
}

export const Home: FC = () => {
    const [state, setState] = useState<HomeState>({
        alert: false,
        alertText: '',
    });

    const {users, loading, error} = useTypedSelector(state => state.github);

    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: '',
        }));
    }

    useEffect(() => {
        if (error.errorType === 'searchUsers') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: error.errorText,
            }));
        }
    }, [error]);

    return (
        <Box className={classes.container}>
            <Box className={classes.search}>
                <Typography className={classes.title}>GitHub Searcher</Typography>
                <SearchUsers />
                {state.alert &&
                    <Alert
                        messageText={state.alertText}
                        messageType={'danger'}
                        closeClickHandler={closeAlert}
                    />
                }
            </Box>
            <Box className={classes.resultContainer}>
                {loading
                    ? <Loader/>
                    : users.items.map((user: any) => (
                        <Box className={classes.card} key={user.id}>
                            <Card user={user}/>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
}


