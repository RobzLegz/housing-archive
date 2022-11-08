import axios from "axios";
import { NextRouter } from "next/router";
import { Dispatch } from "redux";
import { SearchResult } from "../interfaces/searchResult";
import { setResults } from "../redux/slices/appSlice";
import { API_BASE } from "../styles/routes";

export const searchRequest = async ({
  query,
  dispatch,
  router,
}: {
  dispatch: Dispatch;
  query: string;
  router: NextRouter;
}) => {
  await axios
    .get(`${API_BASE}?search=${query}`)
    .then((res) => {
      const { data }: { data: SearchResult } = res;

      dispatch(setResults(data.records));

      router.push(
        {
          pathname: "/",
          query: { s: query },
        },
        undefined,
        { shallow: true }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
