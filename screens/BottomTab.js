import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Setting from "./More/Setting/Setting";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
const Tab = createBottomTabNavigator();

// function Setting() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }
          return <MagnifyingGlassIcon size={25} color="white" />;
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Thời tiết"
        style={{ justifyContent: "center", alignItems: "center" }}
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focus }) => {
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            ></View>;
          },
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Thiết lập"
        component={Setting}
        options={{
          tabBarLabel: "Thêm",
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="account" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}
