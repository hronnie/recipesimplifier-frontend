export class LoginResponse {
    constructor(
       public success: boolean,
       public token: string,
       public lastLogin: Date
    ) {}
 }