import { RequestDto } from "../request/requestDto";
import { UserDto } from "../user/userDto";

export interface BookDto {
    id: number;
    user?: UserDto;
    user_id: number;
    title: string;
    author?: string;
    publisher?: string;
    edition?: number;
    requests?: RequestDto[];
    requests_exchange?: RequestDto[];
}
