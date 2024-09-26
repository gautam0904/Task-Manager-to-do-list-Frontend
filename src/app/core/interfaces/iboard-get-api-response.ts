import { IBoard } from "./iboard";

export interface IBoardGetApiResponse {
    message : string;
    data : IBoard[] | IBoard
}
