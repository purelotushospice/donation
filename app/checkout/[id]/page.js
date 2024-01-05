
import CheckoutV3 from "@/components/checkoutV3";
import {
    getStoryblokApi,
  
  } from "@storyblok/react/rsc";
  import StoryblokStory from "@storyblok/react/story";
  
  export default async function Home() {
    const { data } = await fetchData();
    // console.log("data  ", data.story.content.body[0]);
    return (
      <div>
       <CheckoutV3/>
      </div>
    );
  }
  
  export async function fetchData() {
    let sbParams = { version: "draft" };
  
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/home`, sbParams);
  }
  