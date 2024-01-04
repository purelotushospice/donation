"use client";
import Tab from "../tab";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "helper/common";
import { useEffect, useState } from "react";
const tabs = [
  { name: "Details", href: "#", current: true, disable: false },
  { name: "Updates", href: "#", current: false, disable: false },
  { name: "FAQ", href: "#", current: false, disable: true },
  { name: "Comments", href: "#", current: false, disable: true },
  { name: "Community", href: "#", current: false, disable: true },
];
const CampaignProfile = ({ data, generalContent }) => {
  const [collPercentage, setcollPercentage] = useState(0);
  const router = useRouter();
  // console.log("campaign general:", data.story.content.cover_image.filename);
  console.log("campaign: ", data);
  let c_data = data?.story;
  const handleClick = (e) => {
    router.push("/checkout");
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
  
  console.log(`Days left until ${endDateStr}: ${daysLeft}`);
  return (
    <div className="m-2 sm:m-0">
      <div className="text-center">
        <h1 className="font-bold text-xl">{c_data?.content?.name}</h1>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div>
          <img src={data.story.content.cover_image.filename} />
        </div>
        <div className="">
          <div className="w-full bg-gray-200 rounded-sm h-2.5 dark:bg-gray-400">
            <div
              className="bg-[#02AA9F] h-2.5 rounded-sm"
              style={{ width: collPercentage }}
            ></div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="font-bold text-2xl">
                {" "}
                {c_data?.content?.currency} {responseStat?.data?.totalColl}
              </span>
              <span className="text-xs">
                received of {c_data?.content?.currency}
                {c_data?.content?.amount_target} goal
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl">
                {" "}
                {responseStat?.data?.totalDonors}
              </span>
              <span className="text-xs">donors</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl"> {calculateDaysLeft(c_data?.content?.date_end)}</span>
              <span className="text-xs">days to go</span>
            </div>

            <div className="space-y-4 pt-2 text-center">
              <div className="w-full">
                <button
                  onClick={() => handleClick()}
                  href={"/checkout"}
                  className="bg-[#02AA9F] text-white font-semibold px-6 py-2 w-full rounded-md"
                >
                  {generalContent?.content.cta_primary}
                </button>
              </div>
              <div></div>
              <button className="bg-gray-100 text-black font-semibold px-6 py-2 w-full rounded-md flex justify-center gap-2 text-center border border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.30722 5.74121C8.61499 5.54207 8.72361 5.12568 8.52447 4.81792C8.32533 4.51016 7.90894 4.40154 7.60118 4.60068C5.79081 5.7231 4.43304 7.44295 3.78131 9.47056C3.67268 9.81453 3.85372 10.1947 4.21579 10.3214C4.28821 10.3395 4.36062 10.3576 4.41494 10.3576C4.70459 10.3576 4.95805 10.1766 5.04856 9.88695C5.60978 8.1671 6.76841 6.6826 8.30722 5.74121Z"
                    fill="black"
                  />
                  <path
                    d="M20.9074 9.47056C20.2556 7.44295 18.8978 5.7231 17.0694 4.60068C16.7616 4.40154 16.3452 4.51016 16.1461 4.81792C15.9469 5.12568 16.0556 5.54207 16.3633 5.74121C17.9202 6.7007 19.0789 8.1671 19.6401 9.88695C19.7306 10.1766 20.0022 10.3576 20.2737 10.3576C20.3461 10.3576 20.4186 10.3395 20.4729 10.3214C20.8349 10.1947 21.016 9.81453 20.9074 9.47056Z"
                    fill="black"
                  />
                  <path
                    d="M12.3443 6.17569C8.97703 6.17569 6.26147 8.90934 6.26147 12.2585C6.26147 13.8879 6.91321 15.3543 7.94512 16.4586L6.44251 18.4319C6.22527 18.7215 6.27958 19.1379 6.56924 19.3733C6.67786 19.4638 6.82269 19.5 6.96752 19.5C7.16666 19.5 7.3658 19.4095 7.51063 19.2284L8.95892 17.3094C9.91842 17.9612 11.0771 18.3414 12.3262 18.3414C13.5754 18.3414 14.734 17.9612 15.7116 17.3094L17.1599 19.2284C17.3771 19.5181 17.8116 19.5905 18.1013 19.3552C18.3909 19.1379 18.4452 18.7034 18.228 18.4138L16.7254 16.4405C17.7754 15.3543 18.409 13.8698 18.409 12.2404C18.4271 8.90934 15.6935 6.17569 12.3443 6.17569ZM7.58304 12.2585C7.58304 9.6516 9.71928 7.51536 12.3443 7.51536C14.9693 7.51536 17.0875 9.6516 17.0875 12.2585C17.0875 14.8836 14.9512 17.0017 12.3443 17.0017C9.73738 17.0017 7.58304 14.8836 7.58304 12.2585Z"
                    fill="black"
                  />
                  <path
                    d="M14.2814 11.5887H12.996V9.68781C12.996 9.32574 12.6883 9.01797 12.3262 9.01797C11.9641 9.01797 11.6564 9.32574 11.6564 9.68781V12.2766C11.6564 12.6387 11.9641 12.9465 12.3262 12.9465H14.2814C14.6435 12.9465 14.9512 12.6387 14.9512 12.2766C14.9512 11.9146 14.6616 11.5887 14.2814 11.5887Z"
                    fill="black"
                  />
                </svg>{" "}
                Remind me
              </button>

              <div className="text-sm text-gray-500">
                This campaign will end on{" "}
                {dateFormat(data?.story?.content?.date_end)}
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
