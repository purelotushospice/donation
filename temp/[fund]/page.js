
import { getStoryblokApi } from "@storyblok/react/rsc";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import Tab from "@/components/tab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function Page() {
  const { data } = await fetchData();
  // console.log("data  ", data.story.content.details);
  const pages = [{ name: "Home", href: "/home", current: false }];
  let content_1 = [
    {
      img: "purelotus_43.png",
      title: "Building Bricks for Home of Compassion",
      tag: ["Home of Compassion"],
      description: `With each brick laid, we're not just building walls but
      fostering a community of empathy and support. Together, let's
      build a home where compassion thrives and heals.`,
    },
  ];
  let content_2 = [
    {
      img: "Q1.png",
      title: "Emergency Medical Fund - Q1 2024",
      tag: ["Home of Compassion"],
      description: `Fuel our medical fund. Your donation directly aids compassionate support for those nearing the end, providing comfort and dignity in their final moments.`,
    },
    {
      img: "Q2.png",
      title: "Administration/Operations - Q1 2024",
      tag: ["Home of Compassion"],
      description: `Empower our cause for Q1 2024. Your donation fuels essential admin operations, maximizing our impact on those in need.`,
    },
  ];

  let content_3 = [
    {
      img: "Q1.png",
      title: "Emergency Medical Fund - Q1 2024",
      tag: ["Home of Compassion"],
      description: `Fuel our medical fund. Your donation directly aids compassionate support for those nearing the end, providing comfort and dignity in their final moments.`,
    },
    {
      img: "Q2.png",
      title: "Administration/Operations - Q1 2024",
      tag: ["Home of Compassion"],
      description: `Empower our cause for Q1 2024. Your donation fuels essential admin operations, maximizing our impact on those in need.`,
    },
  ];
  const tabs = [
    { name: "Details", href: "#", current: true },
    { name: "Updates", href: "#", current: false },
    { name: "FAQ", href: "#", current: false },
    { name: "Comments", href: "#", current: false },
    { name: "Community", href: "#", current: false },
  ];
  return (
    <div className="">
      <div className="text-center">
        <h1 className="font-bold text-xl">
          Building Bricks for Home of Compassion
        </h1>
        <p>
          Join us in laying the foundation for compassionate care—brick by
          brick, we build a home for comfort and dignity in life final
          journey.
        </p>
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
              <span className="font-bold text-2xl"> RM 50,500</span>
              <span className="text-xs">received of RM2,500,00 goal</span>
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
              <button className="bg-[#02AA9F] text-white font-semibold px-6 py-1.5 w-full">
                Donate to this campaign
              </button>
              <button className="bg-[#C5C5C5] text-black font-semibold px-6 py-1.5 w-full">
                Remind me
              </button>
            </div>
          </div>
        </div>

 
      </div>
      <Tab data={tabs}/>
    </div>
  );
}

export async function fetchData() {
  let sbParams = { version: "draft" };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
