'use client'

import { useState } from "react";
import { setCookie } from 'cookies-next';
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import services from "@/app/services";
import MsgDialog from '@/app/components/msgDialog';
import { useRouter } from "next/navigation";

type Inputs = {
    login: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const [openDialogError, setOpenDialogError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        services.auth.login(data.login, data.password).then((resp) => {
            setCookie('token', resp.access_token, { maxAge: 60 * 60 * 24 });
            router.push('/');
        })
            .catch(() => {
                setOpenDialogError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const handleRegister = () => {
        router.push('/login/register')
    };

    return (
        <div>
            <MsgDialog
                title="Erro na autenticação!"
                msg="Login/senha inválido."
                open={openDialogError}
                handleOk={() => setOpenDialogError(false)}
            />
            <h1 className="ml-5 font-bold mb-3 mt-1 text-2xl">Login</h1>
            <form
                className="flex flex-col gap-y-3 mx-5 mt-3"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    onClick={handleRegister}
                    size="small"
                >
                    Não possuo cadastro
                </Button>
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
    )
}
