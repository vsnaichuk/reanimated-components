import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

const SIZE = 100

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`
}

export function Basics() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
    borderRadius: (progress.value * SIZE) / 2,
  }), [])

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true)
    scale.value = withRepeat(withSpring(1), -1, true)
  }, []);

  return (
    <View style={s.container}>
      <Animated.View style={[{ height: SIZE, width: SIZE, backgroundColor: 'blue' }, animatedStyle]}></Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
