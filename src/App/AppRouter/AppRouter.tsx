import React, { lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/HomePage";
import { withSuspense } from "../hoc/withSuspense";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../store/root-store";

const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("../../pages/ErrorPages/NotFounPage"));
const ErrorPage = lazy(() => import("../../pages/ErrorPages/ErrorPage"));

export const AppRouter = observer(() => {    
    const isAuth = rootStore.authStore.isAuth

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