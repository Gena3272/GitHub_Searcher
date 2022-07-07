import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFound: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>404</h2>
            <p>Page Not Found</p>
            <button onClick={() => navigate('/')}>
                Back Home
            </button>
        </div>
    );
}
