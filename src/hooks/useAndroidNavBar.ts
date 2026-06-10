// src/hooks/useAndroidNavBar.ts
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { colors } from '../theme';

interface Options {
    backgroundColor?: string;
    // 'dark'  = dark buttons (use on light background)
    // 'light' = light buttons (use on dark background)
    buttonStyle?: 'dark' | 'light';
}

export function useAndroidNavBar({
    backgroundColor = colors.background,
    buttonStyle = 'dark',
}: Options = {}) {
    useEffect(() => {
        if (Platform.OS !== 'android') return;

        // Set the background color of the system nav bar
        NavigationBar.setBackgroundColorAsync(backgroundColor);

        // Set the button/icon tint
        NavigationBar.setButtonStyleAsync(buttonStyle);

        // Make the nav bar visible (not hidden)
        NavigationBar.setVisibilityAsync('visible');
    }, [backgroundColor, buttonStyle]);
}