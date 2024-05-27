"use client"
import {useContext, useState} from "react";
import {AppContext} from "@/state/AppContext";
import BoardGameService from "@/services/BoardGameService";
import { useRouter } from "next/navigation";
import MechanicService from "@/services/MechanicService";

export default function CreateMechanic() {
    const router = useRouter();
    const {userInfo, setUserInfo} = useContext(AppContext)!;
    const [isError, setError] = useState("False");

    const [name, setName] = useState("");

    const [nameValidationError, setNameValidationError] = useState("");



    const  validateAndPublish = async () => {
        if (name.length < 1) {
            setNameValidationError("Must be at least 1 character long!");
            setError("True")
        } else {
            setNameValidationError("");
        }
        if (isError === "True") {
            setError("False")
        }
        else {
            const response = await MechanicService.add(
                userInfo!.jwt,
                {
                    id: "10000000-1000-4000-8000-100000000000",
                    name: name
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
                <h2 className="main-header">Create Mechanic</h2>
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
                <button onClick={() => validateAndPublish()} className="w-100 btn btn-lg btn-primary">Create</button>
            </div>
        </div>
    )
}