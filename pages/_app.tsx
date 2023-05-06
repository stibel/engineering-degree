import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import axios from "axios";
import {QueryClient, QueryClientProvider} from "react-query";

import {DomainStoreProvider} from "../mst/providers/domain_store_provider";
import {AppStoreProvider} from "../mst/providers/app_store_provider";
import {ConfigModule} from "../components/config/Config";

axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  // const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  //
  // const toggleColorScheme = (value?: ColorScheme) => {
  //   const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
  //   setColorScheme(nextColorScheme);
  //   setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  // };

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider colorScheme="dark" toggleColorScheme={() => {}}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider position="top-right">
                  <DomainStoreProvider>
                      <AppStoreProvider>
                          <ConfigModule />
                          <Component {...pageProps} />
                      </AppStoreProvider>
                  </DomainStoreProvider>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await NextApp.getInitialProps(appContext);
//   return {
//     ...appProps,
//     colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
//   };
// };
