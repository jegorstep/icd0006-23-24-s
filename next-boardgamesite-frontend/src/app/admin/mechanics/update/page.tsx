"use client"
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import { useRouter } from "next/navigation";
import {IMechanic} from "@/domain/IMechanic";
import MechanicService from "@/services/MechanicService";

export default function UpdateMechanic() {
    const router = useRouter();
    const {userInfo, setUserInfo} = useContext(AppContext)!;
    const [isError, setError] = useState("False");

    const [mechanic, setMechanic] = useState<IMechanic>();

    const [name, setName] = useState("");


    const [nameValidationError, setNameValidationError] = useState("");

    const loadMechanic = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await MechanicService.get(userInfo!.jwt, id);
        if (response.data) {
            setMechanic(response.data);
            setName(response.data.name);
        }
    };

    useEffect( () => {

        loadMechanic();


    }, [userInfo]);


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
            console.log(mechanic!.id);
            console.log(userInfo?.jwt);
            const response = await MechanicService.put(userInfo!.jwt,
                mechanic!.id,
                {
                    id: mechanic!.id,
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
                <h2 className="main-header">Update Mechanic</h2>
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
                <button onClick={() => validateAndPublish()} className="w-100 btn btn-lg btn-primary">Update</button>
            </div>
        </div>
    )
}