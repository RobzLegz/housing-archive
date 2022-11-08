import axios from "axios";
import { Dispatch } from "redux";
import { SearchResult } from "../interfaces/searchResult";
import { setResults } from "../redux/slices/appSlice";
import { API_BASE } from "../styles/routes";

export const searchRequest = async ({
  query,
  dispatch,
}: {
  dispatch: Dispatch;
  query: string;
}) => {
  await axios
    .get(`${API_BASE}?search=${query}`)
    .then((res) => {
      const { data }: { data: SearchResult } = res;

      dispatch(setResults(data.records));
    })
    .catch((err) => {
      console.log(err);
    });
};
