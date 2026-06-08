// import { Tabs } from "expo-router";
// import React from "react";

// import { HapticTab } from "@/components/haptic-tab";
// import { IconSymbol } from "@/components/ui/icon-symbol";
// import { Colors } from "@/constants/theme";
// import { useColorScheme } from "@/hooks/use-color-scheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="house.fill" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="paperplane.fill" color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
// app/(tabs)/_layout.tsx

import React from "react";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

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
    </NativeTabs>
  );
}