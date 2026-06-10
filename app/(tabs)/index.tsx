import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
  // useSafeAreaInsets,
} from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { AppHeader } from "@/src/components/AppHeader";
import { layout } from "@/src/theme";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const insets = useSafeAreaInsets();

  // Define snap points
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const backDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const snapToIndex = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  return (
    // <SafeAreaView
    //   edges={["top", "bottom"]}
    //   className="text-white bg-blue-800 pt-26 flex-1"
    // >
    <View className="flex-1 p-3 bg-blue-600 items-center">
      <AppHeader title="Home" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + layout.HEADER_H + 16,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
      >

        <Text className="text-white p-5">Home Page</Text>
        <View className="p-3 bg-blue-600 items-center">
          <TouchableOpacity
            onPress={openSheet}
            className="p-3 bg-white w-1/2 items-center"
          >
            <Text> Open Bottom Sheet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => snapToIndex(1)}
            className="p-3 bg-white w-1/2 items-center"
          >
            <Text> Snap Bottom Sheet</Text>
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={false}
          handleIndicatorStyle={{ backgroundColor: "orange", width: 50 }}
          backgroundStyle={{ backgroundColor: "#b9e4ed" }}
          backdropComponent={backDrop}
        >
          <BottomSheetView className="p-5 flex-1 items-center">
            <Text className="text-black text-2xl font-bold">
              Product Listings
            </Text>
          </BottomSheetView>
        </BottomSheetModal>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
}
