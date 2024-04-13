/** @format */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import HomeScreen from './HomeScreen';
const openWeatherKey = '1f996ca44bb1065c2e4accefe9dfb967';
const LocationScreen = ({navigation, setCity}) => {
   const cities = ['Hanoi', 'Pari', 'London', 'Seoul'];
   const [searchQuery, setSearchQuery] = React.useState('');
   const [cityDatas, setCityDatas] = useState([]);
   //   const getDatas = async () => {
   //     try {
   //       const response = await axios.get('http://localhost:3000/all');
   //       console.log('response', response);
   //       // setCities(response.data);
   //     } catch (error) {
   //       console.error(error);
   //
   //   };
   //   useEffect(() => {
   //     getDatas();
   //     // Lấy danh sách các mục khi component được render
   //   }, []);
   const citys = searchQuery
      ? cities.filter((city) => city.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
      : cities;
   const handleNavigate = (city) => {
      setCity(city.name);
      navigation.navigate(HomeScreen);
   };
   const handleBlur = () => {
      Keyboard.dismiss();
   };
   useEffect(() => {
      const fetchWeatherData = async (citys) => {
         const requests = citys.map(async (city) => {
            const response = await fetch(
               `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}`,
            );
            const data = await response.json();
            return data;
         });
         const responses = await Promise.all(requests);
         setCityDatas(responses);
      };
      fetchWeatherData(citys);
   }, [searchQuery]);
   return (
      <SafeAreaView style={styles.wrap}>
         <View style={styles.container}>
            <View style={styles.header}>
               <View>
                  <TouchableOpacity onPress={handleNavigate}>
                     <Image source={require('../../assets/arrow_left.png')}></Image>
                  </TouchableOpacity>
               </View>
               <Text style={styles.title}>Location</Text>
            </View>
            <View style={{marginTop: 50}}>
               <TextInput
                  placeholder='Search your city'
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={styles.searchText}
                  onBlur={handleBlur}
               />
               <Icon name='search' size={30} style={styles.searchIcon} />
            </View>

            <View style={styles.listBlock}>
               {cityDatas &&
                  cityDatas.map((city) => (
                     <View key={city.id}>
                        <TouchableOpacity onPress={() => handleNavigate(city)} style={styles.block}>
                           <View style={styles.location}>
                              <Text>{city?.name}</Text>
                              <Text> {`${Math.round(city?.main?.temp - 273.15)}°C`}</Text>
                           </View>
                           <View style={styles.status}>
                              {Array.isArray(city.weather) && (
                                 <Image
                                    style={[styles.smallIcon, {tintColor: '#62B8F6'}]}
                                    source={{
                                       uri: `http://openweathermap.org/img/wn/${city?.weather[0]?.icon}@4x.png`,
                                    }}
                                 />
                              )}
                              <Text>{Array.isArray(city.weather) ? city?.weather[0]?.description : ''}</Text>
                           </View>
                        </TouchableOpacity>
                     </View>
                  ))}
            </View>
         </View>
      </SafeAreaView>
   );
};

export default LocationScreen;
const styles = StyleSheet.create({
   wrap: {
      backgroundColor: '#fff',
      padding: 15,
      marginTop: 60,
   },
   container: {
      backgroundColor: '#62B8F6',
      borderRadius: 30,
      height: '100%',
      padding: 10,
   },
   header: {
      marginBottom: 20,
      // position: 'relative',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 100,
   },
   title: {
      textAlign: 'center',
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
   },
   listBlock: {
      marginTop: 20,
      flexDirection: 'column',
      gap: 10,
   },
   block: {
      width: '100%',
      height: 80,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
   },
   searchText: {
      backgroundColor: '#fff',
      borderRadius: 30,
      height: 46,
      // padding: 30,
      paddingLeft: 40,
      fontSize: 16,
      color: '#000',
   },
   searchIcon: {
      position: 'absolute',
      top: 12,
      left: 10,
      color: '#000',
      fontSize: 26,
   },
   smallIcon: {
      width: 50,
      height: 50,
   },
   status: {
      flexDirection: 'column',
      justifyContent: 'right',
   },
});
