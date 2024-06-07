import axios from "axios";
import type {IResultObject} from "@/types/IResultObject";
import type {ILottery} from "@/types/ILottery";
import type {IParticipants} from "@/types/IParticipants";


export default class LotteryService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5233/api/v1/Lottery',
    });

    static async getAll(jwt: string | null): Promise<IResultObject<ILottery[]>>{
        try {
            const response = await LotteryService.httpClient.get<ILottery[]>("", {
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

    static async getUserLotteries(jwt: string): Promise<IResultObject<ILottery[]>>{
        try {
            const response = await LotteryService.httpClient.get<ILottery[]>("user", {
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

    static async getParticipants(jwt: string, id:string): Promise<IResultObject<IParticipants[]>>{
        try {
            const response = await LotteryService.httpClient.get<IParticipants[]>("lottery/" + id, {
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

    static async add(jwt: string, lottery: ILottery): Promise<IResultObject<ILottery>> {
        try {
            const response = await LotteryService.httpClient.post<ILottery>("", lottery, {
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
    static async participate(jwt: string | null, id: string, isAnonymous: boolean): Promise<IResultObject<ILottery>> {
        try {
            const response = await LotteryService.httpClient.post("Participate",
                {
                    lotteryId: id,
                    isAnonymous: isAnonymous
            }
            , {
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

    static async stopParticipate(jwt: string, id: string): Promise<IResultObject<ILottery>> {
        try {
            const response = await LotteryService.httpClient.delete("StopParticipate/" + id, {
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

    static async get(jwt: string | null, id: string): Promise<IResultObject<ILottery>> {
        try {
            const response = await LotteryService.httpClient.get<ILottery>(`/${id}`, {
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
            const response = await LotteryService.httpClient.delete<ILottery>(`/${id}`, {
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

    static async put(jwt: string, id: string, lottery: ILottery): Promise<IResultObject<ILottery>> {
        try {
            const response = await LotteryService.httpClient.put<ILottery>(`/${id}`, lottery, {
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