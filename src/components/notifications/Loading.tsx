import React from "react";

interface LoadingProps {
  size?: 8 | 4 | 6 | 12;
}

const Loading: React.FC<LoadingProps> = ({ size = 8 }) => {
  return (
    <div
      className={`animate-spin ${
        size === 8 ? "w-8 h-8" : ""
      } border-t-2 border-white rounded-full`}
    />
  );
};

export default Loading;
