"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Card = ({ data, completed,collPercentage }) => {
  console.log("data; ", data)
 return  <>
    {" "}
    <Link href={"/causes/building-bricks-for-home-of-compassion"}>
      <div
        onClick={() =>
          router.push("/cause/building-bricks-for-home-of-compassions")
        }
        className={classNames(
          completed ? "opacity-50" : "",
          "rounded-xl border border-gray-200 hover:cursor-pointer"
        )}
      >
        <div className="space-y-1">
          <div className="relative group block w-full aspect-w-4 aspect-h-3 rounded-t-lg bg-gray-100 overflow-hidden  ">
            <Image
              src={"/purelotus_43.png"}
              className="object-cover pointer-events-none group-hover:opacity-75"
              width={600}
              height={400}
            />
          </div>
          <div className="w-full bg-gray-200 rounded-sm h-2.5 dark:bg-gray-400">
            <div
              className="bg-[#02AA9F] h-2.5 rounded-sm"
              style={{ width: `${collPercentage}%` }}
            ></div>
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
    </Link>
  </>
};

export default Card;
