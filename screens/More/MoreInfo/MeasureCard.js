import { View, Text, Image, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
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
          <Button
            onPress={() => {
              console.log(data)
              PushNotification.localNotification({
                //... You can use all the options from localNotifications
                title: data.title.toUpperCase(),
                subText: "Bây giờ", // (optional) default: none
                channelId: "1",
                message: data.message,
                bigPictureUrl: data.image,
                // date: new Date(Date.now() + 10 * 1000), // in 60 secs
                allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                playSound: false,
                /* Android Only Properties */
                repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                onNotification: function (notification) {
                  navigation.navigate("MeasureBadWeather")
                },
              });
            }}
            title="Noti"
            color="#841584"
          />
        </View>
      </View>
    </View>
  );
}
