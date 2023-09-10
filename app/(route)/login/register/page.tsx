'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button} from "@mui/material";
import services from "@/services";
import MsgDialog from '@/components/msgDialog';
import { CreateUserDto } from "@/services/dto/user/createUserDto";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [ openDialogError, setOpenDialogError ] = useState(false);
    const [ openDialogSucesso, setOpenDialogSucesso ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { register, handleSubmit } = useForm<CreateUserDto>();
    const onSubmit: SubmitHandler<CreateUserDto> = async (data) => {
        setIsLoading(true);
        services.user.createUser(data).then((resp) => {
            setOpenDialogSucesso(true);
        })
        .catch(() => {
            setOpenDialogError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    const handleLogin = () => {
        router.push('/login')
    };

    return (
        <div>
            <MsgDialog
                title="Informação"
                msg="Usuário já existente."
                open={openDialogError}
                handleOk={() => setOpenDialogError(false)}
            />
            <MsgDialog
                title=""
                msg="Usuário cadastrado com sucesso"
                open={openDialogSucesso}
                handleOk={handleLogin}
            />
            <h1 className="ml-5 font-bold mb-3 mt-1 text-2xl">Cadastro de usuário</h1>
            <form
                className="flex flex-col gap-y-3 mx-5 mt-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    required
                    label="Nome"
                    size="small"
                    {...register('name')}
                />
                <TextField
                    required
                    label="Login"
                    size="small"
                    {...register('login')}
                />
                <TextField
                    required
                    label="Senha"
                    size="small"
                    type="password"
                    {...register('password')}

                />
                <Button
                    variant="contained"
                    size="small"
                    className="normal-case bg-blue-900 w-32 ml-auto"
                    type="submit"
                    disabled={isLoading}
                >
                    Cadastrar
                </Button>
            </form>
        </div>
    )
}
