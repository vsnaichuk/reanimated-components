import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';
import Svg, { Rect } from 'react-native-svg';

const BAR_WIDTH = 4;
const BAR_MARGIN = 1


export function Waveform({
  color,
  waveform,
}) {
  const { width } = useWindowDimensions();
  const offset = width / 2;
  const waveformWidth = waveform.width * (BAR_WIDTH + BAR_MARGIN) + offset
  const waveformHeight = waveform.height + BAR_MARGIN + (waveform.height * 0.61)

  const progress = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
  }), [])

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true)
  }, []);

  return (
    <Svg
      width={waveformWidth}
      height={waveformHeight}
    >
      {
        waveform.samples.map((sample, index) =>
          <Fragment key={index}>
            <Rect
              y={waveform.height - sample}
              x={index * (BAR_WIDTH + BAR_MARGIN) + offset}
              fill={color}
              height={sample}
              width={BAR_WIDTH}
            />
            <Rect
              y={waveform.height + BAR_MARGIN}
              x={index * (BAR_WIDTH + BAR_MARGIN) + offset}
              fill={color}
              height={sample}
              width={BAR_WIDTH}
            />
          </Fragment>
        )
      }
    </Svg>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});
