import type { IProfile } from "./Profile.type";

export interface IUser {
    id: number;
    email: string;
    password: string;
    confirmPassword? : string
    role?: string
    profile? : IProfile
}