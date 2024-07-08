"use client";
import { useState, useEffect, FC, ReactNode } from "react";
import Image from "next/image";

interface TooltipIconProps {
  src?: string;
  alt?: string;
  tooltipText: string;
  height?: number;
  width?: number;
  icon?: ReactNode;
}

const TooltipIcon: FC<TooltipIconProps> = ({
  src,
  alt,
  tooltipText,
  height,
  width,
  icon,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowTooltip(false);
    };

    if (showTooltip) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTooltip]);

  const handleClick = () => {
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
      >
        {icon ? (
          <div className="text-2xl">{icon}</div>
        ) : (
          src &&
          alt &&
          height &&
          width && <Image src={src} alt={alt} height={height} width={width} />
        )}
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
