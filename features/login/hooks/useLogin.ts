import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import {object, string} from "yup";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {IUserSnapshotIn} from "../../../mst/models/user_model";
import {post} from "../../../utils/services/http";
import {useUserStore} from "../../../mst/providers/domain_store_provider";
import {error, promise} from "../../../utils/services/notifications";
import {ApiError} from "../../../utils/shared_types/ApiError";

interface ILoginForm {
    email: string;
    password: string;
}

const schema = object({
    email: string().required().min(3).email(),
    password: string().required().min(3)
});

interface ILoginResponse {
    user: IUserSnapshotIn;
    accessToken: string;
    refreshToken: string;
}

const login = ({ email, password }: ILoginForm) => {
    const { request } = post<ILoginResponse>('auth/login', {
        auth: {
            username: email,
            password
        }
    });

    return request;
};

export const useLogin = () => {
    const userStore = useUserStore();

    const router = useRouter();

    const form = useForm<ILoginForm>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const { mutateAsync, isLoading } = useMutation(login, {
        onSuccess: ({ data }) => {
            userStore.logIn(data.user);
            router.push('/login/switch');
        }
    });

    const onSubmit = useCallback<SubmitHandler<ILoginForm>>(
        async value => {
            promise(
                mutateAsync(value),
                {
                    loading: {
                        title: 'Logging in...',
                        message: `Please wait while we log you in.`
                    }
                },
                {
                    onSuccessContent: ({ data }) => ({
                        title: `Welcome ${data.user.firstName}!`,
                        message: `You have successfully logged in.`
                    }),
                    onErrorContent: ({ response }: AxiosError<ApiError>) => {
                        switch (response?.data.key) {
                            case 'user-not-found':
                                return {
                                    title: 'User not found',
                                    message:
                                        'The user you are trying to log in with does not exist.'
                                };
                            case 'password-not-match':
                                return {
                                    title: 'Password not match',
                                    message:
                                        'The password you entered does not match the one we have on record.'
                                };
                        }

                        return {
                            title: 'An error occurred',
                            message: 'Please try again later.'
                        };
                    }
                }
            );
        },
        [mutateAsync]
    );

    const onError = useCallback<SubmitErrorHandler<ILoginForm>>(errors => {
        Object.entries(errors).forEach(([_, value]) => {
            if (value) {
                error({
                    title: 'Error',
                    message: value.message
                });
            }
        });
    }, []);

    const handleSubmit = useCallback(
        () => form.handleSubmit(onSubmit, onError),
        [onSubmit, onError, form]
    );

    return {
        login: handleSubmit,
        form,
        isLoading
    };
};
