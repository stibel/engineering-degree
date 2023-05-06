import { useLogger } from 'react-use';
import { useLoadLocalValues } from './hooks/useLoadLocalValues';

export const ConfigModule = () => {
    useLogger('ConfigModule');

    useLoadLocalValues();

    return <></>;
};
