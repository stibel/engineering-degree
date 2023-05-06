import { css } from '@emotion/css';

export const mt = (value: number) => css`
    margin-top: ${value.toFixed(0)}rem;
`;

export const mr = (value: number) => css`
    margin-right: ${value.toFixed(0)}rem;
`;

export const mb = (value: number) => css`
    margin-bottom: ${value.toFixed(0)}rem;
`;

