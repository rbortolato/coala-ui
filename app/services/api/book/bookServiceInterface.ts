import { BookDto } from "../../dto/book/bookDto";
import { CreateBookDto } from "../../dto/book/createBookDto";
import { UpdateBookDto } from "../../dto/book/updateBookDto";

export interface IBookService {
    getBooksFromUser(): Promise<BookDto[]>;
    listBooks(searchInput?: string): Promise <BookDto[]>;
    createBook(createBookData: CreateBookDto): Promise<BookDto>;
    updateBook(updateBookData: UpdateBookDto): Promise<BookDto>;
    deleteBook(id: number): Promise<BookDto>;
}
