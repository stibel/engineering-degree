import { css } from '@emotion/css';

export const pt = (value: number) => css`
    padding-top: ${value.toFixed(0)}rem;
`;

export const pr = (value: number) => css`
    padding-right: ${value.toFixed(0)}rem;
`;

export const pb = (value: number) => css`
    padding-bottom: ${value.toFixed(0)}rem;
`;

export const pl = (value: number) => css`
    padding-left: ${value.toFixed(0)}rem;
`;
