/** @format */

import {useState} from 'react';
import GetLocation from 'react-native-get-location';

export async function GetLocationPermission(params) {
   const [lat, setLat] = useState(null);
   const [lon, setLon] = useState(null);

   try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
         title: 'Location Permission',
         message: 'Please allow Location Permissions to continue...',
         buttonNeutral: 'Ask Me Later',
         buttonNegative: 'Cancel',
         buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
         });
      } else {
         console.log('Lcation permission denied');
      }
   } catch (err) {
      console.warn(err);
   }
}

export function getAddress() {
   const apiKey = 'AIzaSyBIzOeC1KdWOR5aCW8TPmKHGfvnFopn33M';

   const latitude = 21.027763;
   const longitude = 105.83416;

   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
   fetch(url)
      .then((response) => {
         return response.json(); // Chuyển đổi response sang dạng JSON
      })
      .then((data) => {
         console.log('Data from Google Geocoding API:', data);
         // Xử lý dữ liệu ở đây, ví dụ: lấy tên địa chỉ từ data
         const formattedAddress = data.results[0].formatted_address;
         console.log('Formatted address:', formattedAddress);
      })
      .catch((error) => {
         console.error('Error fetching address:', error);
      });
}
