"use client"
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import PublicationService from "@/services/PublicationService";
import {IPublication} from "@/domain/IPublication";
import {IItem} from "@/domain/IItem";
import ItemService from "@/services/ItemService";



export default function DeleteItem() {
    const router = useRouter();
    const { userInfo, setUserInfo } = useContext(AppContext)!;
    const [item, setItem] = useState<IItem>();
    const [errors, setErrors] = useState("");


    const loadData = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await ItemService.get(userInfo!.jwt, id);
        console.log("Here" + id)
        if (response.data) {
            setItem(response.data);
        } else if (response.errors) {
            setErrors(response.errors[0]);
        }
    };

    useEffect(() => { loadData() }, []);

    const handleDelete = async () => {
        if (item) {
            const response = await ItemService.delete(userInfo!.jwt, item.id);
            if (!response.errors) {
                router.back();
            } else if (response.errors) {
                setErrors(response.errors[0]);
            }
        }
    };

    if (item) {
        return (
            <>
                <h1 className="main-header">Are you sure you want to delete item?</h1>

                <div className="details">
                    <h2>Details:</h2>
                    <div>
                        <p>Item Header: {item.itemHeader}</p>
                    </div>
                    <div>
                        <p>Description: {item.description}</p>
                    </div>

                    <div>
                        <p>Price: {item.price}</p>
                    </div>
                    <div>
                        <p>Created By: {item.createdBy}</p>
                    </div>
                    <div>
                        <p>Updated By: {item.updatedBy}</p>
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