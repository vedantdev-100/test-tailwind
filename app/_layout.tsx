import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { colors } from '../src/theme';
import { useColorScheme } from 'react-native';
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // NavigationBar.setBackgroundColorAsync("#e42d2d");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        {/* <StatusBar style="dark" /> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}