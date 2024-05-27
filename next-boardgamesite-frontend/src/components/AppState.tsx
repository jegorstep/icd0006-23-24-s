"use client"

import { AppContext, IUserInfo } from "@/state/AppContext";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function AppState({
                                     children,
                                 }: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
    }, [userInfo, router]);


    return (
        <AppContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </AppContext.Provider>
    );

}
