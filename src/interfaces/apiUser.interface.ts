export interface ApiUser {
    username: string;
    password: string;
    role: string;
    uuid: string;
    officeId?: string;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}
