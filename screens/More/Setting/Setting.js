import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingWarning from "./SettingWarning";
import MeasureBadWeather from "../MoreInfo/MeasureBadWeather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from "../../Footer";
const SettingsStack = createNativeStackNavigator();

function Item({ text, icon }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        margin: 15,
        marginLeft: 50,
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          position: "absolute",
          marginLeft: -35,
          marginTop: -3,
        }}
      >
        {icon}
      </Text>
      <Text style={{ color: "white" }}>{text}</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const [thongBao, setThongBao] = useState(false);
  const [setting, setSetting] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        // alignItems: 'center',
        backgroundColor: "#0D91F0",
      }}
    >
      <View>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
            Thời tiết
          </Text>
        </View>

        <View>
          <View
            style={{
              backgroundColor: "#70A3C8",
              width: "100%",
              height: "auto",
            }}
          >
            <Text style={styles.subHeader}>Cài đặt chung</Text>
          </View>
          <TouchableOpacity>
            <Item
              onPress={() => {
                setSetting(false), setThongBao(true);
              }}
              text="Thông báo"
              icon={
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="white"
                />
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // console.log("annnn");
              navigation.navigate(SettingWarning);
            }}
          >
            <Item
              text="Cài đặt cảnh báo"
              icon={<Ionicons name="warning-outline" size={24} color="white" />}
            />
          </TouchableOpacity>
          <Item
            text="Thời tiết hàng ngày"
            icon={
              <Ionicons name="volume-low-outline" size={28} color="white" />
            }
          />
          <Item
            text="Chủ đề"
            icon={
              <Ionicons name="color-palette-outline" size={24} color="white" />
            }
          />
        </View>

        <View>
          <View
            style={{
              backgroundColor: "#70A3C8",
              width: "100%",
              // opacity: 0.5,
            }}
          >
            <Text style={styles.subHeader}>Thông tin thêm</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(MeasureBadWeather);
            }}
          >
            <Item
              text="HD ứng phó thời tiết xấu"
              icon={<Ionicons name="book-outline" size={24} color="white" />}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
}
export default function Setting() {
  return (
    <SettingsStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen
        name="SettingScreen"
        component={SettingsScreen}
      ></SettingsStack.Screen>
      <SettingsStack.Screen
        name="SettingWarning"
        component={SettingWarning}
      ></SettingsStack.Screen>
      <SettingsStack.Screen
        name="MeasureBadWeather"
        component={MeasureBadWeather}
      ></SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    marginLeft: 16,
    marginBottom: -10,
    fontSize: 16,
    fontWeight: "500",
    height: 36,
    color: "white",
  },
});
