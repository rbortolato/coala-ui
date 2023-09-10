import { BookDto } from "../book/bookDto";
import { UserDto } from "../user/userDto";

export interface RequestDto {
    id: number;
    user?: UserDto;
    user_id: number;
    book?: BookDto;
    book_id: number;
    book_exchange?: BookDto;
    book_exchange_id: number;
}
