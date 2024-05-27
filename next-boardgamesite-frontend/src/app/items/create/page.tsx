"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import BoardGameService from "@/services/BoardGameService";
import PublicationService from "@/services/PublicationService";
import AccountService from "@/services/AccountService";
import {IBoardGame} from "@/domain/IBoardGame";
import ItemService from "@/services/ItemService";
import {number} from "prop-types";


const MAX_HEADER_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_PRICE_LENGTH = 30;

export default function CreatePublication() {
    const router = useRouter();
    const [isError, setError] = useState("False");

    const [boardGames, setBoardGames] = useState<IBoardGame[]>();
    const [selectedGame, setSelectedGame] = useState("");

    const {userInfo, setUserInfo} = useContext(AppContext)!;


    const [header, setHeader] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [headerValidationError, setHeaderValidationError] = useState("");
    const [descriptionValidationError, setDescriptionValidationError] = useState("");
    const [priceValidationError, setPriceValidationError] = useState("");


    async function refreshToken() {
        const refreshedUserInfo = await AccountService.refreshToken(userInfo!.jwt, userInfo!.refreshToken);
        setUserInfo(refreshedUserInfo.data!);
    }

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
        if (isNaN(Number(price))) {
            setPriceValidationError("Only numeric chars!");
            setError("True");
        }
        else if (price.length === 0) {
            setPriceValidationError("Enter price!");
            setError("True");
        }
        else {
            setPriceValidationError("")
        }
        if (isError.length === 4) {
            setError("False");
        }
        else {
            const response = await ItemService.add(
                userInfo!.jwt,
                {
                    id: "10000000-1000-4000-8000-100000000000",
                    boardGameId: selectedGame,
                    itemHeader: header,
                    description: description,
                    price: price,
                    imageURL: "",
                    createdBy: "",
                    createdAt: new Date().toISOString(),
                    updatedBy: "",
                    updatedAt: new Date().toISOString()
                });

            if (response.errors && response.errors.length > 0) {

            } else {
                router.back();
            }
        }
    }

    async function fetchBoardGames() {
        const response = await BoardGameService.getAll(userInfo!.jwt);
        if (response.data) {
            setBoardGames(response.data);
            if (response.errors && response.errors.length > 0) {
                setHeaderValidationError(response.errors[0]);
            }
        }
    }

    useEffect(() => {
        refreshToken();
        fetchBoardGames();

    }, []);



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
    return (
        <div className="create-row">
            <div>
                <h2 className="main-header">Create Item</h2>
            </div>
            <div>
            </div>
            <div className="form-floating mb-3">
                <select className="form-select" value={selectedGame}
                        onChange={(e) => setSelectedGame(e.target.value)}>
                    <option value=""></option>
                    {boardGames?.map((game) => (
                        // @ts-ignore
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
                <div className={`text-danger error-input ${priceValidationError ? 'visible' : ''}`} role="alert">
                    {priceValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number" id="gamePrice" className="form-control"
                        placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label htmlFor="gamePrice" className="form-label">
                        Enter Price (€)
                    </label>
                    <small>{`${price.length}/${MAX_PRICE_LENGTH}`}</small>
                </div>
            </div>
            <div>
                <button onClick={() => validateAndPublish()} className="w-100 btn btn-lg btn-primary">Create</button>
            </div>
        </div>
    );
}
