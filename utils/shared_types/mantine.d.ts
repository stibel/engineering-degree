// or if you want to "extend" standard colors
import { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedColors = 'primary' | 'secondary' | 'third' | 'dark' | DefaultMantineColor;

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedColors, Tuple<string, 10>>;
    }
}
