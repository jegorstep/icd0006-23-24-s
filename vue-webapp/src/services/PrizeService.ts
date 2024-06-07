import type {IResultObject} from "@/types/IResultObject";
import type {ISportActivity} from "@/types/ISportActivity";
import axios from "axios";
import type {ITicket} from "@/types/ITicket";
import type {Prize} from "@/types/Prize";
import Prizes from "@/views/prizes/Prizes.vue";

export default class PrizeService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5233/api/v1.0/Prize',
    });

    static async getAll(jwt: string | null): Promise<IResultObject<Prize[]>> {
        try {
            const response = await PrizeService.httpClient.get<Prize[]>("user", {
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

    static async getPrize(jwt: string): Promise<IResultObject<number>> {
        try {
            const response = await PrizeService.httpClient.get<number>("user/score", {
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

    static async add(jwt: string, activity: Prize): Promise<IResultObject<Prize>> {
        try {
            const response = await PrizeService.httpClient.post<Prize>("",
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

    static async get(jwt: string | null, id: string): Promise<IResultObject<Prize>> {
        try {
            const response = await PrizeService.httpClient.get<Prize>(`/${id}`, {
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

    static async delete(jwt: string | null, id: string): Promise<IResultObject<null>> {
        try {
            const response = await PrizeService.httpClient.delete<Prize>(`/${id}`, {
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

    static async put(jwt: string | null, id: string, ticket: Prize): Promise<IResultObject<Prize>> {
        try {
            const response = await PrizeService.httpClient.put<Prize>(`/${id}`, ticket, {
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