import axios from "axios";
import type {IResultObject} from "@/types/IResultObject";
import type {IMechanic} from "@/types/IMechanic";
import type {stringOrNull} from "@/types/types";



export default class MechanicService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/Mechanic',
    });

    static async getAll(jwt: string): Promise<IResultObject<IMechanic[]>>{
        try {
            const response = await MechanicService.httpClient.get<IMechanic[]>("", {
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
    static async add(jwt: stringOrNull, mechanic: IMechanic): Promise<IResultObject<IMechanic>> {
        try {
            const response = await MechanicService.httpClient.post<IMechanic>("", mechanic, {
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
    static async get(jwt: stringOrNull, id: string): Promise<IResultObject<IMechanic>> {
        try {
            const response = await MechanicService.httpClient.get<IMechanic>(`/${id}`, {
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
    static async delete(jwt: stringOrNull, id: string): Promise<IResultObject<null>> {
        try {
            const response = await MechanicService.httpClient.delete<IMechanic>(`/${id}`, {
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

    static async put(jwt: stringOrNull, id: string, mechanic: IMechanic): Promise<IResultObject<IMechanic>> {
        try {
            const response = await MechanicService.httpClient.put<IMechanic>(`/${id}`, mechanic, {
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