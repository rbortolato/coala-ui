import { useEffect, useState } from "react";
import { Modal, TextField, Button, IconButton } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateBookDto } from "../services/dto/book/createBookDto";
import { BookDto } from "../services/dto/book/bookDto";
import services from "@/services";
import { UpdateBookDto } from "../services/dto/book/updateBookDto";

interface IProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    bookSelected: BookDto | null;
    loadBooks: () => void;
}

const AddEditBooks = ({
    open,
    setOpen,
    bookSelected,
    loadBooks
}: IProps) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { register, handleSubmit, setValue, reset } = useForm<BookDto>();

    useEffect(() => {
        if (bookSelected) {
            setValue('title', bookSelected.title);
            setValue('author', bookSelected.author);
            setValue('publisher', bookSelected.publisher);
            setValue('edition', bookSelected.edition);
        } else {
            reset();
        }
    }, [open])

    const onSubmit: SubmitHandler<BookDto> = async (data) => {
        setIsLoading(true);
        if (bookSelected) {
            const payload: UpdateBookDto = {
                id: bookSelected.id,
                title: data.title,
                author: data.author,
                publisher: data.publisher,
                edition: data.edition || null
            }
            services.book.updateBook(payload).then(() => {
                closeModal();
            })
        } else {
            const payload: CreateBookDto = {
                title: data.title,
                author: data.author,
                publisher: data.publisher,
                edition: data.edition || null
            }
            services.book.createBook(payload).then(() => {
                closeModal();
            })
        }
    }

    const closeModal = () => {
        reset();
        loadBooks();
        setIsLoading(false);
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disablePortal
        >
            <div className="bg-white w-[34rem] p-8 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h4 className="m-0 text-[1.5rem] font-medium flex-1">
                        {bookSelected ? 'Edição' : 'Cadastro'} de livro
                    </h4>
                    <IconButton onClick={closeModal}>
                        <AiOutlineCloseCircle size={25} />
                    </IconButton>
                </div>
            <form
                className="flex flex-col gap-y-3 mx-5 mt-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    required
                    label="Título"
                    size="small"
                    {...register('title')}
                />
                <TextField
                    label="Autor"
                    size="small"
                    {...register('author')}

                />
                <TextField
                    label="Editora"
                    size="small"
                    {...register('publisher')}
                />
                <TextField
                    label="Edição"
                    type="number"
                    size="small"
                    {...register('edition')}
                />
                <Button
                    variant="contained"
                    size="small"
                    className="normal-case bg-blue-900 w-32 ml-auto"
                    type="submit"
                    disabled={isLoading}
                >
                    OK
                </Button>
            </form>
            </div>
        </Modal>
    )
};

export default AddEditBooks;
