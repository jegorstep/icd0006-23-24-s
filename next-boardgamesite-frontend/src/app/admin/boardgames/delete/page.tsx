"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import {IBoardGame} from "@/domain/IBoardGame";
import BoardGameService from "@/services/BoardGameService";



export default function DeleteBG() {
    const router = useRouter();
    const { userInfo, setUserInfo } = useContext(AppContext)!;
    const [boardGame, setBoardGame] = useState<IBoardGame>();
    const [errors, setErrors] = useState("");


    const loadData = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await BoardGameService.get(userInfo!.jwt, id);
        if (response.data) {
            setBoardGame(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    };

    useEffect(() => { loadData() }, []);

    const handleDelete = async () => {
        if (boardGame) {
            const response = await BoardGameService.delete(userInfo!.jwt, boardGame.id);
            if (!response.errors) {
                router.back();
            } else if (response.errors) {
                setErrors(response.errors[0]);
            }
        }
    };

    if (boardGame) {
        return (
            <>
                <h1 className="main-header">Are you sure you want to delete the board game?</h1>

                <div className="details">
                    <h2>Details:</h2>
                    <div>
                        <p>Name: {boardGame.name}</p>
                    </div>
                    <div>
                        <p>Description: {boardGame.description}</p>
                    </div>
                    <div>
                        <p>Complexity: {boardGame.complexity}</p>
                    </div>
                    <div>
                        <p>Players Amount: {boardGame.minimumPlayers} - {boardGame.maximumPlayers}</p>
                    </div>
                </div>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </>

        )
    }
    else {
        return (
            <>
                Bad Request
            </>
        )
    }
}