import React from "react";
import { Estate } from "../../interfaces/estate";

interface SearchResultProps {
  data: Estate;
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  return (
    <div className="flex w-[95%] max-w-[800px] bg-white rounded-lg p-2 mb-4">
      <div className="flex flex-col">
        <p>{data.summa}</p>
        <p>{data.adrese}</p>
        <p>{data["1m2"]}</p>
        <p>{data.datums}</p>
        <p>{data.gads}</p>
        <p>{data.id}</p>
        <p>{data.istabas}</p>
        <p>{data.kadastrs}</p>
        <p>{data.novads}</p>
        <p>{data.objekts}</p>
        <p>{data.pilsēta}</p>
        <p>{data.platība}</p>
      </div>
    </div>
  );
};

export default SearchResult;
