"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import BoardGameService from "@/services/BoardGameService";
import {IItem} from "@/domain/IItem";
import ItemService from "@/services/ItemService";


const MAX_HEADER_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_LOCATION_LENGTH = 128;

export default function UpdateItems() {
    const [boardGames, setBoardGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");


    const router = useRouter();
    const [isError, setError] = useState("False");
    const [item, setItem] = useState<IItem>();
    const {userInfo, setUserInfo} = useContext(AppContext)!;

    const loadItem = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await ItemService.get(userInfo!.jwt, id);
        if (response.data) {
            setItem(response.data)
            setHeader(response.data.itemHeader);
            setDescription(response.data.description);
            setSelectedGame(response.data.boardGameId);
            setPrice(response.data.price);
        }
    };



    useEffect( () => {
        async function fetchBoardGames() {
            const response = await BoardGameService.getAll(userInfo!.jwt);
            if (response.data) {
                // @ts-ignore
                setBoardGames(response.data);
                if (response.errors && response.errors.length > 0) {
                    setHeaderValidationError(response.errors[0]);
                }
            }
        }
        loadItem();
        fetchBoardGames();


    }, [userInfo]);


    const [header, setHeader] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [headerValidationError, setHeaderValidationError] = useState("");
    const [descriptionValidationError, setDescriptionValidationError] = useState("");



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
        if (isError === "True") {
            setError("False")
        }
        else {
            console.log(item!.id)
            const response = await ItemService.put(
                userInfo!.jwt,
                item!.id,
                {
                    id: item!.id,
                    createdBy: item!.createdBy,
                    createdAt: item!.createdAt,
                    updatedBy: item!.updatedBy,
                    updatedAt: item!.updatedAt,
                    boardGameId: selectedGame,
                    itemHeader: header,
                    description: description,
                    price: price,
                    imageURL: "",
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
    return (
        <div className="create-row">
            <div>
                <h2 className="main-header">Update Item</h2>
            </div>
            <div>
            </div>
            <div className="form-floating mb-3">
                <select className="form-select" value={selectedGame}
                        onChange={(e) => setSelectedGame(e.target.value)}>
                    <option value={item?.boardGameId}>If not selected, will be the same game</option>
                    {boardGames.map((game) => (
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
                <div className="form-floating mb-3">
                    <input
                        type="text" id="gamePrice" className="form-control"
                        placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label htmlFor="gamePrice" className="form-label">
                        Enter Price (€)
                    </label>
                    <small>{`${price.length}/${MAX_LOCATION_LENGTH}`}</small>
                </div>
            </div>
            <div>
                <button onClick={(e) => validateAndPublish()} className="w-100 btn btn-lg btn-primary">Update</button>
            </div>
        </div>
    );
}
