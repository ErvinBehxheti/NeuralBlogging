"use client";
import { useState, FC } from "react";
import Image from "next/image";

interface TooltipIconProps {
  src: string;
  alt: string;
  tooltipText: string;
  height: number;
  width: number;
}

const TooltipIcon: FC<TooltipIconProps> = ({
  src,
  alt,
  tooltipText,
  height,
  width,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Image src={src} alt={alt} height={height} width={width} />
      </div>
      {showTooltip && (
        <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default TooltipIcon;
