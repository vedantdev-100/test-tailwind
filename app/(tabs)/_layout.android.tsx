
import React from "react";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Colors } from "@/constants/theme";
import { useColorScheme } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];

    return (
        <NativeTabs tintColor={colors.tint} disableTransparentOnScrollEdge>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon
                    sf="house.fill"
                    drawable="ic_menu_view"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="explore">
                <Label>Explore</Label>
                <Icon
                    sf="paperplane.fill"
                    drawable="ic_menu_compass"
                />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="settings">
                <Label>Settings</Label>
                <Icon
                    sf="gearshape.fill"
                    drawable="ic_menu_manage"
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}