"use client"
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import BoardGameService from "@/services/BoardGameService";
import { useRouter } from "next/navigation";
import {IBoardGame} from "@/domain/IBoardGame";
import PublicationService from "@/services/PublicationService";

export default function UpdateBG() {
    const router = useRouter();
    const {userInfo, setUserInfo} = useContext(AppContext)!;
    const [isError, setError] = useState("False");

    const [boardGame, setBoardGame] = useState<IBoardGame>();

    const [name, setName] = useState("");
    const [complexity, setComplexity] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const [description, setDescription] = useState("");


    const [nameValidationError, setNameValidationError] = useState("");
    const [complexityValidationError, setComplexityValidationError] = useState("");
    const [minAmountValidationError, setMinAmountValidationError] = useState("");
    const [maxAmountValidationError, setMaxAmountValidationError] = useState("");
    const [descriptionValidationError, setDescriptionValidationError] = useState("");

    const loadBoardGame = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await BoardGameService.get(userInfo!.jwt, id);
        console.log(response)
        if (response.data) {
            setBoardGame(response.data);
            setName(response.data.name);
            setDescription(response.data.description);
            setComplexity(response.data.complexity);
            setMinAmount(response.data.minimumPlayers);
            setMaxAmount(response.data.maximumPlayers);
        }
    };

    useEffect( () => {

        loadBoardGame();


    }, [userInfo]);


    const  validateAndPublish = async () => {
        if (name.length < 1) {
            setNameValidationError("Must be at least 1 character long!");
            setError("True")
        } else {
            setNameValidationError("");
        }
        if (description.length < 1) {
            setDescriptionValidationError("Must be at least 1 character long!");
            setError("True");
        } else {
            setDescriptionValidationError("");
        }
        if (isNaN(Number(minAmount))) {
            setMinAmountValidationError("Must be number!");
            setError("True");
        } else {
            setMinAmountValidationError("");
        }
        if (isNaN(Number(maxAmount))) {
            setMaxAmountValidationError("Must be number!")
        } else {
            setMaxAmountValidationError("");
        }
        if (isError === "True") {
            setError("False")
        }
        else {
            const response = await BoardGameService.put(userInfo!.jwt,
                boardGame!.id,
                {
                    id: boardGame!.id,
                    name: name,
                    complexity: complexity,
                    description: description,
                    minimumPlayers: minAmount,
                    maximumPlayers: maxAmount,
                    imageUrl: ""
                });

            if (response.errors && response.errors.length > 0) {
                setNameValidationError(response.errors[0])
            } else {
                router.back();
            }

        }
    }

    return (
        <div className="create-row">
            <div>
                <h2 className="main-header">Update Board Game</h2>
            </div>
            <div>
                <div className={`text-danger error-input ${nameValidationError ? 'visible' : ''}`} role="alert">
                    {nameValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text" id="name" className="form-control" onChange={(e) => setName(e.target.value)}
                        placeholder="name" value={name}/>
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${complexityValidationError ? 'visible' : ''}`} role="alert">
                    {complexityValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text" id="complexity" className="form-control" onChange={(e) => setComplexity(e.target.value)}
                        placeholder="complexity" value={complexity}/>
                    <label htmlFor="complexity" className="form-label">
                        Complexity
                    </label>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${descriptionValidationError ? 'visible' : ''}`} role="alert">
                    {descriptionValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text" id="description" className="form-control" onChange={(e) => setDescription(e.target.value)}
                        placeholder="description" value={description}/>
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${minAmountValidationError ? 'visible' : ''}`} role="alert">
                    {minAmountValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number" id="minAmount" className="form-control"
                        placeholder="minAmount" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
                    <label htmlFor="minAmount" className="form-label">
                        Minimum Players
                    </label>
                </div>
            </div>
            <div>
                <div className={`text-danger error-input ${maxAmountValidationError ? 'visible' : ''}`} role="alert">
                    {maxAmountValidationError}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number" id="maxAmount" className="form-control"
                        placeholder="maxAmount" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
                    <label htmlFor="maxAmount" className="form-label">
                        Maximum Players
                    </label>
                </div>
            </div>

            <div>
                <button onClick={() => validateAndPublish()} className="w-100 btn btn-lg btn-primary">Update</button>
            </div>
        </div>
    )
}