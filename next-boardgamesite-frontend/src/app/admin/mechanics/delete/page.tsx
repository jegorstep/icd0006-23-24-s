"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import {IMechanic} from "@/domain/IMechanic";
import MechanicService from "@/services/MechanicService";



export default function DeleteMechanic() {
    const router = useRouter();
    const { userInfo, setUserInfo } = useContext(AppContext)!;
    const [mechanic, setMechanic] = useState<IMechanic>();
    const [errors, setErrors] = useState("");


    const loadData = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await MechanicService.get(userInfo!.jwt, id);
        if (response.data) {
            setMechanic(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    };

    useEffect(() => { loadData() }, []);

    const handleDelete = async () => {
        if (mechanic) {
            const response = await MechanicService.delete(userInfo!.jwt, mechanic.id);
            if (!response.errors) {
                router.back();
            } else if (response.errors) {
                setErrors(response.errors[0]);
            }
        }
    };

    if (mechanic) {
        return (
            <>
                <h1 className="main-header">Are you sure you want to delete the Mechanic?</h1>

                <div className="details">
                    <h2>Details:</h2>
                    <div>
                        <p>Name: {mechanic.name}</p>
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