import Image from "next/image";
import React from "react";

const Landing = () => {
  return (
    <form className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="w-full h-full relative">
        <Image
          src="/images/splash-house.jpg"
          alt="Splash house background"
          fill
          draggable={false}
        />
      </div>

      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
        <div className="flex w-[95%] max-w-[800px] rounded-lg bg-white p-4 z-50">
          <input type="text" name="search" id="search" className="flex-1" />
        </div>
      </div>
    </form>
  );
};

export default Landing;
