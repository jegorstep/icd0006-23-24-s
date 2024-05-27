"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import PublicationService from "@/services/PublicationService";
import {IPublication} from "@/domain/IPublication";



export default function DeletePublication() {
    const router = useRouter();
    const { userInfo, setUserInfo } = useContext(AppContext)!;
    const [publication, setPublication] = useState<IPublication>();
    const [errors, setErrors] = useState("");


    const loadData = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await PublicationService.get(userInfo!.jwt, id);
        if (response.data) {
            setPublication(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    };

    useEffect(() => { loadData() }, []);

    const handleDelete = async () => {
        if (publication) {
            const response = await PublicationService.delete(userInfo!.jwt, publication.id);
            if (!response.errors) {
                console.log("Deleted");
                router.back();
            } else if (response.errors) {
                setErrors(response.errors[0]);
            }
        }
    };

    if (publication) {
        return (
            <>
                <h1 className="main-header">Are you sure you want to delete publication?</h1>

                <div className="details">
                    <h2>Details:</h2>
                    <div>
                        <p>Publication Header: {publication.publicationHeader}</p>
                    </div>
                    <div>
                        <p>Description: {publication.description}</p>
                    </div>
                    <div>
                        <p>Game Date: {publication.gameDate}</p>
                    </div>
                    <div>
                        <p>Game Location: {publication.gameLocation}</p>
                    </div>
                    <div>
                        <p>Players Amount: {publication.playersAmount}</p>
                    </div>
                    <div>
                        <p>Created By: {publication.createdBy}</p>
                    </div>
                    <div>
                        <p>Updated By: {publication.updatedBy}</p>
                    </div>
                </div>
                {errors}
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