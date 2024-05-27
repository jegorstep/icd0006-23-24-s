"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import BoardGameService from "@/services/BoardGameService";
import PublicationService from "@/services/PublicationService";
import {IPublication} from "@/domain/IPublication";
import {IBoardGame} from "@/domain/IBoardGame";


const MAX_HEADER_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_LOCATION_LENGTH = 128;

export default function UpdatePublication() {
    const [boardGames, setBoardGames] = useState<IBoardGame[]>([]);
    const [selectedGame, setSelectedGame] = useState("");


    const router = useRouter();
    const [isError, setError] = useState("False");
    const [publication, setPublication] = useState<IPublication>();
    const {userInfo, setUserInfo} = useContext(AppContext)!;

    const loadPublication = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await PublicationService.get(userInfo!.jwt, id);
        if (response.data) {
            setPublication(response.data)
            setHeader(response.data.publicationHeader);
            setDescription(response.data.description);
            setSelectedGame(response.data.boardGameId);
            setLocation(response.data.gameLocation);
            setPlayerAmount(response.data.playersAmount);
            setGameDate(new Date(response.data.gameDate).toISOString().slice(0, 16));
        }
    };



    useEffect( () => {
        async function fetchBoardGames() {
            const response = await BoardGameService.getAll(userInfo!.jwt);
            if (response.data) {

                setBoardGames(response.data);
                if (response.errors && response.errors.length > 0) {
                    setHeaderValidationError(response.errors[0]);
                }
            }
        }
        loadPublication();
        fetchBoardGames();


    }, [userInfo]);


    const [header, setHeader] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [playerAmount, setPlayerAmount] = useState("");
    const [gameDate, setGameDate] = useState("");

    const [headerValidationError, setHeaderValidationError] = useState("");
    const [descriptionValidationError, setDescriptionValidationError] = useState("");
    const [locationValidationError, setLocationValidationError] = useState("");
    const [playerAmountValidationError, setPlayerAmountValidationError] = useState("");



    const  validateAndPublish = async () => {
        if (header.length < 1) {
            setHeaderValidationError("Must be at least 1 character long!");
            setError("True")
        } else {
            setHeaderValidationError("");
        }
        if (description.length < 1) {
            setDescriptionValidationError("Must be at least 1 character long!");
            setError("True");
        } else {
            setDescriptionValidationError("");
        }
        if (location.length < 1) {
            setLocationValidationError("Must be at least 1 character long!");
            setError("True");
        } else {
            setLocationValidationError("");
        }
        if (playerAmount < "2") {
            setPlayerAmountValidationError("Too few players!");
            setError("True");
        } else {
            setPlayerAmountValidationError("");
        }
        if (isError === "True") {
            setError("False")
        }
        else {
            console.log(publication!.id)
            const response = await PublicationService.put(
                userInfo!.jwt,
                publication!.id,
                {
                    id: publication!.id,
                    createdBy: publication!.createdBy,
                    createdAt: publication!.createdAt,
                    updatedBy: publication!.updatedBy,
                    updatedAt: publication!.updatedAt,
                    boardGameId: selectedGame,
                    publicationHeader: header,
                    description: description,
                    gameDate: gameDate,
                    imageUrl: "",
                    gameLocation: location,
                    playersAmount: playerAmount
                });

            if (response.errors && response.errors.length > 0) {
                setHeaderValidationError(response.errors[0]);
            } else {
                router.back();
            }

        }
    }




    // @ts-ignore
    const handleHeaderChange = (e) => {
        const inputHeader = e.target.value;
        if (inputHeader.length <= MAX_HEADER_LENGTH) {
            setHeader(inputHeader);
            setHeaderValidationError("");
        } else {
            setHeaderValidationError(`Header can't exceed ${MAX_HEADER_LENGTH} characters`);
        }
    };

    // @ts-ignore
    const handleDescriptionChange = (e) => {
        const inputDescription = e.target.value;
        if (inputDescription.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(inputDescription);
            setDescriptionValidationError("");
        } else {
            setDescriptionValidationError(`Description can't exceed ${MAX_DESCRIPTION_LENGTH} characters`);
        }
    };

    // @ts-ignore
    const handleLocationChange = (e) => {
        const inputLocation = e.target.value;
        if (inputLocation.length <= MAX_LOCATION_LENGTH) {
            setLocation(inputLocation);
            setLocationValidationError("");
        } else {
            setLocationValidationError(`Location can't exceed ${MAX_LOCATION_LENGTH} characters`);
        }
    };


    return (
        <div className="create-row">
            <div>
                <h2 className="main-header">Update Publication</h2>
            </div>
            <div>
            </div>
            <div className="form-floating mb-3">
                <select className="form-select" value={selectedGame}
                        onChange={(e) => setSelectedGame(e.target.value)}>
                    <option value={publication?.boardGameId}>If not selected, will be the same game</option>
                    {boardGames.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                    ))}
                </select>
                <label>
                    Select a Board Game
                </label>
            </div>
            <div>
                <div className={`text-danger error-input ${headerValidationError ? 'visible' : ''}`} role="alert">
                    {headerValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text" id="publicationHeader" className="form-control"
                        placeholder="Header" value={header} onChange={handleHeaderChange} />
                    <label htmlFor="publicationHeader" className="form-label">
                        Header
                    </label>
                    <small>{`${header.length}/${MAX_HEADER_LENGTH}`}</small>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${descriptionValidationError ? 'visible' : ''}`} role="alert">
                    {descriptionValidationError}
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        id="description" className="form-control"
                        placeholder="Description" value={description} onChange={handleDescriptionChange} />
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <small>{`${description.length}/${MAX_DESCRIPTION_LENGTH}`}</small>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${locationValidationError ? 'visible' : ''}`} role="alert">
                    {locationValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text" id="gameLocation" className="form-control"
                        placeholder="Location" value={location} onChange={handleLocationChange} />
                    <label htmlFor="gameLocation" className="form-label">
                        Location
                    </label>
                    <small>{`${location.length}/${MAX_LOCATION_LENGTH}`}</small>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${playerAmountValidationError ? 'visible' : ''}`} role="alert">
                    {playerAmountValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number" id="playersAmount" className="form-control"
                        placeholder="Player Amount" value={playerAmount} onChange={(e) => setPlayerAmount(e.target.value)} />
                    <label htmlFor="playersAmount" className="form-label">
                        Player Amount
                    </label>
                </div>
            </div>
            <div>
                <div className="form-floating mb-3">
                    <input
                        type="datetime-local" id="gameDate" className="form-control"
                        placeholder="Game Date" value={gameDate} onChange={(e) => setGameDate(e.target.value)} />
                    <label htmlFor="gameDate" className="form-label">
                        Game Date
                    </label>
                </div>
            </div>
            <div>
                <button onClick={(e) => validateAndPublish()} className="w-100 btn btn-lg btn-primary">Update</button>
            </div>
        </div>
    );
}
