import React, { FC } from 'react';
import { Box } from "@mui/material";

import classes from "./Repo.module.scss";

interface RepoProps {
    name: string;
    description: string;
    url: string;
    stargazers: number;
    forks: number;
}

export const Repo: FC<RepoProps> = ({name, description, url, stargazers, forks}) =>
    <Box className={classes.container}>
        <div className={classes.nameBoxRepo}>
            <Box className={classes.nameRepo}>
                <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
            </Box>
            <Box className={classes.nameDes}>{description}</Box>
        </div>
        <Box className={classes.estimates}>
            <Box className={classes.watchers}>{forks} Forks</Box>
            <Box className={classes.forks}>{stargazers} Star</Box>
        </Box>
    </Box>
