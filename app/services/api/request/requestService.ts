import { ApiService } from "../apiService";
import { IRequestService } from "./requestServiceInterface";
import { CreateRequestDto } from "../../dto/request/createRequestDto";
import { RequestDto } from "../../dto/request/requestDto";

export class RequestService extends ApiService implements IRequestService {
    constructor() {
        super('requests');
    }

    createRequest(createRequestData: CreateRequestDto): Promise<RequestDto> {
        return this.post('', createRequestData);
    }

    getRequestsSent(): Promise<RequestDto[]> {
        return this.get('sent');
    }

    getRequestsReceveid(): Promise<RequestDto[]> {
        return this.get('received');
    }

    acceptRequest(id: number): Promise<any> {
        return this.put(`accept/${id}`, null);
    }

    deleteRequest(id: number): Promise<RequestDto> {
        return this.delete(id.toString());
    }
}
