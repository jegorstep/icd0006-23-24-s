import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IMechanic} from "@/domain/IMechanic";
import {IBGMechanic} from "@/domain/IBGMechanic";


export default class BoardGameMechanicService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/BoardGameMechanic',
    });

    static async getAll(jwt: string): Promise<IResultObject<IBGMechanic[]>>{
        try {
            const response = await BoardGameMechanicService.httpClient.get<IBGMechanic[]>("", {
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
    static async add(jwt: string, mechanic: IBGMechanic): Promise<IResultObject<IBGMechanic>> {
        try {
            const response = await BoardGameMechanicService.httpClient.post<IBGMechanic>("", mechanic, {
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
    static async get(jwt: string, id: string): Promise<IResultObject<IBGMechanic>> {
        try {
            const response = await BoardGameMechanicService.httpClient.get<IBGMechanic>(`/${id}`, {
                headers: {
                    "Authorization": "Bearer " + jwt,
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

    static async getById(jwt: string, id: string): Promise<IResultObject<IMechanic[]>> {
        try {
            const response = await BoardGameMechanicService.httpClient.get<IMechanic[]>(`bg/${id}`, {
                headers: {
                    "Authorization": "Bearer " + jwt,
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

    static async delete(jwt: string, mechanicId: string, boardGameId: string): Promise<IResultObject<null>> {
        try {
            const response = await BoardGameMechanicService.httpClient.delete<IBGMechanic>('', {
                data: {
                    boardGameId: boardGameId,
                    mechanicId: mechanicId
                },
                headers: {
                    "Authorization": "Bearer " + jwt,
                }
            });

            if (response.status < 300) {
                return {
                    data: null
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

    static async put(jwt: string, id: string, mechanic: IBGMechanic): Promise<IResultObject<IBGMechanic>> {
        try {
            const response = await BoardGameMechanicService.httpClient.put<IBGMechanic>(`/${id}`, mechanic, {
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