// src/theme.ts
import { Platform, StatusBar } from 'react-native';

export const colors = {
    brand: '#6C63FF',
    brandDark: '#5A52D5',
    background: '#FFFFFF',
    backgroundDark: '#0F0F0F',
    surface: '#F8F7FF',
    text: '#1A1A2E',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    tabInactive: '#9CA3AF',
};

// These are FALLBACK heights for edge cases.
// Real spacing comes from useSafeAreaInsets() at runtime.
export const layout = {
    STATUS_BAR_H: Platform.select({
        ios: 44,   // notched iPhone; 20 on older models
        android: StatusBar.currentHeight ?? 24,
        default: 0,
    }),
    HEADER_H: 56,   // content height only (below inset)
    TAB_BAR_H: 56,   // content height only (above inset)
    NAV_BAR_H: Platform.select({ android: 48, default: 0 }),
};