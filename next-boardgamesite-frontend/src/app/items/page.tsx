"use client"


import { AppContext } from "@/state/AppContext";
import { useContext, useEffect, useState } from "react";
import {IPublication} from "@/domain/IPublication";
import PublicationService from "@/services/PublicationService";
import Link from "next/link";
import {IItem} from "@/domain/IItem";
import ItemService from "@/services/ItemService";


export default function Items() {
    const [isLoading, setIsLoading] = useState(true);
    const [Items, setItems] = useState<IItem[]>([]);
    const { userInfo, setUserInfo } = useContext(AppContext)!;


    const loadData = async () => {
        const response = await ItemService.getAll(userInfo!.jwt)
        if (response.data) {
            setItems(response.data);
        }

        setIsLoading(false);
    };

    useEffect(() => { loadData() }, []);

    if (isLoading) return (<h1>Items - LOADING</h1>);

    return (
        <>
            <h1 className="main-header">Items</h1>
            <Link href="items/create">Add Your Item</Link>
            {Items.map((item) =>
                <div className="publication" key={item.id}>
                    <div className="publication-image">
                        <img src="placeholder.png" alt="Item Image" />
                    </div>
                    <div className="publication-info">
                        <h2>{item.itemHeader}</h2>
                        <p>Description: {item.description}</p>
                        <Link href={`/items/details?id=${item.id}`}>
                            Buy item
                        </Link>
                        <div className="additional-info">
                            <span>Price: {item.price}</span>
                            <span>Published: {(new Date(item.createdAt)).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            )}

        </>
    );

};


