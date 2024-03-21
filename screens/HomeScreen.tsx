import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import ForecastItem from "./ForecastItem";
//
const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const bgImage =
  "https://www.travelassociates.com/sites/v2.travel-associates.com.au/files/fcl-blog/hanoi-hoankiem.jpg";

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Weather = {
  name: string;
  main: MainWeather;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

export type WeatherForecast = {
  main: MainWeather;
  dt: number;
};

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }

    // const results = await fetch(
    //   `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    // );
    const results = await fetch(
      `${BASE_URL}/weather?lat=21.0278&lon=105.8342&appid=25a2a38b0f35a8bd76c2f1cff5ad7eb7&units=metric`
    );
    const data = await results.json();
    setWeather(data);
  };

  const fetchForecast = async () => {
    // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
    if (!location) {
      return;
    }

    // const results = await fetch(
    //   `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    // );
    const results = await fetch(
      `${BASE_URL}/forecast?lat=21.0278&lon=105.8342&appid=25a2a38b0f35a8bd76c2f1cff5ad7eb7&units=metric`
    );
    const data = await results.json();
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }
  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <View
        className="flex-row justify-end items-center rounded-full mt-10"
        style={{ backgroundColor: "gray" }}
      >
        <TextInput
          placeholder="Chọn thành phố"
          placeholderTextColor={"lightgray"}
        ></TextInput>
      </View>

      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={
            weather.weather[0].main === "Rain"
              ? require("../assets/lottie/rain_v1.json")
              : require("../assets/lottie/sunny.json")
          }
          style={{
            width: 200,
            aspectRatio: 1,
          }}
          loop
          autoPlay
        />
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
        <Text style={styles.location}>{weather.weather[0].main}</Text>
      </View>

      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          height: 150,
          marginBottom: 40,
        }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <ForecastItem forecast={item} />}
      />

      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  location: {
    // fontFamily: "Inter",
    fontSize: 30,
    color: "lightgray",
  },
  temp: {
    // fontFamily: "InterBlack",
    fontSize: 100,
    color: "#FEFEFE",
  },
});
