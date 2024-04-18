/** @format */

import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import {
   CalendarDaysIcon,
   MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
const openWeatherKey = '1f996ca44bb1065c2e4accefe9dfb967';
import * as Location from 'expo-location';
import { getWeather } from '../../services/HomeScreenService';
import LocationScreen from './LocationScreen';
import { convertDateTo_ddmm, convertDateTo_Week } from '../../services/functions';
// import moment from 'moment';
//
const HomeScreen = ({ navigation, city = 'London', setCity }) => {
   const [weatherData, setWeatherData] = useState({});
   const [forecastData, setForecastData] = useState([]);
   const [sevenDayForecastData, setSevenDayForecastData] = useState([]);
   //
   useEffect(() => {
      const fetchWeatherData = async () => {
         const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}`,
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
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherKey}`,
         );
         const data = await response.json();
         setForecastData(data.list);
      };
      fetchWeatherData();
   }, [city]);
   //
   useEffect(() => {
      const fetchWeatherData = async () => {
         const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=0074e0661b2f49a4a3b24908240604&q=${city}&days=7&aqi=yes&alerts=no`,
         );
         const data = await response.json();
         // console.log("check data:", data.forecast.forecastday)
         setSevenDayForecastData(data.forecast);
      };
      fetchWeatherData();
   }, [city]);
   let lat = 21.0278;
   let lon = 105.8342;

   const dates = Date().split(' ');

   //permission
   const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
         return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // console.log('location', location);
      const latitude = lat;
      const longtitude = lon;
      console.log('latitude', latitude);
      console.log('longtitude', longtitude);

      const results = await getWeather(latitude, longtitude);
      if (results.cod == 200) {
         console.log('results', results.name);
         setCity(results.name);
      }
   };
   const handleNavigate = () => {
      navigation.navigate(LocationScreen);
   };
   const handleGetCurrentLocation = () => {
      getLocation();
   };
   return (
      <SafeAreaView style={styles.container}>
         <ScrollView>
            <View style={styles.current_wrap}>
               <View style={styles.current_container}>
                  <View style={styles.header}>
                     <View>
                        <TouchableOpacity onPress={handleNavigate}>
                           <Image source={require('../../assets/akar-icons_plus.png')}></Image>
                        </TouchableOpacity>
                     </View>
                     <TouchableOpacity onPress={handleGetCurrentLocation}>
                        <Text style={styles.title}>{weatherData?.name}</Text>
                     </TouchableOpacity>
                     <View style={{ position: 'relative' }}>
                        <TouchableOpacity>
                           <Image source={require('../../assets/carbon_overflow-menu-vertical.png')}></Image>
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
                        <Text style={{ fontSize: 18, color: '#fff' }}>{dates ? dates[0] : 'Thursday'}</Text>
                        <Text style={{ fontSize: 18, color: '#fff' }}>|</Text>
                        <Text style={{ fontSize: 18, color: '#fff' }}>
                           {dates ? `${dates[1]} ${dates[2]}` : 'Nov 24'}
                        </Text>
                     </View>
                     <Text style={styles.currentTemp}>{Math.round(weatherData?.main?.temp - 273.15)}</Text>
                     <Text style={styles.currentDesc}>
                        {Array.isArray(weatherData.weather) ? weatherData?.weather[0]?.description : ''}
                     </Text>
                     <View style={styles.dash}></View>
                     <View style={styles.extraInfo}>
                        <View style={styles.info}>
                           <Image
                              source={require('../../assets/carbon_location-current.png')}
                              style={{
                                 width: 30,
                                 height: 30,
                              }}
                           ></Image>
                           <View>
                              <Text style={styles.text}>{`${weatherData?.wind?.speed}km/h`}</Text>
                              <Text style={styles.text}>Wind</Text>
                           </View>
                        </View>
                        <View style={[styles.info, { left: -5 }]}>
                           <Image
                              source={require('../../assets/fluent_weather-rain-24-regular.png')}
                              style={{
                                 width: 30,
                                 height: 30,
                              }}
                           ></Image>
                           <View>
                              <Text style={styles.text}>{`${weatherData?.chance_of_rain} %`}</Text>
                              <Text style={styles.text}>Rain</Text>
                           </View>
                        </View>
                        <View style={styles.info}>
                           <Image
                              source={require('../../assets/fluent_temperature-24-regular.png')}
                              style={{
                                 width: 30,
                                 height: 30,
                              }}
                           ></Image>
                           <View>
                              <Text style={styles.text}>{`${weatherData?.main?.pressure} mbar`}</Text>
                              <Text style={styles.text}>Pressure</Text>
                           </View>
                        </View>
                        <View style={styles.info}>
                           <Image
                              source={require('../../assets/ion_water-outline.png')}
                              style={{
                                 width: 30,
                                 height: 30,
                              }}
                           ></Image>
                           <View>
                              <Text style={styles.text}>{`${weatherData?.main?.humidity} %`}</Text>
                              <Text style={styles.text}>Humidity</Text>
                           </View>
                        </View>
                     </View>
                  </View>
               </View>
            </View>

            <View style={styles.subtitle}>
               <View style={styles.currentDate}>
                  <Text style={{ fontSize: 16, color: '#fff' }}> {dates ? dates[0] : 'Thurs'}</Text>
                  <Text style={{ fontSize: 16, color: '#fff' }}>|</Text>
                  <Text style={{ fontSize: 16, color: '#fff' }}> {dates ? `${dates[1]} ${dates[2]}` : 'Nov 24'}</Text>
               </View>
               <FlatList
                  horizontal
                  data={forecastData?.slice(0, 7)}
                  keyExtractor={(hour, index) => index.toString()}
                  renderItem={(hour) => {
                     const weather = hour.item.weather[0];
                     const dt_txt = hour.item.dt_txt.split(' ')[1].substring(0, 5);
                     return (
                        <View style={styles.hour}>
                           <Text
                              style={{
                                 color: '#fff',
                                 marginBottom: 5,
                                 fontWeight: 'bold',
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
                           <Text style={{ color: '#fff' }}>{Math.round(hour?.item?.main?.temp - 273.15)}°C</Text>
                           <Text
                              style={{
                                 color: '#fff',
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
         </ScrollView>
      </SafeAreaView>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      marginTop: 60,
   },
   current_wrap: {
      backgroundColor: '#fff',
      padding: 15,
   },
   current_container: {
      backgroundColor: '#62B8F6',
      borderRadius: 30,
      padding: 10,
   },
   currentDate: {
      flexDirection: 'row',
      gap: 10,
      color: '#fff',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   title: {
      textAlign: 'center',
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
   },
   title_location: {
      textAlign: 'center',
      alignItems: 'center',
   },
   current: {
      flexDirection: 'col',
      alignItems: 'center',
   },
   large_icon: {
      width: 200,
      height: 200,
   },
   currentTemp: {
      fontSize: 46,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff',
   },
   currentDesc: {
      width: '100%',
      textAlign: 'center',
      fontWeight: '200',
      fontSize: 18,
      marginBottom: 5,
      color: '#fff',
   },
   extraInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 7,
   },

   info: {
      width: Dimensions.get('screen').width / 2.5,
      padding: 5,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingLeft: 30,
      paddingRight: 30,
   },
   text: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
   },
   subtitle: {
      backgroundColor: '#62B8F6',
      fontSize: 24,
      color: '#c84b31',
      fontWeight: 'bold',
      width: '100%',
      paddingLeft: 10,
      paddingTop: 10,
   },
   hour: {
      padding: 20,
      alignItems: 'center',
   },
   smallIcon: {
      width: 50,
      height: 50,
   },

   dash: {
      width: '100%',
      height: 1,
      backgroundColor: '#fff',
      marginTop: 5,
   },
   footer: {
      display: 'flex',
      alignItems: 'center',

      padding: 20,
   },
   setting: {
      backgroundColor: '#fff',
      padding: 10,
      position: 'absolute',
      width: 100,
      right: 0,
      borderTopRightRadius: 20,
      display: 'flex',
      alignItems: 'center',
   },
});
