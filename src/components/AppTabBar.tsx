// src/components/AppTabBar.tsx
import {
    View, TouchableOpacity, Text, StyleSheet, Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout } from '../theme';

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    // On Android with gesture navigation, insets.bottom already includes
    // the gesture bar height — no extra math needed.
    // On Android with 3-button nav, insets.bottom is 0 but we add NAV_BAR_H.
    const bottomPadding =
        insets.bottom > 0
            ? insets.bottom          // gesture nav (iOS + Android gesture mode)
            : layout.NAV_BAR_H ?? 0; // Android 3-button nav fallback

    return (
        <View style={[styles.container, { paddingBottom: bottomPadding }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tab}
                        activeOpacity={0.7}
                    >
                        {/* Render your icon here via options.tabBarIcon */}
                        {options.tabBarIcon?.({
                            focused: isFocused,
                            color: isFocused ? colors.brand : colors.tabInactive,
                            size: 24,
                        })}
                        <Text
                            style={[
                                styles.label,
                                { color: isFocused ? colors.brand : colors.tabInactive },
                            ]}
                        >
                            {typeof label === 'string' ? label : route.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
        // Android shadow
        elevation: Platform.OS === 'android' ? 8 : 0,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },
    tab: {
        flex: 1,
        height: layout.TAB_BAR_H,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    label: {
        fontSize: 11,
        fontWeight: '500',
    },
});