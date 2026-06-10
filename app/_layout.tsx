// app/_layout.tsx
import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { AppStatusBar } from '../src/components/AppStatusBar';
import { AppTabBar } from '../src/components/AppTabBar';
import { useAndroidNavBar } from '../src/hooks/useAndroidNavBar';
import { colors } from '../src/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// Your icon library, e.g.:
// import { Ionicons } from '@expo/vector-icons';

function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  // Sync Android nav bar with app theme
  useAndroidNavBar({
    backgroundColor: isDark ? colors.backgroundDark : colors.background,
    buttonStyle: isDark ? 'light' : 'dark',
  });

  return (
    <>
      <AppStatusBar style="auto" backgroundColor="transparent" />

      <Tabs
        tabBar={(props) => <AppTabBar {...props} />}
        screenOptions={{
          // Disable the built-in header — we use AppHeader inside each screen
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              // <Ionicons name="home-outline" size={size} color={color} />
              <></>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }) => <></>,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <></>,
          }}
        />
      </Tabs>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <RootLayout />
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}