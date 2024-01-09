import { Inter } from "next/font/google";
import "./globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "../components/StoryblokProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title:"Pure Lotus Hospice | Checkout",
  icons: {
    icon: "/purelotus_fav.ico",
  },
};

storyblokInit({
  accessToken: process.env.STORYBLOK_API_KEY,
  use: [apiPlugin],
});
export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body>
          <Header className=""/>
          <div className="mx-auto sm:max-w-6xl sm:px-10 mb-20 pt-4 z-10">{children}</div>

          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}


