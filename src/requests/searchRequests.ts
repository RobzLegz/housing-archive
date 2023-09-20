import axios from "axios";
import { NextRouter } from "next/router";
import { Dispatch } from "redux";
import { SearchResult } from "../interfaces/searchResult";
import {
  loadMoreRdx,
  setCount,
  setLastReq,
  setLimit,
  setPage,
  setResults,
} from "../redux/slices/appSlice";
import { API_BASE } from "./routes";

export const searchRequest = async ({
  query,
  dispatch,
  router,
  city,
  county,
  rooms,
  year,
  month,
  limit,
  regNr,
}: {
  dispatch: Dispatch;
  query: string;
  city: string;
  county?: string;
  rooms: string;
  year: string;
  limit: number;
  month: string;
  regNr: string;
  router: NextRouter;
}) => {
  // {/* city, county, rooms, limit, year, month, registry_id */}

  let routerQuery: Record<string, string> = {};

  let route = `${API_BASE}?`;

  if (query) {
    route = `${route}search=${query}&`;
    routerQuery["q"] = query;
  }

  if (city) {
    route = `${route}city=${city}&`;
    routerQuery["city"] = city;
  }

  if (limit) {
    route = `${route}limit=${limit}&`;
    routerQuery["limit"] = String(limit);
  }

  if (county) {
    route = `${route}county=${county}&`;
    routerQuery["county"] = county;
  }

  if (rooms) {
    route = `${route}rooms=${rooms}&`;
    routerQuery["rooms"] = rooms;
  }

  if (year) {
    route = `${route}year=${year}&`;
    routerQuery["year"] = year;
  }

  if (month) {
    route = `${route}month=${month}&`;
    routerQuery["month"] = month;
  }

  if (regNr) {
    route = `${route}registry_id=${regNr}`;
    routerQuery["registry_id"] = regNr;
  }

  if (route.substring(route.length - 1, route.length) === "&") {
    route = route.substring(0, route.length - 1);
  }

  await axios
    .get(route)
    .then((res) => {
      const { data }: { data: SearchResult } = res;

      dispatch(setPage(res.data.page + 1));
      dispatch(setResults(data.records));
      dispatch(setCount(data.count));
      dispatch(setLastReq(route));
      dispatch(setLimit(data.limit));

      router.push(
        {
          pathname: "/",
          query: routerQuery,
        },
        undefined,
        { shallow: true }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadMore = async ({
  dispatch,
  url,
  page,
}: {
  dispatch: Dispatch;
  url: string;
  page: number;
}) => {
  const route = `${url}&page=${page}`;

  await axios
    .get(route)
    .then((res) => {
      const { data }: { data: SearchResult } = res;

      dispatch(setLimit(data.limit));
      dispatch(setPage(data.page + 1));
      dispatch(loadMoreRdx(data.records));
      dispatch(setCount(data.count));
    })
    .catch((err) => {
      console.log(err);
    });
};
