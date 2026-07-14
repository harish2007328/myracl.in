import React from "react";

interface ShapeProps {
  className?: string;
  color?: string;
  size?: string;
  strokeWidth?: number;
}

export const WobblyStar: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-12 h-12",
  strokeWidth = 8,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <path
      d="M 50,5 Q 50,45 5,50 Q 50,50 50,95 Q 50,50 95,50 Q 50,45 50,5 Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WobblyCircle: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-12 h-12",
  strokeWidth = 8,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <path
      d="M 50,10 C 20,10 10,35 15,65 C 20,95 85,95 85,55 C 85,15 45,15 35,25"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WobblySpiral: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-16 h-16",
  strokeWidth = 6,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <path
      d="M 10,50 C 10,15 80,10 80,45 C 80,80 25,85 25,55 C 25,35 65,35 65,50 C 65,65 40,65 45,55"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WobblyArrow: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-16 h-16",
  strokeWidth = 8,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <path
      d="M 15,85 C 30,60 50,40 85,25"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M 50,20 L 85,25 L 75,60"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WobblyHashtag: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-14 h-14",
  strokeWidth = 8,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <path d="M 30,10 C 25,40 25,70 30,90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 70,10 C 65,40 65,70 70,90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 10,35 C 40,30 70,30 90,35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 10,65 C 40,60 70,60 90,65" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const WobblySun: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-16 h-16",
  strokeWidth = 6,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <circle cx="50" cy="50" r="20" stroke={color} strokeWidth={strokeWidth} />
    <path d="M 50,10 L 50,22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 50,78 L 50,90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 10,50 L 22,50" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 78,50 L 90,50" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 22,22 L 31,31" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 69,69 L 78,78" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 78,22 L 69,31" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M 31,69 L 22,78" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const WobblyCrown: React.FC<ShapeProps> = ({
  className = "",
  color = "#AEFF02",
  size = "w-16 h-16",
  strokeWidth = 8,
}) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    className={`${size} ${className} pointer-events-none select-none`}
    overflow="visible"
  >
    <path
      d="M 10,70 L 15,30 L 35,50 L 50,20 L 65,50 L 85,30 L 90,70 Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
