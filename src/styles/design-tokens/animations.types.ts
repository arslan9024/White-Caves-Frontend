export interface AnimationPreset {
  name: string;
  duration: number;
  easing: string;
  delay?: number;
  fillMode?: string;
  iterationCount?: string | number;
  keyframes?: string;
}

export type AnimationName = string;

export interface TailwindAnimationMap {
  [key: string]: string;
}

