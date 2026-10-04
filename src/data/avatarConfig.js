/**
 * Avatar Configuration
 * 
 * Configured specifically for Sahil Singh's HEAD-ONLY personal avatar.
 * Architecture supports effortlessly adding new angles / poses later.
 */

export const avatarConfig = {
  // Primary visual asset (transparent background, head-only)
  defaultPose: {
    id: "primary-neutral",
    name: "Frontal Neutral (Primary)",
    src: "/avatar_transparent.webp",
    fallbackSrc: "/avatar_transparent.png",
    alt: "Sahil Singh — Head-only 3D Avatar",
    aspectRatio: "1/1",
    centerOffset: { x: 0, y: 0 },
    lighting: {
      rimLight: "#ff2a4b",
      ambientGlow: "rgba(255, 42, 75, 0.28)",
      blurRadius: "60px"
    }
  },

  // Future poses/angles registry (prepared for user to plug in)
  alternativePoses: [
    // Future poses can simply be added here:
    // {
    //   id: "pose-focus",
    //   name: "Focused Angle",
    //   src: "/avatar_focus.png",
    //   alt: "Sahil Singh — Focused Angle"
    // }
  ],

  // Visual interaction parameters
  parallax: {
    maxTiltDegrees: 12,
    smoothing: 0.08,
    floatDuration: 5.5,
    floatDistance: 12
  }
};
