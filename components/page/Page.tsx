import Head from 'next/head';
import { css } from '@emotion/css';

import { IChildrenProps } from '../../utils/shared_types/Children';
import { IAnimateProps } from '../../utils/shared_types/Animate';
import { Navigation } from './components/Navigation';
import { Drawer } from './components/Drawer';

interface IPageProps extends IChildrenProps, IAnimateProps {
    title: string;
    description?: string;
    themeColor?: string;
}

const wrapper = css`
    min-height: 100vh;
    min-width: 100vw;
    height: 100vh;
    width: 100vw;
`;

export const Page = (props: IPageProps) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name={'description'} content={props.description} />
                <meta name={'theme-color'} content={props.themeColor || '#212020'} />
            </Head>

            <div className={wrapper}>{props.children}</div>
        </>
    );
};

export const PageWithNavigation = (props: IPageProps) => (
    <Page {...props}>
        {props.children}
        <Navigation />
    </Page>
);

export const PageWithDrawer = (props: IPageProps) => (
    <Page {...props}>
        <Drawer />
        {props.children}
    </Page>
);

export const PageWithNavigationAndDrawer = (props: IPageProps) => (
    <Page {...props}>
        <Drawer />
        <Navigation />
        {props.children}
    </Page>
);
