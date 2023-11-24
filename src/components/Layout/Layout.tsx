import React, { ReactNode } from "react";
import { Header } from "../Header/Header";

export const Layout = ({
    children
} : {
    children: ReactNode
}) => {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}