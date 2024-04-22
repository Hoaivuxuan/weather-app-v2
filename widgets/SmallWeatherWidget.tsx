/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  SvgWidget,
  TextWidget,
} from 'react-native-android-widget';
import * as Location from "expo-location";
import { Weather, WeatherForecast } from '../screens/HomeScreen/HomeScreen';
import renderWeatherIcon from './WeatherIcon';
export function SmallWeatherWidget(prop: {weather: Weather, forecast: WeatherForecast[]}) {
  const weather = prop.weather
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dt = new Date(weather.dt * 1000)
  return (
    <FlexWidget
      clickAction="INIT"
      style={{
        backgroundColor: '#ffffff',
        height: 180,
        width: 180,
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FlexWidget 
        style={{
        }}
      >
        <TextWidget
          text={weather.name}
          style={{ 
            marginTop: -3,
            fontSize: 20, 
            color: '#5686DF', 
            fontWeight: '700',
          }}
        />
      </FlexWidget>
      <FlexWidget
        style={{          
          height: 'match_parent',
          width: 'match_parent',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <FlexWidget 
          style={{          
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <FlexWidget 
            style={{
            }}
          >
            <TextWidget
              text={`${weather.main.temp.toFixed()}°`}
              style={{
                marginTop: -12,
                fontSize: 50, 
                color: '#5686DF',
                fontWeight: '200',
              }}
            />
          </FlexWidget>
          <FlexWidget 
            style={{
              width: 'match_parent',
              height: 'match_parent',
              justifyContent: 'center', 
              alignItems: 'center', 
            }}
          >
            <TextWidget
              text={weather.weather[0].main}
              style={{
                textAlign: 'center',
                width: 60,
                fontSize: 16, 
                color: '#5686DF',
                fontWeight: '300',
              }}
            /> 
            <TextWidget
              text={`~${weather.main.feels_like.toFixed()}°`}
              style={{
                fontSize: 16, 
                color: '#5686DF',
                fontWeight: '500',
              }}
            />
          </FlexWidget>
        </FlexWidget>
        <FlexWidget 
          style={{ 
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <FlexWidget 
            style={{
              width: 'match_parent',
              alignItems: 'center',
            }}
          >    
            {renderWeatherIcon(weather.weather[0].main, 40, 40)}
          </FlexWidget>
          <FlexWidget style={{width: 'match_parent', alignItems:'center', marginTop: 10}}>
            <TextWidget
              text={days[dt.getDay()]}
              style={{ 
                fontSize: 16, 
                color: '#EE5C51',
                fontWeight: '600',
              }}
            />
            <TextWidget
              text={dt.getDate().toString()}
              style={{ 
                marginTop: -12,
                fontSize: 50, 
                color: '#000000',
                fontWeight: '200',
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}