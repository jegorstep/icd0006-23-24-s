"use client"
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/state/AppContext";
import {IPublication} from "@/domain/IPublication";
import {IBoardGame} from "@/domain/IBoardGame";
import {IMechanic} from "@/domain/IMechanic";
import PublicationService from "@/services/PublicationService";
import BoardGameService from "@/services/BoardGameService";
import BoardGameMechanicService from "@/services/BoardGameMechanicService";
import CommentService from "@/services/CommentService";
import {IComment} from "@/domain/IComment";
import {IItem} from "@/domain/IItem";
import ItemService from "@/services/ItemService";

export default function ItemDetails() {
    const {userInfo, setUserInfo} = useContext(AppContext)!;
    const [item, setItem] = useState<IItem>();
    const [boardGame, setBoardGame] = useState<IBoardGame>();
    const [mechanics, setMechanics] = useState<IMechanic[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [newCommentText, setNewCommentText] = useState("");

    const loadData = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')!;
        const response = await ItemService.get(userInfo!.jwt, id);
        if (response.data) {
            setItem(response.data);
            const responseBoardGame = await BoardGameService.get(userInfo!.jwt, response.data.boardGameId);
            if (responseBoardGame.data) {
                setBoardGame(responseBoardGame.data);
                const responseMechanics = await BoardGameMechanicService.getById(userInfo!.jwt, responseBoardGame.data.id);
                if (responseMechanics.data) {
                    setMechanics(responseMechanics.data);
                }
            }
            const responseComments = await CommentService.getItemComments(response.data.id, userInfo!.jwt);
            if (responseComments.data) {
                setComments(responseComments.data);
            }

        }

    };

    useEffect(() => {
        loadData();
    }, []);

    const formatData = (string: string) => {
        const dateTime = new Date(string);

        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');

        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    const handleNewCommentSubmit = async () => {

        if (!newCommentText.trim()) {
            return;
        }

        const newComment = {
            id: "10000000-1000-4000-8000-100000000000",
            userId: "10000000-1000-4000-8000-100000000000",
            userName: "",
            text: newCommentText,
            datePublished: new Date().toISOString()
        };

        const result = await CommentService.addItemComments(item!.id, userInfo!.jwt, newComment);
        if (result.data) {
            setComments([result.data, ...comments]);
            setNewCommentText("");
        } else if (result.errors) {
            console.error("Error adding comment:", result.errors);
        }
    };



    return (
        <div className="publication-details">
            <h2>{item?.itemHeader}</h2>
            <div>Posted by {item?.createdBy}</div>
            <div>Posted at: {item ? formatData(item.createdAt) : ""} Last updated: {item ? formatData(item.updatedAt) : ""}</div>

            <div className="board-game-info">
                <div>Board Game: {boardGame?.name}</div>
                <div>About the game: {boardGame?.description}</div>
                <span>Game Mechanics: {mechanics.map(item => (
                    <span key={item.id}>{item.name}</span>
                ))}
                </span>
            </div>

            <div>Description: {item?.description}</div>
            <div>Price: {item?.price}</div>

            <div className="comments-section">
                <h3>Comments</h3>
                {comments.map((comment) =>
                    <div className="comment" key={comment.id}>
                        <div className="comment-author">{comment.userName}</div>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-date">{formatData(comment.datePublished)}</div>
                    </div>)}
                <textarea
                    className="comment-input"
                    placeholder="Write your comment here..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button onClick={() => handleNewCommentSubmit()} className="comment-submit-btn">Submit</button>
            </div>
        </div>
    );

}