import { BookDto } from "../book/bookDto";
import { RequestDto } from "../request/requestDto";

export interface UserDto {
    id: number;
    login: string;
    name: string;
    books?: BookDto[];
    requests?: RequestDto[];
}
