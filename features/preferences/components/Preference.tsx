import { Center, Container, Divider, Text } from '@mantine/core';
import { css } from '@emotion/css';

import { pl } from '../../../components/css_helpers/padding';
import { mb } from '../../../components/css_helpers/margin';
import Link from 'next/link';

interface IPreferenceProps {
    preference: {
        uuid: string;
        name: string;
        description: string;
    };
}

export const Preference = ({ preference }: IPreferenceProps) => {
    return (
        <Link className={link} href={`/preferences/${preference.uuid}`}>
            <Container fluid key={preference.name} className={container}>
                <Center className={center}>
                    <span>
                        <Text size={'xl'} fw={700}>
                            {preference.name}
                        </Text>
                        <Divider />
                        <Text size={'md'}>{preference.description.substring(0, 100) + '...'}</Text>
                    </span>
                </Center>
            </Container>
        </Link>
    );
};

const link = css`
    text-decoration: none;
`;

const container = css`
    ${mb(1)};
    padding: 1rem;
    background-color: #7064e6;
    color: #fff;
    border-radius: 1rem;
`;

const center = css`
    ${pl(0)};
    justify-content: space-between;
`;
