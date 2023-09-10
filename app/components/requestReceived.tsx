import { useState, useEffect } from "react"
import { Button, IconButton, Tooltip } from "@mui/material";
import { RxUpdate } from "react-icons/rx"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import services from "@/services";
import { RequestDto } from "../services/dto/request/requestDto";

const RequestReceived = () => {
    const [requests, setRequests] = useState<RequestDto[]>([]);
    const headList = ['Meu livro', 'Livro para troca', 'Autor', 'Editora', 'Edição', 'Enviado pelo usuário', 'Ações'];

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        services.request.getRequestsReceveid().then(resp => {
            setRequests(resp);
        });
    };

    const handleDelete = (id: number) => {
        services.request.deleteRequest(id).then(resp => {
            load();
        });
    };

    const handleAccept = (id: number) => {
        services.request.acceptRequest(id).then(resp => {
            load();
        });
    };

    const thClasses =
        "border-solid border border-zinc-600 bg-indigo-100 text-zinc-600 py-2 text-center";
    const tdClasses =
        "border-solid border border-zinc-600 whitespace-nowrap pl-2";
    return (
        <div>
            <div className="flex justify-end mb-2">
                <Button
                    id="update"
                    variant="contained"
                    size="small"
                    className="normal-case bg-blue-900 w-28"
                    type="submit"
                    onClick={load}
                >
                    <RxUpdate className="h-4 w-4" />
                    <span className="pl-2">Atualizar</span>
                </Button>
            </div>
            {requests.length == 0 ? <div className="border w-full rounded-lg border-indigo-900 h-10 flex items-center justify-center">Não possui dados</div>
                : <div className="w-full overflow-auto bg-white">
                    <table
                        className="border-collapse text-sm w-full"
                    >
                        <thead className="sticky top-0 text-sm">
                            <tr>
                                {headList.map((head) => (
                                    <th className={thClasses}>
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr
                                    className="hover:bg-indigo-40"
                                    key={request.id}
                                >
                                    <td className={tdClasses}>
                                        {request.book_exchange?.title}
                                    </td>
                                    <td className={tdClasses}>
                                        {request.book?.title}
                                    </td>
                                    <td className={tdClasses}>
                                        {request.book?.author}
                                    </td>
                                    <td className={tdClasses}>
                                        {request.book?.publisher}
                                    </td>
                                    <td className={tdClasses}>
                                        {request.book?.edition || ""}
                                    </td>
                                    <td className={tdClasses}>
                                        {request.book?.user?.name}
                                    </td>
                                    <td className={`${tdClasses} !text-center`}>
                                        <Tooltip title="Aceitar">
                                            <IconButton
                                                aria-label="aceitar"
                                                onClick={() => handleAccept(request.id)}
                                            >
                                                <AiOutlineCheckCircle size={14} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Negar">
                                            <IconButton
                                                aria-label="negar"
                                                onClick={() => handleDelete(request.id)}
                                            >
                                                <AiOutlineCloseCircle size={14} />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default RequestReceived;
