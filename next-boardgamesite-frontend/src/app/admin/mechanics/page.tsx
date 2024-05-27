 "use client"

import {useContext, useEffect, useState} from "react";
import {IBoardGame} from "@/domain/IBoardGame";
import Link from "next/link";
 import BoardGameService from "@/services/BoardGameService";
 import {AppContext} from "@/state/AppContext";
 import {IMechanic} from "@/domain/IMechanic";
 import MechanicService from "@/services/MechanicService";

export default function Mechanics() {
    const [mechanics, setMechanics] = useState<IMechanic[]>([]);
    const {userInfo, setUserInfo} = useContext(AppContext)!;

    async function fetchMechanics() {
        const response = await MechanicService.getAll(userInfo!.jwt);
        if (response.data) {
            setMechanics(response.data);
            if (response.errors && response.errors.length > 0) {

            }
        }
    }

    useEffect(() => {
        fetchMechanics();

    }, []);

    return (
        <>
        <h2 className="main-header">Mechanics</h2>
            <Link href="mechanics/create" className="addButton">Add</Link>
            {mechanics.map((item) =>
                <div key={item.id} className="item-container">
                    <p><strong>Name:</strong> {item.name}</p>
                    <Link href={"mechanics/update?id=" + item.id} className="updateLink">Update</Link>
                    <Link href={"mechanics/delete?id=" + item.id} className="deleteLink">Delete</Link>
                </div>
            )}
        </>
    );
}