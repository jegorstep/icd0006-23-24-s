"use client"


import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";
import {IPublication} from "@/domain/IPublication";
import PublicationService from "@/services/PublicationService";
import Link from "next/link";


export default function Sessions() {
    const [isLoading, setIsLoading] = useState(true);
    const [Publications, setPublications] = useState<IPublication[]>([]);
    const { userInfo, setUserInfo } = useContext(AppContext)!;


    const loadData = async () => {
        const response = await PublicationService.getSessions(userInfo!.jwt);
        if (response.data) {
            setPublications(response.data);
        }

        setIsLoading(false);
    };

    useEffect(() => { loadData() }, []);

    if (isLoading) return (<h1>Publications - LOADING</h1>);

    return (
        <>
            <h1 className="main-header">Sessions</h1>
            {Publications.map((item) =>
                <div className="publication" key={item.id}>
                    <div className="publication-image">
                        <img src="placeholder.png" alt="Publication Image" />
                    </div>
                    <div className="publication-info">
                        <h2>{item.publicationHeader}</h2>
                        <p>Description: {item.description}</p>
                        <Link href={`/publications/details?id=${item.id}`}>
                            Participate
                        </Link>
                        <div className="additional-info">
                            <span>Players needed: {item.playersAmount}</span>
                            <span>Date: {(new Date(item.gameDate)).toLocaleDateString()}</span>
                            <span>Time: {(new Date(item.gameDate)).toLocaleTimeString()}</span>
                            <span>Location: {item.gameLocation}</span>
                        </div>
                    </div>

                </div>
            )}

        </>
    );

};


