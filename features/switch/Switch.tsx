import { Button, Container } from '@mantine/core';
import { Page } from '../../components/page/Page';
import Link from 'next/link';
import { css } from '@emotion/css';

export const Switch = () => {
    return (
        <Page title="Switch">
            <Container className={page}>
                <Link className={link} href={'/map'}>
                    <Button className={button}>I want to participate in events!</Button>
                </Link>
                <Link className={link} href={'/creator'}>
                    <Button className={button}>I want to create events!</Button>
                </Link>
            </Container>
        </Page>
    );
};

const page = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10rem;
    background-color: #7064e6;
`;

const link = css`
    width: 80%;
`;

const button = css`
    width: 100%;
    height: 5rem;
    color: #7064e6;
    background-color: #fff;
`;
