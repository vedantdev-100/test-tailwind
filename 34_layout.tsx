// import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
// import React from "react";

// import { Colors } from "@/constants/theme";
// import { useColorScheme } from "@/src/hooks/use-color-scheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const colors = Colors[colorScheme ?? "light"];

//   return (
//     <NativeTabs
//       tintColor={colors.tint}
//       disableTransparentOnScrollEdge={true}
//       minimizeBehavior="onScrollDown"
//     >
// // home
//       <NativeTabs.Trigger name="index">
//         <Label>Home</Label>
//         <Icon
//           sf="house.fill"
//           drawable="ic_menu_view"
//         />
//       </NativeTabs.Trigger>

// // Explore
//       <NativeTabs.Trigger name="explore">
//         <Label>Explore</Label>
//         <Icon
//           sf="paperplane.fill"
//           drawable="ic_menu_compass"
//         />
//       </NativeTabs.Trigger>

// // Settings
//       <NativeTabs.Trigger name="settings">
//         <Label>Settings</Label>
//         <Icon
//           sf="gearshape.fill"
//           drawable="ic_menu_manage"
//         />
//       </NativeTabs.Trigger>

// // ios bottom accessory (show the live route feed)
//       {/* <NativeTabs.BottomAccessory name="live" hideOnScroll={true}>
//         <View>
//             <Label>Live Route Feed</Label>
//         </View>
//       </NativeTabs.BottomAccessory> */}
//     </NativeTabs>
//   );
// }