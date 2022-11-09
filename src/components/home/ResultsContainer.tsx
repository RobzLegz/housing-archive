import React from "react";
import { useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import SearchResult from "./SearchResult";

const ResultsContainer: React.FC = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <section className="w-full flex flex-col items-center justify-center mt-[10vh] z-10">
      {appInfo.results?.map((result, i) => (
        <SearchResult data={result} key={i} />
      ))}
    </section>
  );
};

export default ResultsContainer;
