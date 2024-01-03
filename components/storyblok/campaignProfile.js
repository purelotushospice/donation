"use client";

import Link from "next/link";
import Tab from "../tab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const tabs = [
  { name: "Details", href: "#", current: true },
  { name: "Updates", href: "#", current: false },
  { name: "FAQ", href: "#", current: false },
  { name: "Comments", href: "#", current: false },
  { name: "Community", href: "#", current: false },
];

const CampaignProfile = ({ data, generalContent }) => {
  // console.log("campaign general:", generalContent);
  let c_data = data?.story;
  return (
    <div className="">
      <div className="text-center">
        <h1 className="font-bold text-xl">{c_data?.content?.name}</h1>
        {/* <p>
     Join us in laying the foundation for compassionate care—brick by
     brick, we build a home for comfort and dignity in life final
     journey.
   </p> */}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <img src="/fund/photo.png" />
        </div>
        <div className="">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="font-bold text-2xl">
                {" "}
                {c_data?.content?.currency} 50,500
              </span>
              <span className="text-xs">
                received of {c_data?.content?.currency}
                {c_data?.content?.amount_target}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl"> 254</span>
              <span className="text-xs">donors</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl"> 147</span>
              <span className="text-xs">days to go</span>
            </div>

            <div className="space-y-2">
              <Link
                href={"/checkout"}
                className="bg-[#02AA9F] text-white font-semibold px-6 py-1.5 w-full"
              >
                {generalContent?.content.cta_primary}
              </Link>
              <button className="bg-[#C5C5C5] text-black font-semibold px-6 py-1.5 w-full">
                Remind me
              </button>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Tab data={tabs} generalContent={generalContent}/>
    </div>
  );
};

export default CampaignProfile;
