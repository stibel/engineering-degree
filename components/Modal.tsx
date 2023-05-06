import { Modal as MantineModal } from '@mantine/core';
import { ReactNode } from 'react';

export interface IModalProps {
    opened: boolean;
    setOpen: (value: boolean) => void;
    children: ReactNode | Array<ReactNode>;
}

export const Modal = ({ opened, setOpen, children }: IModalProps) => (
    <MantineModal
        opened={opened}
        onClose={() => setOpen(false)}
        padding={0}
        withCloseButton={false}
    >
        {children}
    </MantineModal>
);
