import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen.tsx";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <GestureHandlerRootView>
        <HomeScreen></HomeScreen>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </View>
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
