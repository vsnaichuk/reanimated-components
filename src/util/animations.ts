// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { AnimatableValue, Animation } from "react-native-reanimated";
import Animated, { defineAnimation } from "react-native-reanimated";

interface PausableAnimation extends Animation<PausableAnimation> {
  lastTimestamp: number;
  elapsed: number;
}

export const withPause = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _nextAnimation: any,
  paused: Animated.SharedValue<boolean>
) => {
  "worklet";
  return defineAnimation<PausableAnimation>(_nextAnimation, () => {
    "worklet";
    const nextAnimation: PausableAnimation =
      typeof _nextAnimation === "function" ? _nextAnimation() : _nextAnimation;
    const onFrame = (state: PausableAnimation, now: number) => {
      const { lastTimestamp, elapsed } = state;
      if (paused.value) {
        state.elapsed = now - lastTimestamp;
        return false;
      }
      const dt = now - elapsed;
      // Upgrade should fix type errors
      const finished = nextAnimation.onFrame(nextAnimation, dt);
      state.current = nextAnimation.current;
      state.lastTimestamp = dt;
      return finished;
    };
    const onStart = (
      state: PausableAnimation,
      value: AnimatableValue,
      now: number,
      previousState: PausableAnimation
    ) => {
      state.lastTimestamp = now;
      state.elapsed = 0;
      state.current = 0;
      nextAnimation.onStart(nextAnimation, value, now, previousState);
    };
    const callback = (finished?: boolean): void => {
      if (nextAnimation.callback) {
        nextAnimation.callback(finished);
      }
    };
    return {
      onFrame,
      onStart,
      isHigherOrder: true,
      current: nextAnimation.current,
      callback,
      previousAnimation: null,
      startTime: 0,
      started: false,
      lastTimestamp: 0,
      elapsed: 0,
    };
  });
};

/**
 *  @summary Clamps a node with a lower and upper bound.
 *  @example
    clamp(-1, 0, 100); // 0
    clamp(1, 0, 100); // 1
    clamp(101, 0, 100); // 100
  * @worklet
  */
export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

/**
 * @summary Computes animation node rounded to precision.
 * @worklet
 */
export const round = (value: number, precision = 0) => {
  "worklet";
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
};

/**
 * @summary Type representing a vector
 * @example
   export interface Vector<T = number> {
    x: T;
    y: T;
  }
 */
export interface Vector<T = number> {
  x: T;
  y: T;
}

export interface PolarPoint {
  theta: number;
  radius: number;
}

/**
 * @worklet
 */
export const canvas2Cartesian = (v: Vector, center: Vector) => {
  "worklet";
  return {
    x: v.x - center.x,
    y: -1 * (v.y - center.y),
  };
};

/**
 * @worklet
 */
export const cartesian2Polar = (v: Vector) => {
  "worklet";
  return {
    theta: Math.atan2(v.y, v.x),
    radius: Math.sqrt(v.x ** 2 + v.y ** 2),
  };
};

/**
 * @worklet
 */
export const canvas2Polar = (v: Vector, center: Vector) => {
  "worklet";
  return cartesian2Polar(canvas2Cartesian(v, center));
};

/**
 * @worklet
 */
export const cartesian2Canvas = (v: Vector, center: Vector) => {
  "worklet";
  return {
    x: v.x + center.x,
    y: -1 * v.y + center.y,
  };
};

/**
 * @worklet
 */
export const polar2Cartesian = (p: PolarPoint) => {
  "worklet";
  return {
    x: p.radius * Math.cos(p.theta),
    y: p.radius * Math.sin(p.theta),
  };
};

/**
 * @worklet
 */
export const polar2Canvas = (p: PolarPoint, center: Vector) => {
  "worklet";
  return cartesian2Canvas(polar2Cartesian(p), center);
};

/**
 * @description Returns the coordinate of a cubic bezier curve. t is the length of the curve from 0 to 1.
 * cubicBezier(0, p0, p1, p2, p3) equals p0 and cubicBezier(1, p0, p1, p2, p3) equals p3.
 * p0 and p3 are respectively the starting and ending point of the curve. p1 and p2 are the control points.
 * @worklet
 */
export const cubicBezier = (
  t: number,
  from: number,
  c1: number,
  c2: number,
  to: number
) => {
  "worklet";
  const term = 1 - t;
  const a = 1 * term ** 3 * t ** 0 * from;
  const b = 3 * term ** 2 * t ** 1 * c1;
  const c = 3 * term ** 1 * t ** 2 * c2;
  const d = 1 * term ** 0 * t ** 3 * to;
  return a + b + c + d;
};
