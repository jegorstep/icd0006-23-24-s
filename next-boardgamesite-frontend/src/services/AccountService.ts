import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IUser} from "@/domain/IUser";


export default class AccountService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/identity/Account/',
    });

    static async login(email: string, pwd: string): Promise<IResultObject<IUserInfo>> {
        const loginData = {
            email: email,
            password: pwd
        }
        try {

            const response = await AccountService.httpClient.post<IUserInfo>("Login", loginData);
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }
    static async logout(jwt: string, refreshToken: string): Promise<IResultObject<number>> {
        try {

            const response = await AccountService.httpClient.post<number>("Logout",
                {
                    refreshToken: refreshToken
                },
                {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                }
            );
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }


    static async register(email: string, pwd: string, firstName: string, lastName: string, country: string, sex: string
    ): Promise<IResultObject<IUserInfo>> {
        const registerData = {
            email: email,
            password: pwd,
            firstname: firstName,
            lastname: lastName,
            country: country,
            sex: sex
        }
        try {

            const response = await AccountService.httpClient.post<IUserInfo>("Register", registerData);
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

    static async refreshToken(jwt: string, refreshToken: string): Promise<IResultObject<IUserInfo>> {
        const refreshTokenData = {
            "jwt": jwt,
            "refreshToken": refreshToken
        }
        try {

            const response = await AccountService.httpClient.post<IUserInfo>("RefreshTokenData",
                refreshTokenData, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                });
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

    static async info(jwt: string): Promise<IResultObject<IUser>> {
        try {
            const response = await AccountService.httpClient.get<IUser>("Info",
                {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                });
            if (response.status < 300) {
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }
}