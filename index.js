import React, { useRef, useEffect } from "react";

import { Text, View, StyleSheet, TextInput, Platform } from "react-native";

const Timer = ({ initialSeconds }) => {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const secondsRef = useRef(initialSeconds);
  useEffect(() => {
    const formatTime = (totalSeconds) => {
      const d = Math.floor(totalSeconds / (60 * 60 * 24));
      const h = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const m = Math.floor((totalSeconds % (60 * 60)) / 60);
      const s = totalSeconds % 60;

      // return `${days}d ${hours}h ${minutes}m ${seconds}s`;

      const dDisplay =
        d > 0
          ? d.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) + ";"
          : "00;";
      const hDisplay =
        h > 0
          ? h.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) + ";"
          : "00;";
      const mDisplay =
        m > 0
          ? m.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) + ";"
          : "00;";
      const sDisplay =
        s > 0
          ? s.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) + ";"
          : "00;";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    };

    const updateText = () => {
      const custom_time = formatTime(secondsRef.current).split(";");

      if (textRef.current) {
        textRef.current.setNativeProps({ text: custom_time[0] });
      }
      if (textRef1.current) {
        textRef1.current.setNativeProps({ text: custom_time[1] });
      }
      if (textRef2.current) {
        textRef2.current.setNativeProps({ text: custom_time[2] });
      }
      if (textRef3.current) {
        textRef3.current.setNativeProps({ text: custom_time[3] });
      }
    };

    const interval = setInterval(() => {
      secondsRef.current -= 1;
      if (secondsRef.current >= 0) {
        updateText();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.container1}>
        <TextInput
          editable={false}
          ref={textRef}
          style={styles.text}
        ></TextInput>
        <Text
          style={[styles.text1, { bottom: Platform.OS === "ios" ? 0 : 11 }]}
        >
          J
        </Text>
      </View>
      <View style={styles.container1}>
        <TextInput
          editable={false}
          ref={textRef1}
          style={styles.text}
        ></TextInput>
        <Text
          style={[styles.text1, { bottom: Platform.OS === "ios" ? 0 : 11 }]}
        >
          H
        </Text>
      </View>

      <View style={styles.container1}>
        <TextInput
          editable={false}
          ref={textRef2}
          style={styles.text}
        ></TextInput>
        <Text
          style={[styles.text1, { bottom: Platform.OS === "ios" ? 0 : 11 }]}
        >
          Min
        </Text>
      </View>

      <View style={styles.container1}>
        <TextInput
          editable={false}
          ref={textRef3}
          style={styles.text}
        ></TextInput>
        <Text
          style={[styles.text1, { bottom: Platform.OS === "ios" ? 0 : 11 }]}
        >
          Sec
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
  },
  container1: {
    justifyContent: "center",
    marginLeft: 6,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: 35,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 3,
    paddingVertical: 3,
  },
  text1: { fontWeight: "500", fontSize: 10, color: "#000000" },
});

export default Timer;
