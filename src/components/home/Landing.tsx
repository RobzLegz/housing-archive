import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { searchRequest } from "../../requests/searchRequests";
import ResultsContainer from "./ResultsContainer";
import { useDispatch } from "react-redux";
import cities from "../../data/cities.json";
import months from "../../data/months.json";
import { isServer } from "../../lib/isServer";
import useWindowSize from "../../hooks/useWindowSize";
import Loading from "../notifications/Loading";

const Landing = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const resultsRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const landingRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  const router = useRouter();

  const { q: urlQ } = router.query;

  const [searchQ, setSearchQ] = useState(typeof urlQ !== "string" ? "" : urlQ);
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [regNr, setRegNr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBg, setShowBg] = useState(false);

  const handleSearch = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (loading || (!searchQ && !city && !month && !year && !rooms && !regNr)) {
      return;
    }

    setLoading(true);

    await searchRequest({
      dispatch,
      query: searchQ,
      router,
      city,
      rooms,
      year,
      month,
      regNr,
    });

    setLoading(false);

    landingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const transitionNavBar = () => {
    if (!isServer && windowSize.height) {
      if (window.scrollY > windowSize.height * 0.56) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    }
  };

  useEffect(() => {
    if (!isServer) {
      window.addEventListener("scroll", transitionNavBar);
      return () => window.removeEventListener("scroll", transitionNavBar);
    }
  }, []);

  // useEffect(() => {
  //   if (!isServer && typeof urlQ === "string") {
  //     setSearchQ(urlQ);
  //     searchRequest({ dispatch, query: urlQ, router });
  //   }
  // }, [urlQ]);

  return (
    <form className="w-full flex flex-col items-start justify-start relative">
      <div className="w-full h-screen md:h-[90vh] absolute" ref={landingRef}>
        <Image
          src="/images/splash-house.jpg"
          alt="Splash house background"
          className="md:rounded-r-full object-cover"
          draggable={false}
          priority
          fill
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center flex-col md:rounded-r-full bg-transparent-300 ">
          <div className="w-[95%] max-w-[1000px] -mt-10 md:mt-0">
            <h1 className="text-left text-white mb-10 w-full max-w-[350px] md:max-w-[500px]">
              Nekustamo īpašumu cenas katrā pilsētā
            </h1>
          </div>
        </div>
      </div>

      <div className="h-[58vh] md:h-[56vh]"></div>

      <div
        className={`w-full sticky top-0 flex flex-col items-center justify-center z-50 py-2 transition-colors duration-300  ${
          showBg ? "bg-white border-b-2" : ""
        }`}
      >
        <div className="flex w-[95%] max-w-[1000px] rounded-full items-center justify-center shadow-2xl overflow-hidden h-10 md:h-12">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Meklē dzīvokļus, īpašumus..."
            className="w-full h-full rounded-l-full outline-none px-2 md:px-5 md:text-lg border-2 border-gray-300"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />

          <button
            type="submit"
            onClick={handleSearch}
            disabled={
              (!searchQ && !city && !month && !year && !rooms && !regNr) ||
              loading
            }
            className="w-24 md:w-40 h-full rounded-r-full bg-[#45b2d7] hover:bg-[#0998c8] disabled:hover:bg-[#45b2d7] text-white flex items-center justify-center"
          >
            {loading ? <Loading /> : <p>Meklēt</p>}
          </button>
        </div>

        <div className="grid items-center grid-cols-2 md:grid-cols-4 mt-2 w-[95%] max-w-[1000px] gap-2">
          <div className="flex flex-col bg-white pt-2 rounded-t-lg rounded-b-2xl overflow-hidden flex-1 shadow-lg">
            <label htmlFor="city" className="text-sm mb-1 ml-2">
              Pilsēta:
            </label>

            <select
              name="city"
              id="city"
              className="h-8 rounded-full bg-gray-100 px-2  border-2 border-gray-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="" />
              {cities.map((city, i) => (
                <option key={i} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col bg-white pt-2 rounded-t-lg rounded-b-2xl overflow-hidden flex-1 shadow-lg">
            <label htmlFor="rooms" className="text-sm mb-1 mx-2">
              Istabu skaits:
            </label>

            <select
              name="rooms"
              id="rooms"
              className="h-8 rounded-full bg-gray-100 px-2 border-2 border-gray-300"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
            >
              <option value="" />
              {Array.from(Array(7).keys()).map((roomCount, i) => (
                <option key={i} value={roomCount + 1}>
                  {roomCount + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col bg-white pt-2 rounded-t-lg rounded-b-2xl overflow-hidden flex-1 shadow-lg">
            <label htmlFor="year" className="text-sm mb-1 mx-2">
              Gads:
            </label>

            <select
              name="year"
              id="year"
              className="h-8 rounded-full bg-gray-100 px-2 border-2 border-gray-300"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" />

              {Array.from(Array(new Date().getFullYear() - 1938).keys()).map(
                (yearI, i) => (
                  <option key={i} value={yearI + 1940}>
                    {yearI + 1940}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col bg-white pt-2 rounded-t-lg rounded-b-2xl overflow-hidden flex-1 shadow-lg">
            <label htmlFor="month" className="text-sm mb-1 mx-2">
              Mēnesis:
            </label>

            <select
              name="month"
              id="month"
              className="h-8 rounded-full bg-gray-100 px-2 border-2 border-gray-300"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="" />

              {months.map((month, i) => (
                <option key={i} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex flex-col bg-white pt-2 rounded-t-lg rounded-b-2xl overflow-hidden flex-1 shadow-lg">
            <label htmlFor="reg_nr" className="text-sm mb-1 mx-2">
              Reģistrācijas Nr.:
            </label>

            <input
              type="text"
              name="reg_nr"
              id="reg_nr"
              value={regNr}
              onChange={(e) => setRegNr(e.target.value)}
              placeholder="Ievadiet Reg. Nr."
              className="h-8 rounded-full bg-gray-100 px-2 border-2 border-gray-300 text-sm outline-none"
            />
          </div> */}
        </div>
      </div>

      <ResultsContainer iRef={resultsRef} />
    </form>
  );
};

export default Landing;
