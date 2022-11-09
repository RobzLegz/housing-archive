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
  city,
  county,
  rooms,
  year,
  month,
  regNr,
}: {
  dispatch: Dispatch;
  query: string;
  city: string;
  county?: string;
  rooms: string;
  year: string;
  month: string;
  regNr: string;
  router: NextRouter;
}) => {
  // {/* city, county, rooms, limit, year, month, registry_id */}

  let route = `${API_BASE}?`;

  if (query) {
    route = `${route}search=${query}&`;
  }

  if (city) {
    route = `${route}city=${city}&`;
  }

  if (county) {
    route = `${route}county=${county}&`;
  }

  if (rooms) {
    route = `${route}rooms=${rooms}&`;
  }

  if (year) {
    route = `${route}year=${year}&`;
  }

  if (month) {
    route = `${route}month=${month}&`;
  }

  if (regNr) {
    route = `${route}registry_id=${regNr}`;
  }

  if (route.substring(route.length - 1, route.length) === "&") {
    route = route.substring(0, route.length - 1);
  }

  await axios
    .get(route)
    .then((res) => {
      const { data }: { data: SearchResult } = res;

      dispatch(setResults(data.records));

      router.push(
        {
          pathname: "/",
          query: { q: query, city: city, county, rooms, year, month, regNr },
        },
        undefined,
        { shallow: true }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
