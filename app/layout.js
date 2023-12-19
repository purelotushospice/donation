import { Inter } from 'next/font/google'
import './globals.css'
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "../components/StoryblokProvider";


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

storyblokInit({
  accessToken: "XtlygAGFb9OoujsiDLFLFwtt",
  use: [apiPlugin],
});
export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
    </StoryblokProvider>
  )
}
