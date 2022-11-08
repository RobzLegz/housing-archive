import React from "react";
import { useSelector } from "react-redux";
import { IRef } from "../../interfaces/iRef";
import RefComponentModule from "../../modules/RefComponentModules";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";

const ResultsContainer: React.FC<IRef> = ({ iRef }) => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <RefComponentModule
      ref={iRef}
      className="w-full flex flex-col items-center justify-center"
    >
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
    </RefComponentModule>
  );
};

export default ResultsContainer;
