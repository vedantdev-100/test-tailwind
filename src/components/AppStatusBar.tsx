// src/components/AppStatusBar.tsx
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native';

interface Props {
    backgroundColor?: string;
    // 'light' = white icons/text (use on dark bg)
    // 'dark'  = dark  icons/text (use on light bg)
    style?: 'light' | 'dark' | 'auto';
}

export function AppStatusBar({
    backgroundColor = 'transparent',
    style = 'auto',
}: Props) {
    const scheme = useColorScheme();

    const resolvedStyle =
        style === 'auto'
            ? scheme === 'dark' ? 'light' : 'dark'
            : style;

    return (
        <StatusBar
            style={resolvedStyle}
            backgroundColor={backgroundColor}
            // translucent lets your app draw behind the status bar on Android,
            // then SafeAreaInsets pushes content down correctly.
            translucent={Platform.OS === 'android'}
        />
    );
}