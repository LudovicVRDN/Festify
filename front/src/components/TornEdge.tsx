import React from "react";

type TornEdgeProps = {
  position: "top" | "bottom"| "right";
  height?: number;
};

const TornEdge = ({ position,  height = 60 }: TornEdgeProps) => {
   if (position === "right") {
    return (
      <div
        className="h-full w-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='200' viewBox='0 0 40 200'%3E%3Cpath  d='M0,0 C2,20 10,40 25,70 C38,95 20,115 32,145 C42,170 24,185 34,200 L0,200 Z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "40px auto",
        }}
      />
    )
  }
  const paths = {
    top: "M0,60 L0,42 C80,38 160,50 280,35 C380,22 460,40 580,28 C680,18 760,36 880,24 C980,14 1060,32 1180,22 C1280,14 1340,30 1400,26 L1400,60 Z",
    bottom: "M0,0 L0,18 C80,22 160,10 280,25 C380,38 460,20 580,32 C680,42 760,24 880,36 C980,46 1060,28 1180,38 C1280,46 1340,30 1400,34 L1400,0 Z",
    right: "M0,0 C2,80 10,160 25,280 C38,380 20,460 32,580 C42,680 24,760 36,880 C46,980 28,1060 38,1180 C46,1280 30,1340 34,1400 L0,1400 Z",
  }

  const isHorizontal = position === "top" || position === "bottom"

  return (
    <svg
      className={isHorizontal ? "block w-full" : "h-full w-full"}
      height={isHorizontal ? height : "100%"}
      width="100%" 
      viewBox={isHorizontal ? "0 0 1400 60" : "0 0 40 1400"}
      preserveAspectRatio="none"
    >
      <path d={paths[position]} />
    </svg>
  );
};

export default TornEdge;
