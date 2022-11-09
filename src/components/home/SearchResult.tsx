import React from "react";
import { Estate } from "../../interfaces/estate";
import {
  BuildingOffice2Icon,
  HomeModernIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

interface EstateComponentProps {
  data: Estate[];
}

const EstateComponent: React.FC<EstateComponentProps> = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  const estate = data[0];

  return (
    <div className="flex w-[95%] max-w-[800px] bg-white rounded-lg p-2 mb-4 shadow-xl">
      <div className="flex flex-col w-full">
        <h3 className="mb-2">{estate.adrese}</h3>

        {estate.novads &&
        estate.novads.toLowerCase() !== "none" &&
        estate.pilsēta &&
        estate.pilsēta.toLowerCase() !== "none" ? (
          <div className="flex items-center">
            <MapPinIcon className="h-6 text-gray-400" />

            <p>{estate.novads}</p>

            <p className="mx-1">|</p>

            <p>{estate.pilsēta}</p>
          </div>
        ) : estate.novads && estate.novads.toLowerCase() !== "none" ? (
          <div className="flex items-center">
            <MapPinIcon className="h-6 text-gray-400" />

            <p>{estate.novads}</p>
          </div>
        ) : estate.pilsēta && estate.pilsēta.toLowerCase() !== "none" ? (
          <div className="flex items-center">
            <MapPinIcon className="h-6 text-gray-400" />

            <p className="ml-1">{estate.pilsēta}</p>
          </div>
        ) : null}

        <div className="flex items-end my-1">
          {estate.objekts && estate.objekts.toLowerCase() === "dzīvoklis" ? (
            <BuildingOffice2Icon className="h-6 text-gray-400" />
          ) : (
            <HomeModernIcon className="h-6 text-gray-400" />
          )}

          <strong className="ml-1">{estate.objekts}</strong>

          <p className="mx-1">|</p>

          <p>{estate.platība}</p>
        </div>

        <div className="w-full flex justify-start items-end pl-1">
          <strong className="text-[#45b2d7] mr-1 text-xl">
            {estate.istabas}
          </strong>

          <p>Istabas</p>
        </div>

        <div className="w-full flex items-start justify-start flex-col">
          <strong className="border-b-2 border-dotted	border-gray-500 w-full mb-2">
            Cena:
          </strong>

          <div className="w-full flex flex-col">
            {data.map((es, i) => (
              <div key={i} className="flex items-center justify-between flex-row">
                <div className="flex">
                  <strong className="text-[#45b2d7] md:text-lg">
                    {es.summa}
                  </strong>

                  <p className="mx-1">|</p>

                  <p className="text-sm">({es["1m2"]} / m2)</p>
                </div>

                <div className="flex items-center text-gray-500">
                  <small>{es.datums}</small>
                  <p className="mx-1">|</p>
                  <small>{es.gads}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateComponent;
