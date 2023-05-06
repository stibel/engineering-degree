import { Center, Loader } from '@mantine/core';
import {css} from "@emotion/css";

const root = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
`

export const Loading = () => {

    return (
        <Center className={root}>
            <Loader size={'xl'} />
        </Center>
    );
};
