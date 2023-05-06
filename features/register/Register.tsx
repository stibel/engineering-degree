import { BrandSuperhuman, Eye, EyeOff, Key, Phone, Send, User } from 'tabler-icons-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { PasswordInput, TextInput, Button } from '@mantine/core';

import { Page } from '../../components/page/Page';
import { axiosInstance } from '../../utils/services/axios';
import { handleFormSubmit } from '../../utils/handle_form_submit';
import { FullParentStack } from '../../components/FullParentStack';
import { PaddedContainer } from '../../components/PaddedContainer';
import { mt } from '../../components/css_helpers/margin';

const registerMutation = (data: IRegisterFormValues) =>
    axiosInstance.post('auth/register', {
        password: data.password,
        user: {
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName
        }
    });

interface IRegisterFormValues {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const Register = () => {
    const { register, handleSubmit } = useForm<IRegisterFormValues>();
    const router = useRouter();
    const onSubmit = async (data: IRegisterFormValues) =>
        handleFormSubmit(registerMutation(data), { onSuccess: () => router.push('/') });

    return (
        <Page title={'Register'}>
            <FullParentStack>
                <PaddedContainer>
                    <form className={mt(3)} onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            {...register('email')}
                            label={'Email'}
                            placeholder={'Andrzej@Duda.com'}
                            type={'email'}
                            icon={<User size={20} />}
                        />
                        <TextInput
                            {...register('phone')}
                            label={'Phone'}
                            placeholder={'123123123'}
                            type={'phone'}
                            icon={<Phone size={20} />}
                        />
                        <TextInput
                            {...register('firstName')}
                            label={'First name'}
                            placeholder={'Joe'}
                            type={'firstName'}
                            icon={<BrandSuperhuman size={20} />}
                        />
                        <TextInput
                            {...register('lastName')}
                            label={'Last name'}
                            placeholder={'Doe'}
                            type={'lastName'}
                            icon={<BrandSuperhuman size={20} />}
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
                        <Button className={mt(2)} fullWidth type={'submit'} leftIcon={<Send />}>
                            Register
                        </Button>
                    </form>
                </PaddedContainer>
            </FullParentStack>
        </Page>
    );
};
