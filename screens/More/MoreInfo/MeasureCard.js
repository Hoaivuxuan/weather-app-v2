import { View, Text, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function MeasureCard({ data }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 14,
        marginBottom: 24,
        margin: 8,
        // ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
          backgroundColor: "white",
          borderRadius: 14,
        }}
      >
        <View style={{ margin: 10 }}>
          <Text
            style={{
              // fontFamily: FONTS.InterBold,
              marginBottom: 20,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {data.title}
          </Text>
          <Text style={{ lineHeight: 20 }}>{data.description}</Text>
        </View>
      </View>
    </View>
  );
}
