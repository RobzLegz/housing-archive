import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import SearchResult from "./SearchResult";
import { loadMore } from "../../requests/searchRequests";
import Loading from "../notifications/Loading";

const ResultsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (loading || !appInfo.lastReq) {
      return;
    }

    setLoading(true);

    await loadMore({
      dispatch,
      url: appInfo.lastReq,
      page: appInfo.page,
    });

    setLoading(false);
  };

  if (!appInfo.results) {
    return null;
  }

  return (
    <section className="w-full flex flex-col items-center justify-center my-[20vh] z-10">
      {appInfo.count && (
        <p className="text-center mb-4 text-black">{appInfo.count} rezultāti</p>
      )}

      {appInfo.results.map((result, i) => (
        <SearchResult data={result} key={i} />
      ))}

      {appInfo.count > appInfo.limit * appInfo.page && appInfo.lastReq ? (
        <button
          className="w-48 h-10 rounded-lg bg-[#45b2d7] hover:bg-[#0998c8] text-white mt-4 flex items-center justify-center"
          type="button"
          disabled={loading}
          onClick={handleSearch}
        >
          {loading ? <Loading /> : <p>Ielādēt vēl</p>}
        </button>
      ) : null}
    </section>
  );
};

export default ResultsContainer;
