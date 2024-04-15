import React from 'react';
import { requestWidgetUpdate, type WidgetTaskHandlerProps } from 'react-native-android-widget';
import { ShopifyWidget } from './ShopifyWidget';
import { SmallWeatherWidget } from './SmallWeatherWidget'
const nameToWidget = {
  Shopify: ShopifyWidget,
  SmallWeather: SmallWeatherWidget
};
import * as Location from "expo-location";
import { getForecast, getWeather } from '../services/HomeScreenService';
import {Weather, WeatherForecast} from '../screens/HomeScreen/HomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  console.log(props);
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[
    widgetInfo.widgetName as keyof typeof nameToWidget
  ] as any;
  let weather: Weather
  let forecast: WeatherForecast
  let location: Location.LocationObject
  let status;
  const fetchWeather = async () => {
    weather = await getWeather(21.0278, 105.8342);
  };

  const fetchForecast = async () => {
    forecast = await getForecast(21.0278, 105.8342);
  };

  switch (props.widgetAction) {
    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_ADDED':
      location = JSON.parse(await AsyncStorage.getItem('location'))
      weather = JSON.parse(await AsyncStorage.getItem('weather'))
      forecast = JSON.parse(await AsyncStorage.getItem('forecast'))
      console.log(location)
      console.log(weather)
      if (widgetInfo.widgetName === 'SmallWeather') {
        props.renderWidget(<SmallWeatherWidget {...weather}/>);
      }    
      break;

    case 'WIDGET_UPDATE': 
      console.log('hi')
      // await Location.requestForegroundPermissionsAsync();
      // location = await Location.getCurrentPositionAsync({});
      // if (location) {
      //   await fetchWeather();
      //   await fetchForecast();
      // }
      // console.log(location)
      props.renderWidget(<Widget {...widgetInfo} />);
      break;

    case 'WIDGET_DELETED':
      // Do nothing
      break;

    case 'WIDGET_CLICK':
      break;

    default:
      break;
  }
}
async function writeAndGetEvents (){
  await AsyncStorage.setItem('bruh','dsa');
  console.log('brub')
}