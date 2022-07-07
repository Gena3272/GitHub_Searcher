import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from "./Card.module.scss";

interface CardProps {
    login: string;
    avatar_url: string;
    repos_url: string;
}

export const Card: FC<{user: CardProps}> = ({user}) => (
    <Link to={'/profile/' + user.login}>
        <div className={classes.card}>
            <div className={classes.boxImg}>
                <img src={user.avatar_url} alt={user.login} className={classes.logoUser} />
            </div>
            <div className={classes.boxInfo}>
                <span>{user.login}</span>
            </div>
        </div>
    </Link>
);
