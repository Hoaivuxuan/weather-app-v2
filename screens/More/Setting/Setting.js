import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingWarning from "./SettingWarning";
import MeasureBadWeather from "../MoreInfo/MeasureBadWeather";
import {
  MagnifyingGlassIcon,
  BeakerIcon,
  BellAlertIcon,
  ExclamationTriangleIcon,
} from "react-native-heroicons/outline";
// import { IconNotification, IconWarning } from "../../../utils/Icon";
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
          marginTop: -5,
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
        backgroundColor: "#6390F0",
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
          <View>
            <Text style={styles.subHeader}>Cài đặt chung</Text>
          </View>
          <TouchableOpacity>
            <Item
              onPress={() => {
                setSetting(false), setThongBao(true);
              }}
              text="Thông báo"
              icon={<BellAlertIcon size={25} color="white" />}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("annnn");
              navigation.navigate(SettingWarning);
            }}
          >
            <Item
              text="Cài đặt cảnh báo."
              icon={<ExclamationTriangleIcon size={25} color="white" />}
              // icon={<IconNotification color={"white"} />}
            />
            {/* <IconWarning color={"white"} /> */}
          </TouchableOpacity>
          <Item text="Thời tiết hàng ngày" />

          <Item text="Chủ đề" />
        </View>

        <View>
          <Text style={styles.subHeader}>Thông tin thêm</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(MeasureBadWeather);
            }}
          >
            <Item text="HD ứng phó thời tiết xấu" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View>
          <Text style={styles.subHeader}>Công cụ khác</Text>
        </View>
        <Item text="Đánh giá chúng tôi" />
        <Item text="Chính sách q.riêng tư" />
        <Item text="Chia sẽ với bạn bè" />
      </View>
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
    marginLeft: 10,
    marginBottom: -10,
    fontSize: 16,
    fontWeight: "500",
  },
});

// import { View, Text } from "react-native";
// import React from "react";

// const Setting = () => {
//   return (
//     <View>
//       <Text>Settingg</Text>
//     </View>
//   );
// };

// export default Setting;
