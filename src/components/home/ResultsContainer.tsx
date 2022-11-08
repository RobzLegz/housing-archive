import React from "react";
import { useSelector } from "react-redux";
import { IRef } from "../../interfaces/iRef";
import RefComponentModule from "../../modules/RefComponentModules";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import SearchResult from "./SearchResult";

const ResultsContainer: React.FC<IRef> = ({ iRef }) => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <RefComponentModule
      ref={iRef}
      className="w-full flex flex-col items-center justify-center mt-[10vh] z-10"
    >
      {appInfo.results?.map((result, i) => (
        <SearchResult data={result} key={i} />
      ))}
    </RefComponentModule>
  );
};

export default ResultsContainer;
