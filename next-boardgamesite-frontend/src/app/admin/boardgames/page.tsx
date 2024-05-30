 "use client"

import {useContext, useEffect, useState} from "react";
import {IBoardGame} from "@/domain/IBoardGame";
import Link from "next/link";
 import BoardGameService from "@/services/BoardGameService";
 import {AppContext} from "@/state/AppContext";
 import AccountService from "@/services/AccountService";
 import {IUser} from "@/domain/IUser";
 import {router} from "next/client";
 import {useRouter} from "next/navigation";

export default function BoardGames() {
    const [boardGames, setBoardGames] = useState<IBoardGame[]>([]);
    const {userInfo, setUserInfo} = useContext(AppContext)!;
    const [roles, setRoles] = useState<string[]>([]);


    async function fetchBoardGames() {
        const response = await BoardGameService.getAll(userInfo!.jwt);
        if (response.data) {
            setBoardGames(response.data);
            if (response.errors && response.errors.length > 0) {

            }
        }
    }

    async function refreshToken() {
        const refreshedUserInfo = await AccountService.refreshToken(userInfo!.jwt, userInfo!.refreshToken);
        setUserInfo(refreshedUserInfo.data!);
    }

    useEffect(() => {
        fetchBoardGames();
        refreshToken();

    }, []);


    return (
        <>
        <h2 className="main-header">Board Games</h2>
            <Link href="boardgames/create" className="addButton">Add</Link>
            {boardGames.map((item) =>
                <div key={item.id} className="item-container">
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Complexity:</strong> {item.complexity}</p>
                    <p><strong>Player Amount:</strong> {item.minimumPlayers} - {item.maximumPlayers}</p>
                    <Link href={"boardgames/update?id=" + item.id} className="updateLink">Update</Link>
                    <Link href={"boardgames/delete?id=" + item.id} className="deleteLink">Delete</Link>
                    <Link href={"boardgames/mechanics?id=" + item.id} className="mechanicsLink">Mechanics</Link>
                </div>
            )}
        </>
    );
}