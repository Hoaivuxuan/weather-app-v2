import { View, Text, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../../../src/common/localStorage";

const SettingWarningItem = ({ text }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    try {
      setItem(text, !isEnabled);
      return setIsEnabled((previousState) => !previousState);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getStatus = async () => {
      var value = await getItem(text);
      return setIsEnabled(value);
    };
    getStatus();
  }, []);

  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <View>
        <Text
          onPress={() => navigation.navigate("Home")}
          style={{ color: "white" }}
        >
          {text}
        </Text>
      </View>
      <View style={{ marginTop: -20 }}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default SettingWarningItem;
