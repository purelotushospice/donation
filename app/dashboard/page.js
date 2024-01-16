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

  let slug = "dashboard";
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft",
    cv: Math.random(),
  });

  const pages = [{ name: "Home", href: "/home", current: false }];

  return (
    <div>
      <StoryblokStory story={data?.story} />
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
