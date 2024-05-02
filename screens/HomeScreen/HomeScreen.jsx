/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  GlobeAltIcon,
  ExclamationCircleIcon,
} from "react-native-heroicons/outline";
const openWeatherKey = "1f996ca44bb1065c2e4accefe9dfb967";
import * as Location from "expo-location";
import { getWeather } from "../../services/HomeScreenService";
import LocationScreen from "./LocationScreen";
import {
  convertDateTo_ddmm,
  convertDateTo_Week,
} from "../../services/functions";
import Tooltip from "react-native-walkthrough-tooltip";
//
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `black`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
//
const HomeScreen = ({ navigation, city = "London", setCity }) => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [sevenDayForecastData, setSevenDayForecastData] = useState([]);
  const [currentForecastData, setCurrentForecastData] = useState();
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [toolTipVisibleRain, setToolTipVisibleRain] = useState(false);
  const [toolTipVisibleTemp, setToolTipVisibleTemp] = useState(false);
  //
  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}`
      );

      const data = await response.json();
      data.chance_of_rain = 12;
      // if (data) setLoading(true);
      setWeatherData(data);
    };
    fetchWeatherData();
  }, [city]);
  //
  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherKey}`
      );
      const data = await response.json();
      setForecastData(data.list);
    };
    fetchWeatherData();
  }, [city]);
  // 7 days weather forecast
  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=66e634cbdc23407fadb05355242204&q=${city}&days=7&aqi=yes&alerts=no`
      );
      const data = await response.json();
      console.log("check astro:", data.forecast.forecastday[0].astro);
      setCurrentForecastData(data.forecast.forecastday[0].astro);
      setSevenDayForecastData(data.forecast);
    };
    fetchWeatherData();
  }, [city]);
  let lat = 21.0278;
  let lon = 105.8342;

  const dates = Date().split(" ");

  //permission
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const latitude = lat;
    const longtitude = lon;

    const results = await getWeather(latitude, longtitude);
    if (results.cod == 200) {
      setCity(results.name);
    }
  };

  const handleNavigate = () => {
    navigation.navigate(LocationScreen);
  };

  const handleGetCurrentLocation = () => {
    getLocation();
  };

  const dataTemp = {
    labels: sevenDayForecastData?.forecastday
      ?.slice(0, 7)
      .map((item) => convertDateTo_Week(item.date)),
    datasets: [
      {
        data: sevenDayForecastData?.forecastday
          ?.slice(0, 7)
          .map((item) => item.day.mintemp_c),
        color: (opacity = 1) => `green`,
        strokeWidth: 2,
      },
      {
        data: sevenDayForecastData?.forecastday
          ?.slice(0, 7)
          .map((item) => item.day.avgtemp_c),
        color: (opacity = 1) => `orange`,
        strokeWidth: 2,
      },
      {
        data: sevenDayForecastData?.forecastday
          ?.slice(0, 7)
          .map((item) => item.day.maxtemp_c),
        color: (opacity = 1) => `red`,
        strokeWidth: 2,
      },
    ],
    legend: ["Thấp nhất", "Trung bình", "Cao nhất"],
  };

  const dataPrecip = {
    labels: sevenDayForecastData?.forecastday
      ?.slice(0, 7)
      .map((item) => convertDateTo_Week(item.date)),
    datasets: [
      {
        data: sevenDayForecastData?.forecastday
          ?.slice(0, 7)
          .map((item) => item.day.totalprecip_mm),
        color: (opacity = 1) => `blue`,
        strokeWidth: 2,
      },
    ],
    legend: ["Lượng mưa(mm)"],
  };

  const dataUV = {
    labels: sevenDayForecastData?.forecastday
      ?.slice(0, 7)
      .map((item) => convertDateTo_Week(item.date)),
    datasets: [
      {
        data: sevenDayForecastData?.forecastday
          ?.slice(0, 7)
          .map((item) => item.day.uv),
        color: (opacity = 1) => `purple`,
        strokeWidth: 2,
      },
    ],
    legend: ["Chỉ số tia UV"],
  };

  const translateMoonPhase = (phase) => {
    const phaseMapping = {
      "New Moon": "Mặt trăng mới",
      "First Quarter": "Trăng lưỡi liềm",
      "Full Moon": "Trăng tròn",
      "Last Quarter": "Trăng khuyết",
      "Waning Crescent": "Trăng khuyết dần",
      "Waning Gibbous": "Trăng tròn dần",
      "Waxing Crescent": "Trăng lưỡi liềm dần",
      "Waxing Gibbous": "Trăng tròn dần",
    };

    return phaseMapping[phase] || phase;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.current_wrap}>
          <View style={styles.current_container}>
            <View style={styles.header}>
              <View>
                <TouchableOpacity onPress={handleNavigate}>
                  <Image
                    source={require("../../assets/akar-icons_plus.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleGetCurrentLocation}>
                <Text style={styles.title}>{weatherData?.name}</Text>
              </TouchableOpacity>
              <View style={{ position: "relative" }}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/carbon_overflow-menu-vertical.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.current}>
              {Array.isArray(weatherData.weather) && (
                <Image
                  style={styles.large_icon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`,
                  }}
                />
              )}

              <View style={styles.currentDate}>
                <Text style={{ fontSize: 18, color: "#fff" }}>
                  {dates ? dates[0] : "Thursday"}
                </Text>
                <Text style={{ fontSize: 18, color: "#fff" }}>|</Text>
                <Text style={{ fontSize: 18, color: "#fff" }}>
                  {dates ? `${dates[1]} ${dates[2]}` : "Nov 24"}
                </Text>
              </View>
              <Text style={styles.currentTemp}>
                {Math.round(weatherData?.main?.temp - 273.15)}
              </Text>
              <Text style={styles.currentDesc}>
                {Array.isArray(weatherData.weather)
                  ? weatherData?.weather[0]?.description
                  : ""}
              </Text>
              <View style={styles.dash}></View>
              <View style={styles.extraInfo}>
                <View style={styles.info}>
                  <Image
                    source={require("../../assets/carbon_location-current.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  ></Image>
                  <View>
                    <Text
                      style={styles.text}
                    >{`${weatherData?.wind?.speed}km/h`}</Text>
                    <Text style={styles.text}>Wind</Text>
                  </View>
                </View>
                <View style={[styles.info, { left: -5 }]}>
                  <Image
                    source={require("../../assets/fluent_weather-rain-24-regular.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  ></Image>
                  <View>
                    <Text
                      style={styles.text}
                    >{`${weatherData?.chance_of_rain} %`}</Text>
                    <Text style={styles.text}>Rain</Text>
                  </View>
                </View>
                <View style={styles.info}>
                  <Image
                    source={require("../../assets/fluent_temperature-24-regular.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  ></Image>
                  <View>
                    <Text
                      style={styles.text}
                    >{`${weatherData?.main?.pressure} mbar`}</Text>
                    <Text style={styles.text}>Pressure</Text>
                  </View>
                </View>
                <View style={styles.info}>
                  <Image
                    source={require("../../assets/ion_water-outline.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  ></Image>
                  <View>
                    <Text
                      style={styles.text}
                    >{`${weatherData?.main?.humidity} %`}</Text>
                    <Text style={styles.text}>Humidity</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.subtitle}>
          <View style={styles.currentDate}>
            <Text style={{ fontSize: 16, color: "#fff" }}>
              {" "}
              {dates ? dates[0] : "Thurs"}
            </Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>|</Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>
              {" "}
              {dates ? `${dates[1]} ${dates[2]}` : "Nov 24"}
            </Text>
          </View>
          <FlatList
            horizontal
            data={forecastData?.slice(0, 7)}
            keyExtractor={(hour, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              const dt_txt = hour.item.dt_txt.split(" ")[1].substring(0, 5);
              return (
                <View style={styles.hour}>
                  <Text
                    style={{
                      color: "#fff",
                      marginBottom: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {dt_txt}
                  </Text>

                  <Image
                    style={styles.smallIcon}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${weather?.icon}@4x.png`,
                    }}
                  />
                  <Text style={{ color: "#fff" }}>
                    {Math.round(hour?.item?.main?.temp - 273.15)}°C
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >{`${hour?.item?.main?.humidity}% humidity`}</Text>
                </View>
              );
            }}
          ></FlatList>
        </View>
        <View className="flex-row items-center m-5 space-x-2">
          <CalendarDaysIcon size={25} color="black" />
          <Text className="text-black text-base">Dự báo 7 ngày</Text>
        </View>
        <View style={styles.subtitle}>
          <FlatList
            horizontal
            data={sevenDayForecastData?.forecastday?.slice(0, 7)}
            keyExtractor={(hour, index) => index.toString()}
            renderItem={(forecastday) => {
              return (
                <View style={styles.hour}>
                  <Text style={{ color: "#fff" }}>
                    {convertDateTo_Week(forecastday.item.date)}
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    {convertDateTo_ddmm(forecastday.item.date)}
                  </Text>
                  <Image
                    style={styles.smallIcon}
                    source={{
                      uri: `https:${forecastday.item.day.condition.icon}`,
                    }}
                  />
                  <Text style={{ color: "#fff" }}>
                    Cao nhất: {Math.round(forecastday.item.day.maxtemp_c)}°C
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    Thấp nhất: {Math.round(forecastday.item.day.mintemp_c)}°C
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    Dộ ẩm: {Math.round(forecastday.item.day.avghumidity)}%
                  </Text>
                </View>
              );
            }}
          ></FlatList>
        </View>
        <View className="flex-row items-center m-5 space-x-2">
          <PresentationChartLineIcon size={25} color="black" />
          <Text className="text-black text-base">Biểu đồ dự báo nhiệt độ</Text>
          <TouchableOpacity onPress={() => setToolTipVisibleTemp(true)}>
            <ExclamationCircleIcon size={25} color="red" />
          </TouchableOpacity>
          <Tooltip
            isVisible={toolTipVisibleTemp}
            content={
              <View>
                <Text>
                  Nhiệt độ thấp (dưới 20°C): Nhiệt độ thấp có thể gây cảm lạnh,
                  cảm cúm, đau cơ, và nếu không ăn mặc ấm áp, có thể dẫn đến
                  viêm họng, viêm phổi và các vấn đề về hệ thống hô hấp.
                </Text>
                <Text>
                  Nhiệt độ trung bình (20°C - 35°C): Nhiệt độ trung bình thích
                  hợp cho nhiều hoạt động ngoài trời và sinh hoạt hàng ngày{" "}
                </Text>
                <Text>
                  Nhiệt độ cao (trên 35°C): Nhiệt độ cao có thể gây ra các vấn
                  đề về sức khỏe như say nắng, đột quỵ, mệt mỏi, và rủi ro về
                  việc đốt cháy nếu không có biện pháp bảo vệ phù hợp.
                </Text>
              </View>
            }
            placement="top"
            onClose={() => setToolTipVisibleTemp(false)}
          ></Tooltip>
        </View>
        <View>
          {sevenDayForecastData &&
          sevenDayForecastData.forecastday &&
          sevenDayForecastData.forecastday.length > 0 ? (
            <LineChart
              data={dataTemp}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          ) : (
            <Text>Không có dữ liệu!</Text>
          )}
        </View>
        <View className="flex-row items-center m-5 space-x-2">
          <PresentationChartLineIcon size={25} color="black" />
          <Text className="text-black text-base">Biểu đồ dự báo lượng mưa</Text>
          <TouchableOpacity onPress={() => setToolTipVisibleRain(true)}>
            <ExclamationCircleIcon size={25} color="red" />
          </TouchableOpacity>
          <Tooltip
            isVisible={toolTipVisibleRain}
            content={
              <View>
                <Text>
                  - Mưa nhỏ, lượng mưa không đáng kể: lượng mưa nhỏ hơn 0,3
                  mm/12 giờ.
                </Text>
                <Text>
                  - Mưa nhỏ: lượng mưa nhỏ hơn 3.0mm/12 giờ hoặc nhỏ hơn
                  6.0mm/24 giờ.
                </Text>
                <Text>
                  - Mưa: lượng mưa từ 3.0mm đến dưới 8.0mm/12giờ hoặc
                  6.0-15.0mm/24 giờ.
                </Text>
                <Text>
                  - Mưa vừa: lượng mưa từ 8.0-25.0mm/12giờ hoặc khoảng 16.0-
                  50.0mm/24giờ.
                </Text>
                <Text>
                  - Mưa to: lượng mưa từ 25.0-50.0mm/12giờ hoặc
                  51.0-100.0mm/24giờ.
                </Text>
                <Text>
                  - Mưa rất to: lượng mưa trên 50.0mm/12 giờ hoặc trên
                  100.0mm/24 giờ.
                </Text>
              </View>
            }
            placement="top"
            onClose={() => setToolTipVisibleRain(false)}
          ></Tooltip>
        </View>
        <View>
          {sevenDayForecastData &&
          sevenDayForecastData.forecastday &&
          sevenDayForecastData.forecastday.length > 0 ? (
            <LineChart
              data={dataPrecip}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          ) : (
            <Text>Không có dữ liệu!</Text>
          )}
        </View>
        <View className="flex-row items-center m-5 space-x-2">
          <PresentationChartLineIcon size={25} color="black" />
          <Text className="text-black text-base">Biểu đồ dự báo chỉ số UV</Text>
          <TouchableOpacity onPress={() => setToolTipVisible(true)}>
            <ExclamationCircleIcon size={25} color="red" />
          </TouchableOpacity>
          <Tooltip
            isVisible={toolTipVisible}
            content={
              <View>
                <Text>
                  Chỉ số UV thường được đo trên một thang đo phổ quát từ 0 đến
                  11+, với các mức độ sau:
                </Text>
                <Text>
                  0-2: Mức độ UV ở mức rất thấp đến thấp. Đây là thời điểm an
                  toàn nhất để tiếp xúc với ánh nắng mặt trời.
                </Text>
                <Text>
                  3-5: Mức độ UV ở mức trung bình. Cần cẩn trọng khi tiếp xúc
                  với ánh nắng mặt trời trong thời gian dài và cần sử dụng kem
                  chống nắng.
                </Text>
                <Text>
                  6-7: Mức độ UV ở mức cao. Cần hạn chế thời gian tiếp xúc với
                  ánh nắng mặt trời và sử dụng kem chống nắng, đặc biệt là vào
                  giữa trưa.
                </Text>
                <Text>
                  8-10: Mức độ UV ở mức rất cao. Cần tránh tiếp xúc với ánh nắng
                  mặt trời vào giữa trưa và sử dụng kem chống nắng, kính râm, và
                  áo che mặt khi ra ngoài.
                </Text>
                <Text>
                  11+: Mức độ UV ở mức cực cao. Tiếp xúc với ánh nắng mặt trời
                  cần được tránh vào giữa trưa và cần sử dụng các biện pháp bảo
                  vệ mạnh mẽ như kem chống nắng, kính râm, áo che mặt và tránh
                  tiếp xúc trực tiếp với ánh nắng mặt trời.
                </Text>
              </View>
            }
            placement="top"
            onClose={() => setToolTipVisible(false)}
          ></Tooltip>
        </View>
        <View>
          {sevenDayForecastData &&
          sevenDayForecastData.forecastday &&
          sevenDayForecastData.forecastday.length > 0 ? (
            <LineChart
              data={dataUV}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          ) : (
            <Text>Không có dữ liệu!</Text>
          )}
        </View>
        <View className="flex-row items-center m-5 space-x-2">
          <GlobeAltIcon size={25} color="black" />
          <Text className="text-black text-base">Thông tin về mặt trời</Text>
        </View>
        <View style={styles.subtitle}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/sun1.jpg")}
              style={{ width: 100, height: 100 }}
            ></Image>
          </View>
          <View style={styles.rowType}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Bình minh:
              </Text>
              <Text style={{ fontSize: 20 }}>
                {currentForecastData?.sunrise}
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center", marginLeft: "10px" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Hoàng hôn
              </Text>
              <Text style={{ fontSize: 20 }}>
                {currentForecastData?.sunset}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center m-5 space-x-2">
          <GlobeAltIcon size={25} color="black" />
          <Text className="text-black text-base">Thông tin về mặt trăng</Text>
        </View>
        <View style={styles.subtitle}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/moon.png")}
              style={{ width: 100, height: 100 }}
            ></Image>
          </View>
          <View style={styles.rowType}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Mặt trăng mọc:
              </Text>
              <Text style={{ fontSize: 20 }}>
                {currentForecastData?.moonrise}
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center", marginLeft: "10px" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Mặt trăng lặn
              </Text>
              <Text style={{ fontSize: 20 }}>
                {currentForecastData?.moonset}
              </Text>
            </View>
          </View>
          <View style={styles.rowType}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Trạng thái mặt trăng:
              </Text>
              <Text style={{ fontSize: 20 }}>
                {translateMoonPhase(currentForecastData?.moon_phase)}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Độ chiếu sáng của mặt trăng:
              </Text>
              <Text style={{ fontSize: 20 }}>
                {currentForecastData?.moon_illumination}%
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rowType: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 60,
  },
  current_wrap: {
    backgroundColor: "#fff",
    padding: 15,
  },
  current_container: {
    backgroundColor: "#62B8F6",
    borderRadius: 30,
    padding: 10,
  },
  currentDate: {
    flexDirection: "row",
    gap: 10,
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  title_location: {
    textAlign: "center",
    alignItems: "center",
  },
  current: {
    flexDirection: "col",
    alignItems: "center",
  },
  large_icon: {
    width: 200,
    height: 200,
  },
  currentTemp: {
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  currentDesc: {
    width: "100%",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 18,
    marginBottom: 5,
    color: "#fff",
  },
  extraInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 7,
  },

  info: {
    width: Dimensions.get("screen").width / 2.5,
    padding: 5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    backgroundColor: "#62B8F6",
    fontSize: 24,
    color: "#c84b31",
    fontWeight: "bold",
    width: "100%",
    paddingLeft: 10,
    paddingTop: 10,
  },
  hour: {
    padding: 20,
    alignItems: "center",
  },
  smallIcon: {
    width: 50,
    height: 50,
  },

  dash: {
    width: "100%",
    height: 1,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  footer: {
    display: "flex",
    alignItems: "center",

    padding: 20,
  },
  setting: {
    backgroundColor: "#fff",
    padding: 10,
    position: "absolute",
    width: 100,
    right: 0,
    borderTopRightRadius: 20,
    display: "flex",
    alignItems: "center",
  },
});
