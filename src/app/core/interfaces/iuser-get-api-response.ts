import { IUser } from "./iuser";

export interface IUserGetApiResponse {
    message : string;
    data : IUser[] | IUser
}
