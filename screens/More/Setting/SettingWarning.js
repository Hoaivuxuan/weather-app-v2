import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SettingWarningItem from "./SettingWarningItem";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { MeasureData } from "../../../src/common/dataWarn";

function Item({ text, handle }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        margin: 15,
      }}
    >
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
          <SettingWarningItem text={item.title} />
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
        backgroundColor: "#6390F0",
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
        </View>
        {/* <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        /> */}
      </View>

      <View>
        <Item text="Đánh giá chúng tôi" />
        <Item text="Chính sách q.riêng tư" />
        <Item text="Chia sẽ với bạn bè" />
      </View>
    </View>
  );
}

// export default SettingWarning = () => {
//   return (
//     <View>
//       <Text>Settig warning</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 2000,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
