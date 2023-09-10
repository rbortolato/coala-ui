import { TokenDto } from "../../dto/auth/tokenDto";
import { ApiService } from "../apiService";
import { IAuthService } from "./authServiceInterface";

export class AuthService extends ApiService implements IAuthService {
    constructor() {
        super('auth');
    }

    login(login: string, password: string): Promise<TokenDto> {
        return super.post('login', {  login, password });
    }
}
