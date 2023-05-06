import { Button, PasswordInput, TextInput, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Eye, EyeOff, Key, Login, User } from 'tabler-icons-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Page } from '../../components/page/Page';
import { axiosInstance } from '../../utils/services/axios';
import { handleFormSubmit } from '../../utils/handle_form_submit';
import { FullParentStack } from '../../components/FullParentStack';
import { PaddedContainer } from '../../components/PaddedContainer';
import { mt } from '../../components/css_helpers/margin';
import { useRouter } from 'next/router';

const loginMutation = (data: ILoginFormValues) =>
    axiosInstance.post(
        'auth/login',
        {},
        { auth: { password: data.password, username: data.email } }
    );

interface ILoginFormValues {
    email: string;
    password: string;
}

export const LoginModule = observer(() => {
    const { register, handleSubmit } = useForm<ILoginFormValues>();
    const { push } = useRouter();
    const onSubmit = async (data: ILoginFormValues) =>
        handleFormSubmit(loginMutation(data), {
            onSuccess: ({ data }) => {
                localStorage.setItem('accessToken', data.accessToken);
                push('/switch');
            }
        });

    return (
        <Page title={'Login'}>
            <FullParentStack>
                <PaddedContainer>
                    <form className={mt(3)} onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            {...register('email')}
                            label={'Email'}
                            placeholder={'Andrzej@Duda.com'}
                            type={'email'}
                            icon={<User size={20} />}
                            style={{ width: '100%' }}
                        />
                        <PasswordInput
                            {...register('password')}
                            placeholder={'Password'}
                            label={'Password'}
                            icon={<Key size={20} />}
                            style={{ width: '100%' }}
                            visibilityToggleIcon={({ reveal, size }) =>
                                reveal ? <EyeOff size={size} /> : <Eye size={size} />
                            }
                        />
                        <Button className={mt(2)} type={'submit'} fullWidth leftIcon={<Login />}>
                            Log in
                        </Button>
                    </form>
                    <Text className={mt(2)}>
                        Don't have an account? <Link href={'/register'}>Register!</Link>
                    </Text>
                </PaddedContainer>
            </FullParentStack>
        </Page>
    );
});
