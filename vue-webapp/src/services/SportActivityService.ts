import type {IResultObject} from "@/types/IResultObject";
import type {ISportActivity} from "@/types/ISportActivity";
import axios from "axios";
import type {ITicket} from "@/types/ITicket";

export default class SportActivityService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5233/api/v1.0/SportActivity',
    });

    static async getAll(jwt: string | null): Promise<IResultObject<ISportActivity[]>> {
        try {
            const response = await SportActivityService.httpClient.get<ISportActivity[]>("user", {
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

    static async getScore(jwt: string | null): Promise<IResultObject<number>> {
        try {
            const response = await SportActivityService.httpClient.get<number>("user/score", {
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

    static async add(jwt: string, activity: ISportActivity): Promise<IResultObject<ISportActivity>> {
        try {
            const response = await SportActivityService.httpClient.post<ISportActivity>("",
                activity,
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

    static async get(jwt: string, id: string): Promise<IResultObject<ISportActivity>> {
        try {
            const response = await SportActivityService.httpClient.get<ISportActivity>(`/${id}`, {
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
            const response = await SportActivityService.httpClient.delete<ITicket>(`/${id}`, {
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

    static async put(jwt: string, id: string, ticket: ISportActivity): Promise<IResultObject<ITicket>> {
        try {
            const response = await SportActivityService.httpClient.put<ITicket>(`/${id}`, ticket, {
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