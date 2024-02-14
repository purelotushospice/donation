import Breadcrumb from "@/components/breadcrumb";
import Slider from "@/components/slider";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";
import useSWR from "swr";
import { fetcher } from "@/helper/common";
import StoryblokClient from "storyblok-js-client";
import RichTextResolver from "storyblok-js-client/richTextResolver";

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_API_KEY,
});
const renderRichText = (content) => {
  const resolver = new RichTextResolver();
  // return  resolver.render(content)
  return Storyblok.richTextResolver.render(content);
};

// export const metadata = {
//   icons: {
//     icon: 'purelotus_logo.png',
//   },
// };

export default async function Page() {
  // const { data } = await fetchData();
  // const { data: responseStat, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/campaign/C01`,
  //   fetcher
  // );

  let slug = "home";
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft",
    cv: Math.random(),
  });


  // console.log("data  ", data.story.content.body[0]);
  const pages = [{ name: "Home", href: "/home", current: false }];
  let content_1 = [
    {
      img: "purelotus_43.png",
      code: "C01",
      title: "Building Bricks for Home of Compassion",
      tag: ["Home of Compassion"],
      targetAmount: 250000,
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

  let contentHeader = data?.story?.content.header[0];
  return (
    <div className="">
      <img src="purelotus.png" className="" />
      <div className="mx-6">
        <div className="mt-4">
          <Breadcrumb pages={pages} />

          <h1 className="font-bold text-3xl pt-4">{contentHeader?.title}</h1>

          <div className="space-x-1 pt-4">
            <span className="inline-flex items-center rounded-md bg-[#F9BE39] px-2 py-1 text-xs font-bold text-black ring-1 ring-inset ring-gray-500/10">
              Hospice of Compassion
            </span>
            <span className="inline-flex items-center rounded-md bg-[#F9BE39] px-2 py-1 text-xs font-bold text-black-600 ring-1 ring-inset ring-gray-500/10">
              Home of Compassion
            </span>
          </div>

          {/* <div className="space-y-4 pt-2">
            <div
              className="my-3 w-full pt-2 "
              dangerouslySetInnerHTML={{
                __html: renderRichText(contentHeader?.introduction),
              }}
            ></div>
          </div> */}

          <div className="space-y-1 richtext ">
            <div
              className="my-3 w-full pt-2 "
              dangerouslySetInnerHTML={{
                __html: renderRichText(contentHeader?.introduction),
              }}
            ></div>
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

export async function generateMetadata({ params, searchParams }, parent) {
  let slug = params.slug ? params.slug.join("/") : "home";
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft",
    cv: Math.random(),
  });
  return {
    title: !!data?.story?.content?.meta
      ? data?.story?.content?.meta[0]?.meta_title
      : "",
    description: !!data?.story?.content?.meta
      ? data?.story?.content?.meta[0]?.meta_description
      : "",
    openGraph: {
      images: !!data?.story?.content?.meta
        ? data?.story?.content?.meta[0]?.meta_image?.filename
        : "",
    },
    icons: {
      icon: "/purelotus_fav.ico",
    },
  };
}
