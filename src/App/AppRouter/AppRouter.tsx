import React, { lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/HomePage";
import { withSuspense } from "../hoc/withSuspense";
import { AppContext } from "../../store/context";
import { observer } from "mobx-react-lite";

const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("../../pages/ErrorPages/NotFounPage"));
const ErrorPage = lazy(() => import("../../pages/ErrorPages/ErrorPage"));

export const AppRouter = observer(() => {    
    const isAuth = useContext(AppContext).authState.isAuth

    return (
        <Routes>
            <Route path="/" element={isAuth ? <HomePage/> : withSuspense(LoginPage)}/>
            <Route path="/login" element={withSuspense(LoginPage)}/>
            <Route path="/error" element={withSuspense(ErrorPage)} />
            <Route path="/*" element={withSuspense(NotFoundPage)}/>
        </Routes>
    )
})

AppRouter.displayName = "AppRouter"