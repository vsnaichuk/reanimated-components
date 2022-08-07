import React from "react";
import { Platform, TextProps as RNTextProps, TextInput } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
} from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true });

interface IAnimatedTextProps {
  text: Animated.SharedValue<string>;
  style?: Animated.AnimateProps<RNTextProps>["style"];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AnimatedText({ text, style }: IAnimatedTextProps) {
  const inputRef = React.useRef<any>(null);

  if (Platform.OS === "web") {
    // For some reason, the worklet reaction evaluates upfront regardless of any
    // conditionals within it, causing Android to crash upon the invokation of `setNativeProps`.
    // We are going to break the rules of hooks here so it doesn't invoke `useAnimatedReaction`
    // for platforms outside of the web.

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedReaction(
      () => {
        return text.value;
      },
      (data, prevData) => {
        if (data !== prevData && inputRef.current) {
          inputRef.current.value = data;
        }
      }
    );
  }

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      // Here we use any because the text prop is not available in the type
    } as any;
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      ref={Platform.select({ web: inputRef })}
      value={text.value}
      style={style}
      animatedProps={animatedProps}
    />
  );
}
