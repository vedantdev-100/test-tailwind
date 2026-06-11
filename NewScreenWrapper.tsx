/**
 * ScreenWrapper.tsx
 *
 * A single wrapper component that manages:
 *  - StatusBar style + background color
 *  - SafeAreaView insets (top / bottom / sides)
 *  - Android system navigation bar color + button tint
 *  - Optional KeyboardAvoidingView (for forms / inputs)
 *  - Edge-to-edge support on Android 15+
 *
 * Usage:
 *   <ScreenWrapper>…</ScreenWrapper>
 *   <ScreenWrapper avoidKeyboard>…</ScreenWrapper>
 *   <ScreenWrapper statusBarColor="#6C63FF" statusBarStyle="light" navBarColor="#6C63FF">…</ScreenWrapper>
 *   <ScreenWrapper edges={['top']} backgroundColor="#F8F7FF">…</ScreenWrapper>
 */

import React, { useCallback, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ViewStyle,
    StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets, Edge } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type StatusBarStyle = 'light' | 'dark' | 'auto';
type NavBarButtonStyle = 'light' | 'dark';

interface ScreenWrapperProps {
    children: React.ReactNode;

    // ── Layout ──────────────────────────────────────────────────────────────
    /** Background color for the entire screen. Default: '#FFFFFF' */
    backgroundColor?: string;

    /** Extra style applied to the inner content container. */
    style?: ViewStyle;

    // ── SafeArea ─────────────────────────────────────────────────────────────
    /**
     * Which safe-area edges to inset.
     * Default: ['top', 'bottom'] — covers status bar + home indicator / nav bar.
     * Pass ['top'] on screens whose tab bar already handles the bottom inset.
     * Pass [] to opt out entirely (rare — fullscreen maps, modals, etc.).
     */
    edges?: Edge[];

    // ── StatusBar ────────────────────────────────────────────────────────────
    /**
     * Icon / text color in the status bar.
     * 'light'  → white icons  (use on dark backgrounds)
     * 'dark'   → dark  icons  (use on light backgrounds)
     * 'auto'   → follows system color scheme (default)
     */
    statusBarStyle?: StatusBarStyle;

    /**
     * Background color of the status bar area.
     * Defaults to `backgroundColor` so the bar blends with the screen.
     * Set explicitly when you want a different color (e.g. a branded header).
     * On iOS this has no visual effect (status bar is always transparent)
     * but is kept for API consistency.
     */
    statusBarColor?: string;

    /** Hide the status bar entirely. Default: false */
    statusBarHidden?: boolean;

    // ── Android navigation bar ───────────────────────────────────────────────
    /**
     * Background color of the Android system navigation bar (gesture handle
     * area or 3-button row). Defaults to `backgroundColor`.
     * No-op on iOS.
     */
    navBarColor?: string;

    /**
     * Tint of the Android navigation bar buttons / gesture pill.
     * 'dark'  → dark  buttons (use on light nav bar backgrounds)
     * 'light' → light buttons (use on dark  nav bar backgrounds)
     * Default: derived from `statusBarStyle` when set, otherwise 'dark'.
     */
    navBarButtonStyle?: NavBarButtonStyle;

    // ── Keyboard ─────────────────────────────────────────────────────────────
    /**
     * Wrap content in a KeyboardAvoidingView so the keyboard never
     * covers inputs. Ideal for forms and chat screens.
     * Default: false
     */
    avoidKeyboard?: boolean;

    /**
     * KeyboardAvoidingView behavior override.
     * Default: 'padding' on iOS, 'height' on Android.
     */
    keyboardBehavior?: 'padding' | 'height' | 'position';

