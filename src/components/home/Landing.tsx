import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Landing = () => {
  const router = useRouter();

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <form className="w-full flex flex-col items-start justify-start relative">
      <div className="w-full h-[90vh] relative">
        <Image
          src="/images/splash-house.jpg"
          alt="Splash house background"
          className="rounded-r-full"
          draggable={false}
          fill
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center flex-col rounded-r-full bg-transparent-300">
          <div className="flex flex-col items-start justify-start w-[95%] max-w-[1000px]">
            <h1 className="text-left text-white mb-10 w-[500px]">
              Nekustamo īpašumu cenas katrā pilsētā
            </h1>

            <div className="flex w-[95%] max-w-[1000px] rounded-full bg-transparent z-50 flex-col items-center justify-center shadow-2xl h-12">
              <div className="w-full h-full flex">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Meklē dzīvokļus, īpašumus..."
                  className="w-full h-full border-0 rounded-l-full outline-none px-5 text-lg"
                />

                <button
                  type="submit"
                  onClick={handleSearch}
                  className="w-40 h-full rounded-r-full bg-[#45b2d7] hover:bg-[#0998c8] text-white"
                >
                  Meklēt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Landing;
