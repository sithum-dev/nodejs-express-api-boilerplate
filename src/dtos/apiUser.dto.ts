export class ApiUserDto {
    public username: string;
    public password: string;
    public role: string;
    public uuid: string;
    public officeId?: string;
}

export class CrateApiUserDto {
    public username: string;
    public password: string;
    public officeId?: string;
    public role?: string;
}
