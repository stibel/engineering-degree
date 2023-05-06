import { ReactNode } from 'react';

export interface IChildrenProps {
    children?: ReactNode;
}

export interface IChildrenReqProps extends Required<IChildrenProps> {}
