import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen.tsx";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./screens/BottomTab";

export default function App() {
  return (
    // <View className="flex-1 items-center justify-center bg-white">
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomTab />
          {/* <HomeScreen></HomeScreen> */}
        </NavigationContainer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
