/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  SvgWidget,
  TextWidget,
} from 'react-native-android-widget';
import { Weather, WeatherForecast } from '../screens/HomeScreen/HomeScreen';
import renderWeatherIcon from './WeatherIcon';
export function LargeWeatherWidget(prop: {weather: Weather, forecast: WeatherForecast[]}) {
  const weather = prop.weather
  const dt = new Date(weather.dt * 1000)
  let forecast = []
  let forecast_today = []
  for (let i = 0; i < prop.forecast.length; i+= 8) {
    forecast.push(prop.forecast[i])
  }
  if (forecast.length < 5) {
    forecast.push(prop.forecast[prop.forecast.length - 1])
  } 
  let cur_date = dt.getDate()
  let cur_i = 0
  for (let i = 0; i < prop.forecast.length; i+= 1) {
    let dt_sub = new Date(prop.forecast[i].dt * 1000)
    if (dt_sub.getDate() != cur_date) {
      cur_date = dt_sub.getDate()
      cur_i += 1;
    }
    if (cur_i < forecast.length) {
      forecast[cur_i].main.temp_max = Math.max(forecast[cur_i].main.temp_max, prop.forecast[i].main.temp_max)
      forecast[cur_i].main.temp_min = Math.min(forecast[cur_i].main.temp_min, prop.forecast[i].main.temp_min)
    }
    forecast_today.push(prop.forecast[i])
  }
  forecast = forecast.slice(0, 5)
  forecast_today = forecast_today.slice(0, 6)
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const days_full = ['Sunday','Monday','Tueday','Wednesday','Thursday ','Friday','Satuday'];

  return (
    <FlexWidget
      clickAction="INIT"
      style={{
        backgroundColor: '#ffffff',
        height: 380,
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
              alignItems: 'flex-start', 
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <TextWidget
              text={weather.name}
              style={{ 
                marginTop: -8,
                fontSize: 22, 
                color: '#5686DF', 
                fontWeight: '600',
              }}
            />
            <FlexWidget
              style={{
                height: 'match_parent',
                flexDirection: 'row',
              }}
            >
              <TextWidget
                text={`${weather.main.temp.toFixed()}`}
                style={{
                  marginTop: -12,
                  fontSize: 50, 
                  color: '#5686DF',
                  fontWeight: '200',
                }}
              />
              <FlexWidget
                style={{
                  flexDirection: 'column',
                }}
              >
                <FlexWidget style={{marginTop: -10, marginLeft: -4}}>
                  {renderWeatherIcon(weather.weather[0].main, 40, 40)}
                </FlexWidget>
                
                <TextWidget
                  text={weather.weather[0].main}
                  style={{
                    marginLeft: 2,
                    marginTop: -4,
                    fontSize: 16, 
                    color: '#5686DF',
                    fontWeight: '400',
                  }}
                /> 
              </FlexWidget>
            </FlexWidget>
          </FlexWidget>
          <FlexWidget 
            style={{
              marginTop: -5,
              height: 'match_parent', 
              width: 'match_parent',
              alignItems: 'center', 
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <FlexWidget
              style={{
                width: 'match_parent',
                alignItems: 'center', 
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}      
            
            >
              <TextWidget
                text={`Feel like `}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '300',
                }}
              />
              <TextWidget
                text={`${weather.main.feels_like.toFixed()}°`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '400',
                }}
              />
            </FlexWidget>
            <FlexWidget
              style={{
                marginTop: -3,
                width: 'match_parent',
                alignItems: 'center', 
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}      
            
            >
              <TextWidget
                text={`${weather.main.humidity}`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '400',
                }}
              />
              <TextWidget
                text={`%`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '300',
                }}
              />
            </FlexWidget>
            <FlexWidget
              style={{
                marginTop: -3,
                width: 'match_parent',
                alignItems: 'center', 
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}      
            
            >
              <TextWidget
                text={`${weather.wind.speed.toFixed(1)}`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '400',
                }}
              />
              <TextWidget
                text={` m/s`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '300',
                }}
              />
            </FlexWidget>
            <FlexWidget
              style={{
                marginTop: -3,
                width: 'match_parent',
                alignItems: 'center', 
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}      
            
            >
              <TextWidget
                text={`${weather.main.pressure}`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '400',
                }}
              />
              <TextWidget
                text={` mmHg`}
                style={{
                  fontSize: 14, 
                  color: '#5686DF',
                  fontWeight: '300',
                }}
              />
            </FlexWidget>
          </FlexWidget>
        </FlexWidget>
        <FlexWidget 
          style={{          
            width: 'match_parent',
            flexDirection: 'row',
            paddingLeft: 2
          }}
        > 
          {forecast_today.map((wt) => {
            const dt_sub = new Date(wt.dt * 1000)
            return (
              <FlexWidget 
                key={wt.dt}  
                style={{          
                  height: 'match_parent',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 7
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
                  {renderWeatherIcon(wt.weather[0].main, 40, 40)}
                </FlexWidget>
                <TextWidget
                  text={`${('0' + dt_sub.getHours()).slice(-2)}:${('0' + dt_sub.getMinutes()).slice(-2)}`}
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

        <FlexWidget 
          style={{          
            width: 'match_parent',
            flexDirection: 'column',
          }}
        > 
          <FlexWidget                
            style={{          
              width: 'match_parent',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 235,
              marginTop: 4
            }}
          >
            <TextWidget
              text="Min"
              style={{
                fontSize: 14, 
                color: '#5686DF',
                fontWeight: '400',
              }}
            />
            <TextWidget
              text="Max"
              style={{
                fontSize: 14, 
                color: '#5686DF',
                fontWeight: '400',
                marginLeft: 31
              }}
            />
          </FlexWidget>
          {forecast.map((wt) => {
            const dt_sub = new Date(wt.dt * 1000)
            return (
              <FlexWidget 
                key={wt.dt}  
                style={{         
                  height: 34, 
                  width: 'match_parent',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <TextWidget
                  text={`${('0' + dt_sub.getDate()).slice(-2)}.${('0' + (dt_sub.getMonth() + 1)).slice(-2)}`}
                  style={{

                    fontSize: 18, 
                    color: '#5686DF',
                    fontWeight: '300',
                  }}
                />
                <TextWidget
                  text={days_full[dt_sub.getDay()]}
                  style={{
                    width: 120,
                    paddingLeft: 5,
                    fontSize: 18, 
                    color: '#5686DF',
                    fontWeight: '400',
                  }}
                />
                <FlexWidget 
                  style={{
                  }}
                >
                  {renderWeatherIcon(wt.weather[0].main, 40, 40)}
                </FlexWidget>
                <TextWidget
                  text={`${wt.main.temp_min.toFixed()}°`}
                  style={{
                    fontSize: 14, 
                    color: '#5686DF',
                    fontWeight: '500',
                    marginLeft: 33,
                  }}
                />
                <TextWidget
                  text={`${wt.main.temp_max.toFixed()}°`}
                  style={{
                    fontSize: 14, 
                    color: '#5686DF',
                    fontWeight: '500',
                    marginLeft: 33,
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
