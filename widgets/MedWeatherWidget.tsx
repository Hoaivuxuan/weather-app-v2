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
import { View } from 'react-native';
export function MedWeatherWidget(prop: {weather: Weather, forecast: WeatherForecast[]}) {
  const weather = prop.weather
  let forecast = []
  for (let i = 0; i < prop.forecast.length; i+=8) {
    forecast.push(prop.forecast[i])
  }
  if (forecast.length < 5) {
    forecast.push(prop.forecast[prop.forecast.length - 1])
  } 
  forecast = forecast.slice(0,5)
  // const forecast = prop.forecast.slice(0, 6)
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const days_full = ['Sunday','Monday','Tueday','Wednesday','Thursday','Friday','Satuday'];
  const dt = new Date(weather.dt * 1000)
  return (
    <FlexWidget
      clickAction="INIT"
      style={{
        backgroundColor: '#ffffff',
        height: 180,
        width: 370,
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FlexWidget
        style={{          
          height: 'match_parent',
          width: 'match_parent',
          flexDirection: 'column',
        }}
      >
        <FlexWidget 
          style={{          
            width: 'match_parent',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FlexWidget 
            style={{
              height: 'match_parent', 
              alignItems: 'center', 
              justifyContent: 'center', 
          }}>
            <TextWidget
              text={days_full[dt.getDay()]}
              style={{ 
                fontSize: 13, 
                color: '#EE5C51',
                fontWeight: '600',
              }}
            />
            <TextWidget
              text={dt.getDate().toString()}
              style={{ 
                marginTop: -8,
                fontSize: 50, 
                color: '#000000',
                fontWeight: '200',
              }}
            />
          </FlexWidget>
          <FlexWidget 
            style={{    
              height: 'match_parent',
              paddingTop: 28,
              marginLeft: 18
            }}
          >
            <FlexWidget 
              style={{    
                height: 35,
                width: 1,
                backgroundColor:  `rgba(${154}, ${204}, ${255}, ${0.5})`
              }}
            >
            </FlexWidget>
          </FlexWidget>
          <FlexWidget 
            style={{
              height: 'match_parent',
              alignItems: 'center', 
              justifyContent: 'center', 
            }}
          >
            <TextWidget
              text={weather.name}
              style={{ 
                marginTop: -8,
                fontSize: 22, 
                color: '#5686DF', 
                fontWeight: '600',
                textAlign: 'center',
              }}
            />
            <TextWidget
              text={` ${weather.main.temp.toFixed()}°`}
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
              height: 'match_parent', 
              justifyContent: 'flex-end', 
              marginLeft: 5
            }}
          >
            {renderWeatherIcon(weather.weather[0].main, 60, 60)}
          </FlexWidget>
          <FlexWidget 
            style={{
              height: 'match_parent', 
              justifyContent: 'flex-end', 
              paddingBottom: 12, 
              marginLeft: 10,
            }}
          >

            <TextWidget
              text={`Feel like ${weather.main.feels_like.toFixed()}°`}
              style={{
                fontSize: 16, 
                color: '#5686DF',
                fontWeight: '400',
              }}
            />
            <TextWidget
              text={weather.weather[0].main}
              style={{
                fontSize: 16, 
                color: '#5686DF',
                fontWeight: '400',
              }}
            /> 
          </FlexWidget>
        </FlexWidget>
        <FlexWidget 
          style={{          
            width: 'match_parent',
            flexDirection: 'row',
            // paddingLeft: 3
          }}
        > 
          {forecast.map((wt) => {
            const dt_sub = new Date(wt.dt * 1000)
            return (
              <FlexWidget 
                key={wt.dt}  
                style={{          
                  height: 'match_parent',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 17
                }}
              >

                <TextWidget
                  text={`${wt.main.temp.toFixed()}°`}
                  style={{
                    fontSize: 15, 
                    color: '#5686DF',
                    fontWeight: '600',
                  }}
                />
                <FlexWidget 
                  style={{
                    marginTop: -4
                  }}
                >
                  {renderWeatherIcon(wt.weather[0].main, 30, 30)}
                </FlexWidget>
                {/* <TextWidget
                  text={`${('0' + dt_sub.getHours()).slice(-2)}:${('0' + dt_sub.getMinutes()).slice(-2)}`}
                  style={{
                    marginTop: -2,
                    fontSize: 15, 
                    color: '#5686DF',
                    fontWeight: '300',
                  }}
                /> */}
                <TextWidget
                  text={days[dt_sub.getDay()]}
                  style={{
                    marginTop: -2,
                    fontSize: 15, 
                    color: '#5686DF',
                    fontWeight: '300',
                  }}
                />
              </FlexWidget>
            )
          })}
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
