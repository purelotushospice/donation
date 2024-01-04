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
  const [selectedOption, setSelectedOption] = useState("");

  const handleCurrentTab = (tabIndex) => {
    setCurrentTab(tabIndex);
  };
  const handleSelectChange = (event) => {
    // Update the state with the selected option value
    console.log("event: ", event.target.value);

    setSelectedOption(event.target.value);
    if (event.target.value === "Details") {
      setCurrentTab(0);
    } else if (event.target.value === "Updates") {
      setCurrentTab(1);
    }
  };

  return (
    <div>
      <div className="mt-4 sm:mt-10">
        <div className="flex justify-center sm:bg-[#C2EBE8]">
          <div className="">
            <div className=" sm:hidden ">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={data.find((tab) => tab.current).name}
                onChange={handleSelectChange}
              >
                {data.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="hidden sm:block ">
            <div className="">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {data.map((tab, index) => (
                  <button
                    disabled={tab.disable ? true : false}
                    key={tab.name}
                    href={tab.href}
                    onClick={() => handleCurrentTab(index)}
                    className={classNames(
                      currentTab === index
                        ? "border-black text-black font-bold"
                        : "border-transparent text-gray-500  hover:text-gray-700",
                      tab.disable? "":"hover:border-gray-300",
                      "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <span
                      className={classNames(tab.disable ? "text-gray-300" : "")}
                    >
                      {tab.name}
                    </span>
                  </button>
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
