import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { Waveform } from "./Waveform";

import waveform from "../../../assets/waveform.json";

export function SoundcloudAudioPlayer() {
  const progress = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({}), []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
  }, []);

  return (
    <View style={s.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../data/cover.jpg")}
        style={s.cover}
        resizeMode="cover"
      />

      <View style={s.progress}>
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal
          >
            <Waveform color="#FFFFFF" {...{ waveform }} />
            <View style={StyleSheet.absoluteFillObject}>
              <Waveform color="#EE742F" {...{ waveform }} />
            </View>
          </ScrollView>
        </View>
      </View>
      {/* <Animated.View style={[{}, animatedStyle]}></Animated.View> */}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  progress: {
    flex: 0.5,
    // backgroundColor: 'red',
  },
});
