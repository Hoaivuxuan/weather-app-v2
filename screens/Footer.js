import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function Item({ text, icon }) {
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

export default function Footer() {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#70A3C8",
          width: "100%",
          // opacity: 0.5,
        }}
      >
        <Text style={styles.subHeader}>Nhà phát triển</Text>
      </View>
      <Item
        text="Đánh giá chúng tôi"
        icon={<Ionicons name="star-outline" size={24} color="white" />}
      />
      <Item
        text="Chính sách q.riêng tư"
        icon={
          <Ionicons name="shield-checkmark-outline" size={24} color="white" />
        }
      />
      <Item
        text="Chia sẽ với bạn bè"
        icon={<Ionicons name="share-social-outline" size={24} color="white" />}
      />
    </View>
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
