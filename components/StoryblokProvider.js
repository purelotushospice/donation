/** 1. Tag it as a client component */
"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
 /** Import your components */
import Page from "./Page";
import Teaser from "./Teaser";
import Feature from "./Feature";
import Grid from "./Grid";
import MetaTags from "./storyblok/metaTags";
import NestableLink from "./nestable_Links";
import ContentDashboard from "./content_Dashboard";
/** 2. Initialize it as usual */
const components = {
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    page: Page,
    nestable_MetaTags:MetaTags,
    nestable_Links:NestableLink,
    content_Dashboard:ContentDashboard
  };
storyblokInit({
  accessToken: process.env.STORYBLOK_API_KEY,
  use: [apiPlugin],
  components
});
 
export default function StoryblokProvider({ children }) {
  return children;
}