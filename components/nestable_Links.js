"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NestableLink = ({ blok }) => {
  console.log("data linkkkkk; ", blok);
  //   return (
  return (
    <a
      href={blok?.link?.url}
      target="_blank"
      className="m-6 sm:m-0 sm:mt-6 flex flex-col sm:gap-4 relative border rounded-3xl shadow-2xl shadow-black  sm:transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
    >
      <img
        src={blok?.thumbnail?.filename}
        className="object-cover h-full w-full rounded-3xl  brightness-75 hover:opacity-75 hover:cursor-pointer"
      />

      <div className="absolute bottom-6 left-3">
        <span className="flex flex-col text-xl font-bold text-white">
          <text>{blok?.title} </text>
          {/* <text>Dashboard</text> */}
        </span>
        <div className="pt-4">
          <a
            href={blok?.link?.url}
            target="_blank"
            className="bg-[#E9471F] hover:bg-[#e9471fc4] py-1.5 text-white p-2 border border-gray-200 px-6 rounded-lg font-bold"
          >
            Open
          </a>
        </div>
      </div>
    </a>
  );
  //   );
};

export default NestableLink;
