import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IPublication} from "@/domain/IPublication";
import {IUGSession} from "@/domain/IUGSession";

export default class GameSessionService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/GameSession',
    });

    static async participate(jwt: string, publicationId: string): Promise<IResultObject<IUGSession[]>>{
        try {
            const response = await GameSessionService.httpClient.post<IUGSession[]>("", {
                publicationId: publicationId
            }, {
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