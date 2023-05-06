import { Text } from '@mantine/core';

import { PageWithNavigationAndDrawer } from '../../components/page/Page';
import { PaddedContainer } from '../../components/PaddedContainer';

export const Profile = () => {
    return (
        <PageWithNavigationAndDrawer title={'Mój profil'}>
            <PaddedContainer>
                <Text tt={'capitalize'}>Mikołaj Siebielec</Text>
            </PaddedContainer>
        </PageWithNavigationAndDrawer>
    );
};
