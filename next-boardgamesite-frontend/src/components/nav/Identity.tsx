"use client"
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import AccountService from "@/services/AccountService";

export default function Identity() {
    const {userInfo, setUserInfo} = useContext(AppContext)!;

    return userInfo ? <LoggedIn/>: <LoggedOut/>
}



const LoggedOut = () => {

    return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="/register" className="nav-link text-dark">Register</Link>
                </li>
                <li className="nav-item">
                    <Link href="/login" className="nav-link text-dark">Login</Link>
                </li>
            </ul>
        );
    }

const LoggedIn = () => {

    const {userInfo, setUserInfo} = useContext(AppContext)!;
    const doLogout = async () => {
        const response = await AccountService.logout(userInfo!.jwt, userInfo!.refreshToken);
        setUserInfo(null);
    }

    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link href="/profile" className="nav-link text-dark" title="Manage"> Hello, {userInfo!.firstName} {userInfo!.lastName}!</Link>
            </li>
            <li className="nav-item">
                <Link onClick={(e) => doLogout()} href="/" className="nav-link text-dark" title="Logout">Logout</Link>
            </li>
        </ul>
    );
}