"use client";
import Tab from "../tab";
import useSWR from "swr";
import { fetcher } from "helper/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const tabs = [
  { name: "Details", href: "#", current: true, disable: false },
  { name: "Updates", href: "#", current: false, disable: false },
  // { name: "FAQ", href: "#", current: false, disable: true },
  // { name: "Comments", href: "#", current: false, disable: true },
  // { name: "Community", href: "#", current: false, disable: true },
];
const CampaignProfile = ({ data, generalContent }) => {
  const [collPercentage, setcollPercentage] = useState(0);
  const router = useRouter();
  // console.log("campaign general:", data.story.content.cover_image.filename);
  console.log("campaign: ", data);
  let c_data = data?.story;
  const handleClick = (e) => {
    router.push(`/checkout/${data?.story?.content?.code}`);
  };

  const { data: responseStat, error } = useSWR(
    !!data?.story?.content
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/campaign/${data?.story?.content?.code}`
      : null,
    fetcher
  );
  console.log("responseStat: ", responseStat);

  function dateFormat(date, type) {
    let monthList = [
      { value: "01", name: "Jan" },
      { value: "02", name: "Feb  " },
      { value: "03", name: "Mar" },
      { value: "04", name: "Apr" },
      { value: "05", name: "May" },
      { value: "06", name: "June" },
      { value: "07", name: "July" },
      { value: "08", name: "Aug" },
      { value: "09", name: "Sept" },
      { value: "10", name: "Oct" },
      { value: "11", name: "Nov" },
      { value: "12", name: "Dec" },
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

  useEffect(() => {
    if (!!responseStat && !!c_data) {
      console.log();
      let perc =
        (responseStat.data.totalColl * 100) / c_data?.content?.amount_target;
      setcollPercentage(perc);
      console.log("percperc: ", perc);
    }
  }, [responseStat]);

  function calculateDaysLeft(endDateStr) {
    // Parse the end date string into a Date object
    const endDate = new Date(endDateStr);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = endDate - currentDate;

    // Convert the time difference to days
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft;
  }

  // Example usage with the given end date "2024-06-30 00:00"
  const endDateStr = "2024-06-30T00:00:00";
  const daysLeft = calculateDaysLeft(endDateStr);

  function formatedAmount(amount) {
    return amount.toLocaleString(undefined, {
      // minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }


  
  return (
    <div className="m-2 sm:m-0">
      <div className="text-center">
        <h1 className="font-bold text-3xl">{c_data?.content?.name}</h1>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div>
          <Image
            src={data.story.content.cover_image.filename}
            height={200}
            width={600}
          />
        </div>
        <div className="">
          <div className="w-full bg-gray-200 rounded-sm h-2.5 dark:bg-gray-400">
            <div
              className="bg-[#02AA9F] h-2.5 rounded-sm"
              style={{ width: `${collPercentage}%` }}
            ></div>
          </div>

          <div className="space-y-6 flex flex-col ">
            <div className="">
              <div className="flex flex-col">
                <span className="font-bold text-3xl pt-4">
                  {" "}
                  {c_data?.content?.currency}{" "}
                  {formatedAmount(parseInt(responseStat?.data?.totalColl))}
                </span>
                <span className="text-sm">
                  received of {c_data?.content?.currency}
                  {formatedAmount(
                    parseInt(c_data?.content?.amount_target)
                  )}{" "}
                  goal
                </span>
              </div>

              <div className="flex flex-col mt-4">
                <span className="font-bold text-3xl">
                  {" "}
                  {responseStat?.data?.totalDonors}
                </span>
                <span className="text-sm">donors</span>
              </div>

              <div className="flex flex-col mt-4">
                <span className="font-bold text-3xl">
                  {" "}
                  {calculateDaysLeft(c_data?.content?.date_end)}
                </span>
                <span className="text-sm">days to go</span>
              </div>
            </div>
            <div className="hidden sm:block space-y-2 sm:pt-20  text-center">
                <div className="w-full">
                  <button
                    onClick={() => handleClick()}
                    // href={"/checkout"}
                    className="bg-[#E9471F] text-white font-semibold px-6 py-2 w-full rounded-md"
                  >
                    {generalContent?.content.cta_primary}
                  </button>
                </div>
                <div></div>

                <div className="text-sm text-gray-500">
                  This campaign will end on{" "}
                  {dateFormat(data?.story?.content?.date_end)}
                </div>
              </div>
            <div className="block sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t rounded-t-3xl">
              <div className="space-y-2 sm:pt-20  text-center">
                <div className="w-full">
                  <button
                    onClick={() => handleClick()}
                    // href={"/checkout"}
                    className="bg-[#E9471F] text-white font-semibold px-6 py-2 w-full rounded-md"
                  >
                    {generalContent?.content.cta_primary}
                  </button>
                </div>
                <div></div>

                <div className="text-sm text-gray-500">
                  This campaign will end on{" "}
                  {dateFormat(data?.story?.content?.date_end)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tab data={tabs} generalContent={generalContent} />
    </div>
  );
};

export default CampaignProfile;
