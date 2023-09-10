import { TokenDto } from "../../dto/auth/tokenDto";

export interface IAuthService {
    login(login: string, password: string): Promise<TokenDto>;
}
