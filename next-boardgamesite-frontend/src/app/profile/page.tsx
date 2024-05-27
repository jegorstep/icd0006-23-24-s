"use client"
import React, {useContext, useEffect, useState} from "react";
import PublicationService from "@/services/PublicationService";
import AccountService from "@/services/AccountService";
import {AppContext} from "@/state/AppContext";
import {IPublication} from "@/domain/IPublication";
import Link from "next/link";
import ItemService from "@/services/ItemService";
import {IItem} from "@/domain/IItem";
import { useRouter } from "next/navigation";


export default function Profile() {
    const router = useRouter();

    const { userInfo, setUserInfo } = useContext(AppContext)!;

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [sex, setSex] = useState("");
    const [Publications, setPublications] = useState<IPublication[]>([]);
    const [Items, setItems] = useState<IItem[]>([]);
    const [visibleLink, setVisibleLink] = useState("");
    const [errors, setErrors] = useState("");
    const [roles, setRoles] = useState<string[]>([]);
    const [mainRole, setMainRole] = useState("");



    const loadData = async () => {
        const response = await AccountService.info(userInfo!.jwt)
        if (response.data) {
            setEmail(response.data.email);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setCountry(response.data.country);
            setSex(response.data.sex);
            setRoles(response.data.role);
        }
    };

    const loadPublications = async () => {
        const response = await PublicationService.getUserPublications(userInfo!.jwt);
        setPublications(response.data!);
    }
    const loadItems = async () => {
        const response = await ItemService.getUserItems(userInfo!.jwt);
        setItems(response.data!);
        setErrors(response.errors ? response.errors[0] : '');
    }

    useEffect(() => {
        loadData();
        loadPublications();
        loadItems();
    }, []);

    useEffect(() => {
        if (roles.includes("Admin")) {
            setMainRole("Admin");
        } else {
            setMainRole("User");
        }
    }, [roles]);
    
    const user = {
        fullName: firstName + " " + lastName,
        country: country,
        sex: sex,
        email: email
    };

    const adminPage = () => {
        router.push('admin');
    }

    return (
        <div className="profile-container">
            <div className="profile-picture">
                <img src="placeholderprofile.jpg" width="300px" height="300px" alt="Profile" />
            </div>
            <div className="profile-info">
                <h2>{user.fullName}</h2>
                <p>
                    <strong>Country:</strong> {user.country}
                </p>
                <p>
                    <strong>Sex:</strong> {user.sex}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
            </div>
            <div className="profile-links">
                <button className="btn profile-btn" onClick={() => setVisibleLink("publicationsLink")}>Show Publications</button>
                <button className="btn profile-btn" onClick={() => setVisibleLink("itemsLink")}>Show Items</button>
                {mainRole === "Admin" &&
                    <button className="btn profile-btn" onClick={() => adminPage()}>Admin Page</button>}
            </div>
            {visibleLink === "publicationsLink" &&
                Publications.map((item) =>
                        <div className="publication" key={item.id}>
                            <div className="publication-image">
                                <img src="placeholder.png" alt="Publication Image" />
                            </div>
                            <div className="publication-info">
                                <h2>{item.publicationHeader}</h2>
                                <p>Description: {item.description}</p>
                                <span>
                                    <Link href={`/publications/delete?id=` + item.id}>
                                        Delete
                                    </Link>
                                    <Link href={`/publications/update?id=` + item.id}>
                                        Update
                                    </Link>
                                </span>
                                <div className="additional-info">
                                    <span>Players needed: {item.playersAmount}</span>
                                    <span>Date: {(new Date(item.gameDate)).toLocaleDateString()}</span>
                                    <span>Time: {(new Date(item.gameDate)).toLocaleTimeString()}</span>
                                    <span>Location: {item.gameLocation}</span>
                                </div>
                            </div>
                        </div>
                )}
            {visibleLink === "itemsLink" &&
                Items.map((item) =>
                        <div className="publication" key={item.id}>
                            <div className="publication-image">
                                <img src="placeholder.png" alt="Item Image" />
                            </div>
                            <div className="publication-info">
                                <h2>{item.itemHeader}</h2>
                                <p>Description: {item.description}</p>
                                <span>
                                    <Link href={`/items/delete?id=` + item.id}>
                                        Delete
                                    </Link>
                                    <Link href={`/items/update?id=` + item.id}>
                                        Update
                                    </Link>
                                </span>
                                <div className="additional-info">
                                    <span>Price: {item.price}</span>
                                    <span>Published: {(new Date(item.createdAt)).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                )}
            {errors}
        </div>
    );
};


