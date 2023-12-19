import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export default async function Home() {
  const { data } = await fetchData();
  console.log("data  ", data.story.content.body[0]);
  return (
    <div>
      {/* <h1>Story: {data.story.name}</h1>
        <h1>Story: {data.story.content.body[0].headline}</h1> */}
      {/* <StoryblokComponent blok={data.story.content} /> */}
      <iframe
        width="800"
        height="600"
        frameborder="0"
        allow="clipboard-write;camera;geolocation;fullscreen"
        src="https://purelotus.budibase.app/embed/donation"
      ></iframe>
    </div>
  );
}

export async function fetchData() {
  let sbParams = { version: "draft" };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
