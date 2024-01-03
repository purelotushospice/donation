import Breadcrumb from "@/components/breadcrumb";
import Slider from "@/components/slider";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export default async function Page() {
  const { data } = await fetchData();
  // console.log("data  ", data.story.content.body[0]);
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
  return (
    <div className="">
      <div className="bg-gray-100">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank your for your donation
            </p>
            <p> Please check your email for receipt </p>
            <div className="py-10 text-center">
              <a
                href="/home"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                Donate again
              </a>
            </div>
          </div>
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
