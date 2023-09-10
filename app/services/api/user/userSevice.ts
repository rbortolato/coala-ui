import { CreateUserDto } from "../../dto/user/createUserDto";
import { UserDto } from "../../dto/user/userDto";
import { ApiService } from "../apiService";
import { IUserService } from "./userSeviceInterface";

export class UserService extends ApiService implements IUserService {
    constructor() {
        super('users');
    }

    currentUser(): Promise<UserDto> {
        return this.get();
    }
    createUser(createUserData: CreateUserDto): Promise<UserDto> {
        return this.post('', createUserData);
    }
}
