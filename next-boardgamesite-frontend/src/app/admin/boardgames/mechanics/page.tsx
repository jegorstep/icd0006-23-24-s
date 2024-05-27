"use client"

import BoardGameService from "@/services/BoardGameService";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import {IBoardGame} from "@/domain/IBoardGame";
import MechanicService from "@/services/MechanicService";
import {IMechanic} from "@/domain/IMechanic";
import Link from "next/link";
import BoardGameMechanicService from "@/services/BoardGameMechanicService";

export default function AddMechanic() {
    const { userInfo, setUserInfo } = useContext(AppContext)!;
    const [errors, setErrors] = useState("");
    const [boardGame, setBoardGame] = useState<IBoardGame>();
    const [mechanics, setMechanics] = useState<IMechanic[]>([]);
    const [BGmechanics, setBGMechanics] = useState<IMechanic[]>([]);
    const [selectedMechanic, setSelectedMechanic] = useState<string>("");


    const loadBoardGame = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await BoardGameService.get(userInfo!.jwt, id);
        if (response.data) {
            setBoardGame(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    };

    const loadBGMechanics = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await BoardGameMechanicService.getById(userInfo!.jwt, id);
        if (response.data) {
            setBGMechanics(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    }

    const loadMechanics = async () => {
        const response = await MechanicService.getAll(userInfo!.jwt);
        if (response.data) {
            setMechanics(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    }

    const handleMechanicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMechanic(event.target.value);
    };

    const addMechanicToBoardGame = async () => {
        if (selectedMechanic && boardGame) {

            const response = await BoardGameMechanicService.add(userInfo!.jwt, {
                id: "10000000-1000-4000-8000-100000000000",
                MechanicId: selectedMechanic,
                boardGameId: boardGame!.id
            });
            if (response.errors) {
                setErrors(response.errors[0]);
            }
            if (response.data) {
                await loadBGMechanics();
            }
        }
    };
    const deleteMechanicFromBoardGame = async (mechanicId: string, boardGameId: string) => {
        if (boardGame) {
            const response = await BoardGameMechanicService.delete(userInfo!.jwt, mechanicId, boardGameId);
            if (response.errors) {
                setErrors(response.errors[0]);
            }
            await loadBGMechanics();

        }
    };




    useEffect(() => {
        loadMechanics();
        loadBGMechanics();
        loadBoardGame();

    }, []);

    return (
        <>
            {errors && <div className="error-message">{errors}</div>}
            <div className="board-game-container">
                <div className="board-game-title">
                    Board Game: {boardGame ? boardGame.name : "Loading..."}
                </div>
                <div className="mechanics-list">
                    <div className="mechanics-list">
                        <div>Board Game Mechanics:</div>
                        {BGmechanics.map(item =>
                            <div key={item.id} className="mechanics-item">
                                {item.name}
                                <button
                                    className="delete-btn" key={item.id}
                                    onClick={() => deleteMechanicFromBoardGame(item.id, boardGame!.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                    <div className="form-floating mb-3">
                    <select className="form-select" value={selectedMechanic} onChange={handleMechanicChange}>
                        <option value=""></option>
                        {mechanics.map(item =>
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        )}
                    </select>
                    <label>
                        Select a Mechanic
                    </label>
                </div>
                <button className="addButton" onClick={addMechanicToBoardGame}>Add Mechanic</button>
            </div>
        </>


    )
}