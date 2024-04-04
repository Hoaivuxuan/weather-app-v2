import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SettingWarningItem from "./SettingWarningItem";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { MeasureData } from "../../../src/common/dataWarn";
import Footer from "../../Footer";

function Item({ text, icon }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        margin: 15,
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
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ color: "white" }}
      >
        {text}
      </Text>
    </View>
  );
}

export default function SettingWarning({ navigation }) {
  const [data, setData] = useState(MeasureData);
  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[{ backgroundColor: isActive ? "red" : item.backgroundColor }]}
        >
          <SettingWarningItem text={item.title} icon={item.nameIcon} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };
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
          style={{ justifyContent: "center", alignItems: "center", margin: 25 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Cài đặt cảnh cáo
          </Text>
          <Text
            style={{
              color: "white",
              alignItems: "center",
              opacity: 0.8,
              marginTop: 10,
            }}
          >
            Kéo thả để sắp xếp mức độ ưu tiên và on/off cảnh báo muốn nhận
          </Text>
        </View>
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <Footer />
    </View>
  );
}
