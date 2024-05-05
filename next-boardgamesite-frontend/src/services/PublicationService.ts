import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import { IUserInfo } from "@/state/AppContext";
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

}