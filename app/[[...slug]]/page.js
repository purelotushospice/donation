import CampaignProfile from "@/components/storyblok/campaignProfile";
import MetaTags from "@/components/storyblok/metaTags";
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export const dynamicParams = true;

export default async function Page({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft",
    cv: Math.random(),
  });

  // console.log("kajsj: ",data.story.content.details);

  let c_Profile = "";
  if (
    !!data?.story?.content?.campaign &&
    data?.story?.content?.campaign !== ""
  ) {
    let { data: campaignProfile } = await storyblokApi.get(
      `cdn/stories/profile/campaign/${data?.story.slug}`,
      { version: "draft", cv: Math.random() }
    );
    c_Profile = campaignProfile;
  }

  return (
    <div>
      {/* <MetaTags data={data?.story?.content?.meta} /> */}
      <CampaignProfile data={c_Profile} generalContent={data?.story} />
    </div>
  );
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/", {
    version: "draft",
  });
  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }
    const slug = data.links[linkKey].slug;
    if (slug == "profile") {
      return;
    }
    // if (slug == "") {
    //   return;
    // }
    // if (slug == "/") {
    //   return;
    // }
    if (slug == "home") {
      return;
    }

    let splittedSlug = slug.split("/");

    if (
      (splittedSlug.length > 1 && splittedSlug[0] === "profile") ||
      // splittedSlug[0] === "" ||
      // splittedSlug[0] === "/" ||
      splittedSlug[0] === "home"
    ) {
      return;
    }
    paths.push({ slug: splittedSlug });
  });

  return paths;
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
  };
}
