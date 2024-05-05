import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IBoardGame} from "@/domain/IBoardGame";
import { IUserInfo } from "@/state/AppContext";

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

}