import {useToggle} from '@mantine/hooks';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';

export const useReadLocalStorageOnce = (key: string) => {
    const [isFinished, toggle] = useToggle([false]);

    const [value, setValue] = useState<null | string>(null);

    useEffectOnce(() => {
        const localVal = localStorage.getItem(key);

        setValue(localVal);
        toggle();
    });

    return [value, isFinished];
};
