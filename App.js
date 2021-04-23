import React, { useEffect, useState } from "react";
import firebase from "./src/config/firebase";
import { StyleSheet, SafeAreaView, Text, View, Vibration, Image } from "react-native";
import CountDown from "react-native-countdown-component";
import { COLORS } from "./src/globals/colors";
import { STATUS } from "./src/globals/status";

import INIT_IMG from "./assets/traffic-lights.png";
import STOP_IMG from "./assets/stop.png";
import CROSS_IMG from "./assets/crossing.png";
import WARNING_IMG from "./assets/warning.png";

import { randomString } from "./src/utils/random";

const App = () => {
  const [statusInterval, setStatusInterval] = useState(20);
  const [statusColor, setStatusColor] = useState("");
  const [statusText, setStatusText] = useState(STATUS.NORMAL);
  const [statusCountdown, setStatusCountdown] = useState("initial");
  const [img, setImg] = useState(INIT_IMG);

  const ONE_SECOND_IN_MS = 1000;

  useEffect(() => {
    const iotRef = firebase.firebase.database().ref("Color");
    iotRef.on('value', (snapshot) => {
      const colors = snapshot.val();
      const list = [];
      for (let id in colors) {
        list.push(colors[id]);
      }
      setStatusColor(list[0]);
    })
  }, []);

  const changeColor = () => {
    switch (statusColor) {
      case COLORS.GREY:
        setStatusText(STATUS.GO);
        break;
      case "green":
        setImg(STOP_IMG);
        setStatusText(STATUS.STOP);
        setStatusInterval(10);
        Vibration.vibrate(10 * ONE_SECOND_IN_MS);
        break;
      case "yellow":
        setImg(CROSS_IMG);
        setStatusText(STATUS.GO);
        setStatusInterval(10);
        break;
      case "red":
        setImg(WARNING_IMG);
        setStatusText(STATUS.WARNING);
        setStatusInterval(10);
        Vibration.vibrate(10 * ONE_SECOND_IN_MS);
      default:
        break;
    }
  };
  useEffect(() => {
    const changeCountDown = () => {
      const randomStr = randomString();
      setStatusCountdown(randomStr);
    };
    changeCountDown();
  }, [statusColor]);
  return (
    <SafeAreaView style={{ borderColor: statusColor, ...styles.container }}>
      <View>
        <Image source={img} style={styles.img} />
      </View>
      <View>
        <Text style={styles.text}>{statusText}</Text>
        <CountDown
          until={statusInterval}
          id={statusCountdown}
          size={30}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "MIN.", s: "SEG." }}
          digitTxtStyle={{ color: COLORS.TEXT }}
          digitStyle={{ backgroundColor: "#E1E1E1" }}
          onFinish={() => changeColor()}
          onPress={() => changeColor()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 20,
  },
  text: {
    paddingVertical: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.TEXT,
  },
  img: {
    height: 200,
    width: 200,
  }
});

export default App;
