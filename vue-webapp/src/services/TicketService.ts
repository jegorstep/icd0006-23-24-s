import type {IResultObject} from "@/types/IResultObject";
import type {ISportActivity} from "@/types/ISportActivity";
import axios from "axios";
import type {ITicket} from "@/types/ITicket";

export default class TicketService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5233/api/v1.0/Ticket',
    });

    static async getAll(jwt: string): Promise<IResultObject<ITicket[]>> {
        try {
            const response = await TicketService.httpClient.get<ITicket[]>("user", {
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

    static async getTicket(jwt: string): Promise<IResultObject<number>> {
        try {
            const response = await TicketService.httpClient.get<number>("user/score", {
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

    static async add(jwt: string, activity: ITicket): Promise<IResultObject<ITicket>> {
        try {
            const response = await TicketService.httpClient.post<ITicket>("",
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

    static async get(jwt: string, id: string): Promise<IResultObject<ITicket>> {
        try {
            const response = await TicketService.httpClient.get<ITicket>(`/${id}`, {
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
            const response = await TicketService.httpClient.delete<ITicket>(`/${id}`, {
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

    static async put(jwt: string, id: string, ticket: ITicket): Promise<IResultObject<ITicket>> {
        try {
            const response = await TicketService.httpClient.put<ITicket>(`/${id}`, ticket, {
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