import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { searchRequest } from "../../requests/searchRequests";
import ResultsContainer from "./ResultsContainer";
import { useDispatch } from "react-redux";
import { isServer } from "../../lib/isServer";

const Landing = () => {
  const dispatch = useDispatch();

  const resultsRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const landingRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const router = useRouter();

  const { s: urlQ } = router.query;

  const [searchQ, setSearchQ] = useState(typeof urlQ !== "string" ? "" : urlQ);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (loading || !searchQ) {
      return;
    }

    setLoading(true);

    await searchRequest({ dispatch, query: searchQ, router });

    setLoading(false);

    landingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isServer && typeof urlQ === "string") {
      setSearchQ(urlQ);
      searchRequest({ dispatch, query: urlQ, router });
    }
  }, [urlQ]);

  return (
    <form className="w-full flex flex-col items-start justify-start relative">
      <div className="w-full h-[90vh] absolute" ref={landingRef}>
        <Image
          src="/images/splash-house.jpg"
          alt="Splash house background"
          className="rounded-r-full object-cover"
          draggable={false}
          fill
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center flex-col rounded-r-full bg-transparent-300 ">
          <div className="flex flex-col items-start justify-start w-[95%] max-w-[1000px] relative">
            <h1 className="text-left text-white mb-10 w-[500px]">
              Nekustamo īpašumu cenas katrā pilsētā
            </h1>
          </div>
        </div>
      </div>

      <div className="h-[56vh]"></div>

      <div className="w-full sticky top-6 flex items-center justify-center z-50">
        <div className="flex w-[95%] max-w-[1000px] rounded-full bg-transparent flex-col items-center justify-center shadow-2xl h-12 border-2 border-gray-300">
          <div className="w-full h-full flex">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Meklē dzīvokļus, īpašumus..."
              className="w-full h-full border-0 rounded-l-full outline-none px-5 text-lg"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />

            <button
              type="submit"
              onClick={handleSearch}
              disabled={!searchQ || loading}
              className="w-40 h-full rounded-r-full bg-[#45b2d7] hover:bg-[#0998c8] text-white"
            >
              Meklēt
            </button>
          </div>
        </div>
      </div>

      <ResultsContainer iRef={resultsRef} />
    </form>
  );
};

export default Landing;
