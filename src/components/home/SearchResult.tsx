import React from "react";
import { Estate } from "../../interfaces/estate";
import {
  BuildingOffice2Icon,
  HomeModernIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

interface EstateComponentProps {
  data: Estate;
}

const EstateComponent: React.FC<EstateComponentProps> = ({ data }) => {
  return (
    <div className="flex w-[95%] max-w-[800px] bg-white rounded-lg p-2 mb-4 shadow-xl">
      <div className="flex flex-col w-full">
        <h3 className="mb-2">{data.adrese}</h3>

        {data.novads &&
        data.novads.toLowerCase() !== "none" &&
        data.pilsēta &&
        data.pilsēta.toLowerCase() !== "none" ? (
          <div className="flex items-center">
            <MapPinIcon className="h-6 text-gray-400" />

            <p>{data.novads}</p>

            <p className="mx-1">|</p>

            <p>{data.pilsēta}</p>
          </div>
        ) : data.novads && data.novads.toLowerCase() !== "none" ? (
          <div className="flex items-center">
            <MapPinIcon className="h-6 text-gray-400" />

            <p>{data.novads}</p>
          </div>
        ) : data.pilsēta && data.pilsēta.toLowerCase() !== "none" ? (
          <div className="flex items-center">
            <MapPinIcon className="h-6 text-gray-400" />

            <p className="ml-1">{data.pilsēta}</p>
          </div>
        ) : null}

        <div className="flex items-end my-1">
          {data.objekts && data.objekts.toLowerCase() === "dzīvoklis" ? (
            <BuildingOffice2Icon className="h-6 text-gray-400" />
          ) : (
            <HomeModernIcon className="h-6 text-gray-400" />
          )}

          <strong className="ml-1">{data.objekts}</strong>

          <p className="mx-1">|</p>

          <p>{data.platība}</p>
        </div>

        <div className="w-full flex justify-start items-end pl-1">
          <strong className="text-[#45b2d7] mr-1 text-xl">
            {data.istabas}
          </strong>

          <p>Istabas</p>
        </div>

        <div className="w-full flex justify-between items-center border-b-2 border-dotted	border-gray-500">
          <strong className="">Cena:</strong>

          <div className="flex">
            <strong className="text-[#45b2d7] md:text-lg">{data.summa}</strong>

            <p className="mx-1">|</p>

            <p className="text-sm">({data["1m2"]} / m2)</p>
          </div>
        </div>

        <div className="w-full flex justify-end items-center text-gray-500 mt-1">
          <small>{data.datums}</small>
          <p className="mx-1">|</p>
          <small>{data.gads}</small>
        </div>
      </div>
    </div>
  );
};

export default EstateComponent;
