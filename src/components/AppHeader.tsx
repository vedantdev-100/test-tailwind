// src/components/AppHeader.tsx
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, layout } from '../theme';

interface Props {
    title: string;
    showBack?: boolean;
    right?: React.ReactNode;
    backgroundColor?: string;
    tintColor?: string;
}

export function AppHeader({
    title,
    showBack = false,
    right,
    backgroundColor = colors.background,
    tintColor = colors.brand,
}: Props) {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const totalHeight = insets.top + layout.HEADER_H;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor,
                    height: totalHeight,
                    paddingTop: insets.top,
                    // On Android, draw the shadow below; iOS uses shadow* props
                    elevation: Platform.OS === 'android' ? 4 : 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                },
            ]}
        >
            <View style={styles.row}>
                {showBack && (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        {/* Use your icon library here, e.g. @expo/vector-icons */}
                        <Text style={{ color: tintColor, fontSize: 28, lineHeight: 32 }}>‹</Text>
                    </TouchableOpacity>
                )}

                <Text
                    style={[styles.title, !showBack && styles.titleLeft]}
                    numberOfLines={1}
                >
                    {title}
                </Text>

                <View style={styles.rightSlot}>{right}</View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 8,
    },
    backBtn: {
        width: 36, height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.text,
    },
    titleLeft: {
        textAlign: 'left',
    },
    rightSlot: {
        width: 36,
        alignItems: 'flex-end',
    },
});