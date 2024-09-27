import { ITask } from "./itask";

export interface ITaskGetApiResponse {
    message : string;
    data : ITask[] | ITask
}

