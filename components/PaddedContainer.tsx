import { FC, ReactNode } from 'react';
import { css } from '@emotion/css';
import { Container, ContainerProps } from '@mantine/core';

interface IPaddedContainerProps {
    children: ReactNode | Array<ReactNode>;
    className?: string;
}

export const PaddedContainer: FC<IPaddedContainerProps & ContainerProps> = props => {
    const { children, className, ...restProps } = props;

    return (
        <Container
            className={css`
                ${container}
                ${className}
            `}
            {...restProps}
        >
            {children}
        </Container>
    );
};

const container = css`
    padding-top: 4rem;
`;
