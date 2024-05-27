import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IBoardGame} from "@/domain/IBoardGame";


export default class BoardGameService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/BoardGame',
    });

    static async getAll(jwt: string): Promise<IResultObject<IBoardGame[]>>{
        try {
            const response = await BoardGameService.httpClient.get<IBoardGame[]>("", {
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
    static async add(jwt: string, boardGame: IBoardGame): Promise<IResultObject<IBoardGame>> {
        try {
            const response = await BoardGameService.httpClient.post<IBoardGame>("", boardGame, {
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
    static async get(jwt: string, id: string): Promise<IResultObject<IBoardGame>> {
        try {
            const response = await BoardGameService.httpClient.get<IBoardGame>(`/${id}`, {
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
    static async delete(jwt: string, id: string): Promise<IResultObject<null>> {
        try {
            const response = await BoardGameService.httpClient.delete<IBoardGame>(`/${id}`, {
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

    static async put(jwt: string, id: string, boardGame: IBoardGame): Promise<IResultObject<IBoardGame>> {
        try {
            const response = await BoardGameService.httpClient.put<IBoardGame>(`/${id}`, boardGame, {
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