    /**
     * Additional offset added to the keyboard avoiding calculation.
     * Useful when a fixed header is present above the scrollable content.
     * Default: 0
     */
    keyboardVerticalOffset?: number;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_BG = '#FFFFFF';
const DEFAULT_EDGES: Edge[] = ['top', 'bottom'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScreenWrapper({
    children,
    backgroundColor = DEFAULT_BG,
    style,
    edges = DEFAULT_EDGES,
    statusBarStyle = 'auto',
    statusBarColor,
    statusBarHidden = false,
    navBarColor,
    navBarButtonStyle,
    avoidKeyboard = false,
    keyboardBehavior,
    keyboardVerticalOffset = 0,
}: ScreenWrapperProps) {

    // Resolved colors: fall back to screen background when not explicitly set.
    const resolvedStatusBarColor = statusBarColor ?? backgroundColor;
    const resolvedNavBarColor = navBarColor ?? backgroundColor;

    // Derive nav bar button style from statusBarStyle when not explicitly set.
    const resolvedNavBarButtonStyle: NavBarButtonStyle =
        navBarButtonStyle ??
        (statusBarStyle === 'light' ? 'light' : 'dark');

    // ── Android navigation bar ──────────────────────────────────────────────
    const applyAndroidNavBar = useCallback(async () => {
        if (Platform.OS !== 'android') return;
        try {
            await NavigationBar.setBackgroundColorAsync(resolvedNavBarColor);
            await NavigationBar.setButtonStyleAsync(resolvedNavBarButtonStyle);
            await NavigationBar.setVisibilityAsync('visible');
        } catch {
            // NavigationBar APIs can fail on certain Android emulators/skins.
            // Fail silently — it is purely cosmetic.
        }
    }, [resolvedNavBarColor, resolvedNavBarButtonStyle]);

    useEffect(() => {
        applyAndroidNavBar();
    }, [applyAndroidNavBar]);

    // ── Keyboard behavior ────────────────────────────────────────────────────
    // iOS responds best to 'padding'; Android to 'height'.
    const resolvedKeyboardBehavior =
        keyboardBehavior ??
        (Platform.OS === 'ios' ? 'padding' : 'height');

    // ── Inner content ────────────────────────────────────────────────────────
    const content = avoidKeyboard ? (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={resolvedKeyboardBehavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View style={[styles.flex, style]}>{children}</View>
        </KeyboardAvoidingView>
    ) : (
        <View style={[styles.flex, style]}>{children}</View>
    );

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor }]}
            edges={edges}
        >
            {/*
        StatusBar — expo-status-bar handles both platforms.
        translucent is intentionally NOT set here; it must be declared
        at the native level in app.json > android.statusBar.translucent.
        Setting it in JS causes a flicker on Android because the native
        window flag resets before JS runs on each cold start.
      */}
            <StatusBar
                style={statusBarStyle}
                backgroundColor={resolvedStatusBarColor}
                hidden={statusBarHidden}
                animated
            />

            {content}
        </SafeAreaView>
    );
}

// ---------------------------------------------------------------------------
// Convenience variants
// ---------------------------------------------------------------------------

/**
 * ScreenWrapperForm
 * Pre-configured wrapper for screens with text inputs.
 * Enables KeyboardAvoidingView and excludes the bottom safe-area edge
 * (the scroll view / input container should handle that itself).
 */
export function ScreenWrapperForm(
    props: Omit<ScreenWrapperProps, 'avoidKeyboard'>
) {
    return (
        <ScreenWrapper
            avoidKeyboard
            edges={['top']}   // bottom inset managed by the form's scroll content
            {...props}
        />
    );
}

/**
 * ScreenWrapperFullBleed
 * No safe-area insets at all — for fullscreen media, maps, splash screens.
 * You are responsible for avoiding system chrome in your own layout.
 */
export function ScreenWrapperFullBleed(
    props: Omit<ScreenWrapperProps, 'edges'>
) {
    return <ScreenWrapper edges={[]} {...props} />;
}

/**
 * ScreenWrapperModal
 * Bottom sheet / modal: only top edge inset, no bottom padding.
 * The modal container provides its own bottom spacing.
 */
export function ScreenWrapperModal(
    props: Omit<ScreenWrapperProps, 'edges'>
) {
    return <ScreenWrapper edges={['top']} {...props} />;
}

// ---------------------------------------------------------------------------
// Hook — exposes insets for manual positioning (header height, etc.)
// ---------------------------------------------------------------------------

/**
 * useScreenInsets
 *
 * Returns the same insets SafeAreaView uses, plus helpers for computing
 * absolute-positioned element heights (e.g. a custom header or tab bar).
 *
 * Example:
 *   const { headerHeight } = useScreenInsets(56);
 *   // Use headerHeight as paddingTop in your ScrollView contentContainerStyle
 */
export function useScreenInsets(headerContentHeight = 56, tabContentHeight = 56) {
    const insets = useSafeAreaInsets();

    return {
        insets,
        /** Total header height including status bar inset */
        headerHeight: insets.top + headerContentHeight,
        /** Total tab bar height including home indicator / nav bar inset */
        tabBarHeight: insets.bottom + tabContentHeight,
        /** Safe left/right padding (landscape notch devices) */
        horizontalPadding: Math.max(insets.left, insets.right, 16),
    };
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
});

// ---------------------------------------------------------------------------
// Default export
// ---------------------------------------------------------------------------

export default ScreenWrapper;