import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import MeasureCard from "./MeasureCard";
import { MeasureData } from "../../../src/common/dataWarn";

const MeasureBadWeather = () => {
  // const [warn, setWarn] = useState([]);
  // useEffect(() => {
  //   getWarn();
  // }, []);

  // const getWarn = () => {
  //   return fetch("localhost:3000/warn/listWarn")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#6390F0" }}>
      <View style={{ flex: 1 }}>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 25 }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
            Biện pháp ứng phó thời tiết xấu.
          </Text>
        </View>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={MeasureData}
            renderItem={({ item }) => <MeasureCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            listHeaderComponent={
              <View>
                <Text>HomeHeader</Text>
              </View>
            }
          />
        </View>
        {/* <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: "#001F2D" }}></View>
          <View style={{ flex: 1, background: "#001F2D" }}></View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default MeasureBadWeather;
