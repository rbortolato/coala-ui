import { CreateUserDto } from "../../dto/user/createUserDto";
import { UserDto } from "../../dto/user/userDto";

export interface IUserService {
    currentUser(id: number): Promise<UserDto>;
    createUser(createUserData: CreateUserDto): Promise<UserDto>;
}
