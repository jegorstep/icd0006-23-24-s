"use client"
import Link from "next/link";
import Identity from "@/components/nav/Identity";
import {useContext, useEffect, useState} from "react";
import {AppContext, IUserInfo} from "@/state/AppContext";
import {useRouter} from "next/navigation";

export default function Header() {
    const {userInfo, setUserInfo} = useContext(AppContext)!;


    if (!userInfo) {
        return (<header>
            <nav
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <Link href="/" className="navbar-brand">BoardMaster</Link>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav">
                            <Identity/>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>)
    }

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <Link href="/" className="navbar-brand">BoardMaster</Link>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1 d-flex justify-content-center">
                            <li className="nav-item">
                                <Link href="/publications" className="nav-link text-dark center-item">Publications</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/sessions" className="nav-link text-dark center-item">Sessions</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/items" className="nav-link text-dark center-item">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark center-item">Search</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <Identity/>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
    }
