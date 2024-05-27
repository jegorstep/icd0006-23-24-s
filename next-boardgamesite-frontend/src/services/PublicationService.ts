import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IPublication} from "@/domain/IPublication";

export default class PublicationService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/Publication',
    });

    static async getAll(jwt: string): Promise<IResultObject<IPublication[]>>{
        try {
            const response = await PublicationService.httpClient.get<IPublication[]>("", {
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

    static async getUserPublications(jwt: string): Promise<IResultObject<IPublication[]>>{
        try {
            const response = await PublicationService.httpClient.get<IPublication[]>("user", {
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

    static async add(jwt: string, publication: IPublication): Promise<IResultObject<IPublication>> {
        try {
            const response = await PublicationService.httpClient.post<IPublication>("", publication, {
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
    static async get(jwt: string, id: string): Promise<IResultObject<IPublication>> {
        try {
            const response = await PublicationService.httpClient.get<IPublication>(`/${id}`, {
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
            const response = await PublicationService.httpClient.delete<IPublication>(`/${id}`, {
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

    static async put(jwt: string, id: string, publication: IPublication): Promise<IResultObject<IPublication>> {
        try {
            const response = await PublicationService.httpClient.put<IPublication>(`/${id}`, publication, {
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

    static async getSessions(jwt: string): Promise<IResultObject<IPublication[]>> {
        try {
            const response = await PublicationService.httpClient.get<IPublication[]>(`sessions`, {
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
}