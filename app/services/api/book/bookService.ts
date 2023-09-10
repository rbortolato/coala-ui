import { ApiService } from "../apiService";
import { IBookService } from "./bookServiceInterface";
import { BookDto } from "../../dto/book/bookDto";
import { CreateBookDto } from "../../dto/book/createBookDto";
import { UpdateBookDto } from "../../dto/book/updateBookDto";

export class BookService extends ApiService implements IBookService {
    constructor() {
        super('books');
    }

    getBooksFromUser(): Promise<BookDto[]> {
        return this.get();
    }

    listBooks(searchInput?: string): Promise <BookDto[]> {
        let url = 'list';
        if (searchInput) url += `?searchInput=${searchInput}`;
        return this.get(url);
    }

    createBook(createBookData: CreateBookDto): Promise<BookDto> {
        return this.post('', createBookData);
    }

    updateBook(updateBookData: UpdateBookDto): Promise<BookDto> {
        return this.put(updateBookData.id.toString(), updateBookData);
    }

    deleteBook(id: number): Promise<BookDto> {
        return this.delete(id.toString());
    }
}

