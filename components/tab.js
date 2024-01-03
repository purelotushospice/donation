"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { useState } from "react";
import StoryblokClient from "storyblok-js-client";
import RichTextResolver from "storyblok-js-client/richTextResolver";

export default function Tab({ data, generalContent }) {
  console.log("generalContent in Tab: ", generalContent.content);

  let Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_API_KEY,
  });
  const renderRichText = (content) => {
    const resolver = new RichTextResolver();
    // return  resolver.render(content)
    return Storyblok.richTextResolver.render(content);
  };

  const [currentTab, setCurrentTab] = useState(0);
  const handleCurrentTab = (tabIndex) => {
    setCurrentTab(tabIndex);
  };
  return (
    <div>
      <div className="bg-[#C2EBE8]">
        <div className="flex justify-center">
          <div className="hidden sm:block ">
            <div className="">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {data.map((tab, index) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => handleCurrentTab(index)}
                    className={classNames(
                      currentTab === index
                        ? "border-black text-black font-bold"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <span>{tab.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {currentTab === 0 ? (
          <>
            {" "}
            {/* <h3 className="font-bold ">Story</h3> */}
            {!!generalContent?.content?.details && (
              <div className="space-y-1">
                <div
                  className="my-3 w-full"
                  dangerouslySetInnerHTML={{
                    __html: renderRichText(
                      generalContent?.content?.details[0].content
                    ),
                  }}
                ></div>
              </div>
            )}
          </>
        ) : currentTab === 1 ? (
          <>
            {!!generalContent?.content?.updates && (
              <div className="space-y-1">
                <div
                  className="my-3 w-full"
                  dangerouslySetInnerHTML={{
                    __html: renderRichText(
                      generalContent?.content?.updates[0].content
                    ),
                  }}
                ></div>
              </div>
            )}
            {/* <h3 className="font-bold ">Story</h3> */}
          </>
        ) : null}
      </div>
    </div>
  );
}
