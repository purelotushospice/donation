"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Card = ({ data, completed, collPercentage }) => {
  return (
    <>
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
          <div className="">
            <div className="relative group block w-full aspect-w-4 aspect-h-3 rounded-t-lg bg-gray-100 overflow-hidden  ">
              <Image
                src={"/purelotus_photo_43.png"}
                className="object-cover pointer-events-none group-hover:opacity-75"
                width={600}
                height={400}
              />
            </div>
            <div className="w-full bg-gray-200 rounded-sm dark:bg-gray-300">
              <div
                className="bg-[#02AA9F] h-2.5 rounded-sm"
                style={{ width: `${collPercentage}%` }}
              ></div>
            </div>
            <div className="p-2 space-y-4">
              <h2 className="font-bold">{data?.title}</h2>
              <span className="inline-flex items-center rounded-2xl bg-[#F9BE39] px-2 py-1 text-xs font-bold text-black-600 ring-1 ring-inset ring-gray-500/10">
                {data?.tag}
              </span>
              <p className="text-sm">{data?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-10 p-6">
              <button
                className="border border-[#E9471F] p-2 rounded-3xl text-[#E9471F]"
                onClick={() =>
                  router.push("/causes/building-bricks-for-home-of-compassion")
                }
              >
                Read More
              </button>
              <button
                className="border border-[#E9471F] bg-[#E9471F] hover:bg-[#ee7c5f] text-white p-2 rounded-3xl"
                onClick={() => router.push(`/checkout/${data?.code}`)}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
