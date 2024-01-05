import Breadcrumb from "@/components/breadcrumb";
import Slider from "@/components/slider";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import useSWR from "swr";
import { fetcher } from "@/helper/common";
export default async function Page() {
  const { data } = await fetchData();
  // const { data: responseStat, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/campaign/C01`,
  //   fetcher
  // );

  // console.log("data  ", data.story.content.body[0]);
  const pages = [{ name: "Home", href: "/home", current: false }];
  let content_1 = [
    {
      img: "purelotus_43.png",
      code:"C01",
      title: "Building Bricks for Home of Compassion",
      tag: ["Home of Compassion"],
      targetAmount:250000,
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
  return (
    <div className="">
      <img src="purelotus.png" className="" />
      <div className="mx-6">
        <div className="mt-4">
          <Breadcrumb pages={pages} />

          <h1 className="font-bold text-3xl pt-4">Pure Lotus Hospice</h1>

          <div className="space-x-1 pt-4">
            <span className="inline-flex items-center rounded-md bg-[#F9BE39] px-2 py-1 text-xs font-bold text-black ring-1 ring-inset ring-gray-500/10">
              Hospice of Compassion
            </span>
            <span className="inline-flex items-center rounded-md bg-[#F9BE39] px-2 py-1 text-xs font-bold text-black-600 ring-1 ring-inset ring-gray-500/10">
              Home of Compassion
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <p>
              Pure Lotus Hospice of Compassion, established in 2001 by Venerable
              Lyan Shih, stands as the sole NGO In-Patient Hospice in Malaysia,
              offering comprehensive palliative care to impoverished, single,
              and caregiver-less end-stage cancer patients. Our holistic
              approach, blending medical, emotional, and spiritual support, aims
              to uphold dignity and comfort for every individual. Donations form
              the lifeblood of our mission, enabling us to provide
              round-the-clock care, create sustainable livelihoods, and extend
              support to those in need, irrespective of race or religion.
            </p>
            <p>
              Driven by our commitment to compassion and empowerment, we
              passionately channel contributions towards illuminating paths of
              hope for those facing their darkest times. Every donation received
              fuels our efforts to establish a training hub for the mentally
              challenged, provide spiritual solace integral to end-stage care,
              and extend bereavement support to families. Your generosity
              directly impacts lives, ensuring that our beacon of hope continues
              to shine brightly in the lives of those we serve.
            </p>
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-3xl pt-4 pb-4">Home of Compassion</h2>
            <Slider data={content_1} />
          </div>
          {/* 
          <div className="mt-8">
            <h2 className="font-bold text-3xl pt-4 pb-4">
              General Fundraising
            </h2>
            <Slider data={content_2} />
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-3xl pt-4 pb-4">
              Completed
            </h2>
            <Slider data={content_3} completed={true}/>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export async function fetchData() {
  let sbParams = { version: "draft" };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
