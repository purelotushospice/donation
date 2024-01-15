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

  function renderTab(data,details, generalData) {
    console.log("checkccc", generalData);
    return (
      <div className="space-y-1 richtext border border-gray-200 p-4 rounded-lg shadow-lg mb-10">
        <h3 className="font-bold text-lg ">{details?.title}</h3>
        <span className="text-xs text-gray-400">
          {dateFormat(details?.last_updated)}
        </span>
        <hr />
        <div
          className="my-3 w-full pt-2 "
          dangerouslySetInnerHTML={{
            __html: renderRichText(data),
          }}
        ></div>
      </div>
    );
  }

  function dateFormat(date, type) {
    let monthList = [
      { value: "01", name: "January" },
      { value: "02", name: "February" },
      { value: "03", name: "March" },
      { value: "04", name: "April" },
      { value: "05", name: "May" },
      { value: "06", name: "June" },
      { value: "07", name: "July" },
      { value: "08", name: "August" },
      { value: "09", name: "September" },
      { value: "10", name: "October" },
      { value: "11", name: "November" },
      { value: "12", name: "December" },
    ];
    if (date !== null && !!date) {
      const dateObj = date.split("-");
      console.log("dateObj: ", dateObj);
      let month = monthList.filter((data) => data.value == dateObj[1]);
      console.log("filter_month: ", month);

      let day = dateObj[2].split(" ");
      console.log(day);
      return `${month[0].name} ${day[0]}, ${dateObj[0]}`;
    }
  }

  return (
    <div>
      <div className="mt-4 sm:mt-10">
        <div className="flex justify-center bg-[#C2EBE8] border rounded-lg">
          <div className="">
            <div className="hidden ">
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
          <div className="">
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
                      tab.disable ? "" : "hover:border-gray-300",
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
            {!!generalContent?.content?.details &&
              generalContent?.content?.details.map((detail, index) =>
                renderTab(detail.content,detail, generalContent?.content?.details)
              )}
          </>
        ) : currentTab === 1 ? (
          <>
             {!!generalContent?.content?.updates &&
              generalContent?.content?.updates.map((updates, index) =>
                renderTab(updates.content,updates, generalContent?.content?.updates)
              )}

          
            {/* <h3 className="font-bold ">Story</h3> */}
          </>
        ) : null}
      </div>
    </div>
  );
}
