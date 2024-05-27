import axios from "axios";
import {IResultObject} from "@/services/ResultObject";
import {IItem} from "@/domain/IItem";
import {IComment} from "@/domain/IComment";

export default class CommentService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'http://localhost:5134/api/v1/Comment',
    });

    static async getPublicactionComments(publicationId: string, jwt: string): Promise<IResultObject<IComment[]>>{
        try {
            const response = await CommentService.httpClient.get<IComment[]>
            ("publication/" + publicationId,
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


    static async addPubComment(publicationId: string, jwt: string, comment: IComment): Promise<IResultObject<IComment>> {
        try {
            const response = await CommentService.httpClient.post<IComment>
            ("publication/" + publicationId, comment,
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
    static async getItemComments(ItemId: string, jwt: string): Promise<IResultObject<IComment[]>>{
        try {
            const response = await CommentService.httpClient.get<IComment[]>
            ("item/" + ItemId,
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


    static async addItemComments(itemId: string, jwt: string, comment: IComment): Promise<IResultObject<IComment>> {
        try {
            const response = await CommentService.httpClient.post<IComment>
            ("item/" + itemId, comment,
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
    static async get(jwt: string, id: string): Promise<IResultObject<IComment>> {
        try {
            const response = await CommentService.httpClient.get<IComment>(`/${id}`, {
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
    static async delete(jwt: string, commentId: string, publicationId: string): Promise<IResultObject<null>> {
        try {
            const response = await CommentService.httpClient.delete<IComment>("", {
                data: {
                    commentId: commentId,
                    publicationId: publicationId
                },
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
}