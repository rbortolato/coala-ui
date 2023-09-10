import { CreateRequestDto } from "../../dto/request/createRequestDto";
import { RequestDto } from "../../dto/request/requestDto";

export interface IRequestService {
    createRequest(createRequestData: CreateRequestDto): Promise<RequestDto>;
    getRequestsSent(): Promise<RequestDto[]>;
    getRequestsReceveid(): Promise<RequestDto[]>;
    acceptRequest(id: number): Promise<any>;
    deleteRequest(id: number): Promise<RequestDto>;
}
