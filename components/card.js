"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { useRouter } from "next/router";

const Card = ({ data, completed }) => (
  // console.log(completed)
  <div
    onClick={() =>
      router.push("/cause/building-bricks-for-home-of-compassions")
    }
    className={classNames(
      completed ? "opacity-50" : "",
      "rounded-xl border border-gray-200 "
    )}
  >
    <div className="space-y-1">
      <div className="relative group block w-full aspect-w-4 aspect-h-3 rounded-t-lg bg-gray-100 overflow-hidden  ">
        <img
          src={data?.img}
          className="object-cover pointer-events-none group-hover:opacity-75"
        />
      </div>

      <div className="p-2 space-y-1">
        <h2 className="font-bold">{data?.title}</h2>
        <span className="inline-flex items-center rounded-2xl bg-[#F9BE39] px-2 py-1 text-xs font-bold text-black-600 ring-1 ring-inset ring-gray-500/10">
          {data?.tag}
        </span>
        <p className="text-sm">{data?.description}</p>
      </div>
    </div>
  </div>
);

export default Card;
