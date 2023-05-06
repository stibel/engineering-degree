import { Stack, StackProps } from '@mantine/core';
import { FC } from 'react';
import {css} from "@emotion/css";

export const FullParentStack: FC<StackProps> = props => {
    const { children, ...rest } = props;
    return <Stack className={stack} {...rest}>{children}</Stack>;
};

const stack = css`
    width: 100%;
    height: 100%;
`;
