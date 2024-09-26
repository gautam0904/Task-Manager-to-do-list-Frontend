import { ITask } from "./itask";

export interface IBoard {
    _id ?: string;
    title : string;
    userId : string;
    tasks : ITask[];
}
