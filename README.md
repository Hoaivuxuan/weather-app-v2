# Weather App

A modern, feature-rich weather application built with React Native and Expo that provides detailed weather information including current conditions, forecasts, and interactive charts.

## Features

- **Real-time Weather Data**: Get up-to-date weather information from multiple weather APIs (OpenWeatherMap, Weather API)
- **Location-based Weather**: Access weather data based on your current location
- **City Search**: Search for weather information in any city worldwide
- **Detailed Forecasts**: View hourly and 7-day weather forecasts
- **Interactive Charts**: Visualize temperature trends, precipitation, and UV index with beautiful charts
- **Astronomical Data**: Access sunrise/sunset times and moon phase information

## Screenshots

[Add screenshots of your app here]

## Technologies Used

- **React Native**: Cross-platform mobile application framework
- **Expo**: Development platform for React Native
- **TailwindCSS/NativeWind**: For styling components
- **React Navigation**: For screen navigation
- **Axios**: For API requests
- **React Native Chart Kit**: For weather data visualization
- **Expo Location**: For accessing device location
- **React Native Heroicons**: For beautiful icons

## APIs

- **OpenWeatherMap API**: For current weather and forecasts
- **WeatherAPI.com**: For extended forecast data and astronomical information

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or Yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd weather-app-v2
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open the app in your simulator or device:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan the QR code with the Expo Go app on your physical device

## Project Structure

```
weather-app-v2/
├── assets/             # Images, fonts, and other static files
├── screens/            # Screen components
│   ├── HomeScreen/     # Main weather display
│   ├── More/           # Additional features
│   └── BottomTab.js    # Navigation tabs
├── services/           # API services and helper functions
├── src/                # Source files
├── App.js              # Main app entry point
├── package.json        # Project dependencies
└── tailwind.config.js  # TailwindCSS configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Your License Information]

## Acknowledgements

- Weather data provided by OpenWeatherMap and WeatherAPI.com
- Icons from React Native Heroicons 