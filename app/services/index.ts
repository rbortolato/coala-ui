import { AuthService } from "./api/auth/authService";
import { IAuthService } from "./api/auth/authServiceInterface";
import { UserService } from "./api/user/userSevice";
import { IUserService } from "./api/user/userSeviceInterface";
import { BookService } from "./api/book/bookService";
import { IBookService } from "./api/book/bookServiceInterface";
import { RequestService } from "./api/request/requestService";
import { IRequestService } from "./api/request/requestServiceInterface";

class Services {
    auth: IAuthService;
    user: IUserService;
    book: IBookService;
    request: IRequestService;

    constructor() {
        this.auth = new AuthService();
        this.user = new UserService();
        this.book = new BookService();
        this.request = new RequestService();
    }
}

export default new Services();
