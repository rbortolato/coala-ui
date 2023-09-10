import { useEffect, useState } from "react";
import { Modal, Button, IconButton, Autocomplete, TextField } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { BookDto } from "../services/dto/book/bookDto";
import services from "@/services";
import { CreateRequestDto } from "../services/dto/request/createRequestDto";
import MsgDialog from "./msgDialog";

interface IProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    bookSelected: BookDto;
}

interface IMyBook {
    label: string;
    id: number;
}

const SelectBook = ({
    open,
    setOpen,
    bookSelected,
}: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDialogSucess, setOpenDialogSucess] = useState(false);
    const [books, setBooks] = useState<BookDto[]>([]);
    const { handleSubmit, control } = useForm<IMyBook>();

    useEffect(() => {
        services.book.getBooksFromUser().then(resp => {
            setBooks(resp);
        })
    }, [])

    const onSubmit: SubmitHandler<IMyBook> = async (data) => {
        setIsLoading(true)
        const payload: CreateRequestDto = {
            book_id: data.id,
            book_exchange_id: bookSelected.id
        }
        services.request.createRequest(payload).then(resp => {
            setOpenDialogSucess(true);
        })
    };

    const closeModal = () => {
        setIsLoading(false);
        setOpen(false);
        setOpenDialogSucess(false);
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disablePortal
        >
            <div className="bg-white w-[34rem] p-8 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8">
                <MsgDialog title="Sucesso" msg="Solicitação criada com sucesso" handleOk={closeModal} open={openDialogSucess} />
                <div className="flex items-center justify-between">
                    <h4 className="m-0 text-[1.5rem] font-medium flex-1">
                        Por qual livro deseja trocar?
                    </h4>
                    <IconButton onClick={closeModal}>
                        <AiOutlineCloseCircle size={25} />
                    </IconButton>
                </div>
                <form
                    className="flex flex-col gap-y-3 mx-5 mt-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        control={control}
                        name="id"
                        render={({ field: { onChange } }) => (
                            <Autocomplete
                                options={books.map(book => ({ label: book.title, id: book.id }))}
                                onChange={(event, values) => onChange(values?.id)}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => <TextField required {...params} label="Livros" />}
                            />
                        )}
                    />

                    <Button
                        variant="contained"
                        size="small"
                        className="normal-case bg-blue-900 w-32 ml-auto"
                        disabled={isLoading}
                        type="submit"
                    >
                        OK
                    </Button>
                </form>
            </div>
        </Modal>
    )
};

export default SelectBook;
