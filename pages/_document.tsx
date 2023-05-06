import Document, {Head, Html, Main, NextScript} from 'next/document';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
        <Html lang={'pl'}>
          <Head>
            <link rel={'preconnect'} href={'https://fonts.gstatic.com'} />
            <link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
            <link
                href={'https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css'}
                rel={'stylesheet'}
            />
            <link
                href={
                  'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap'
                }
                rel={'stylesheet'}
            />
            {/* <meta name="viewport" id="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/> */}
          </Head>
          <body
              style={{
                padding: 'env(safe-area-inset)'
              }}
          >
          <Main />
          <NextScript />
          </body>
        </Html>
    )
  }
}
