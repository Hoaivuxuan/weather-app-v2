import { WeatherForecast } from "./HomeScreen";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import { Image } from "react-native";

const ForecastDailyItem = ({ forecast }: { forecast: WeatherForecast }) => {
  return (
    <BlurView intensity={30} style={styles.container}>
      {/* <>{console.log("check forecast:", forecast)}</> */}
      <Image
        source={require("../../assets/images/cloud.png")}
        className="w-12 h-12"
      />
      <Text style={styles.date}>
        {dayjs(forecast.dt * 1000).format("dddd")}
      </Text>
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}°</Text>
      {/* <Text style={styles.date}>
        {dayjs(forecast.dt * 1000).format("ddd ha")}
      </Text> */}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "gainsboro",
    borderWidth: StyleSheet.hairlineWidth,
  },
  temp: {
    // fontFamily: "InterBlack",
    fontSize: 35,
    color: "white",
    marginVertical: 10,
  },
  date: {
    // fontFamily: "Inter",
    color: "ghostwhite",
    fontSize: 16,
  },
});

export default ForecastDailyItem;
