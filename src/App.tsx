import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import { Profile, PageNotFound, Home } from "./pages";
import classes from "./App.module.scss";

export const App = () => {
    return (
        <BrowserRouter>
            <div className={classes.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:name" element={<Profile />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
