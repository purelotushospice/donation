"use client";

import Link from "next/link";
import Tab from "../tab";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const tabs = [
  { name: "Details", href: "#", current: true, disable: false },
  { name: "Updates", href: "#", current: false, disable: false },
  { name: "FAQ", href: "#", current: false, disable: true },
  { name: "Comments", href: "#", current: false, disable: true },
  { name: "Community", href: "#", current: false, disable: true },
];
const CampaignProfile = ({ data, generalContent }) => {
  const router = useRouter();

  console.log("campaign general:", data.story.content.cover_image.filename);
  let c_data = data?.story;
  const handleClick = (e) => {
    router.push("/checkout");
  };
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
              style={{ width: "45%" }}
            ></div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="font-bold text-2xl">
                {" "}
                {c_data?.content?.currency} 50,500
              </span>
              <span className="text-xs">
                received of {c_data?.content?.currency}
                {c_data?.content?.amount_target} goal
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl"> 254</span>
              <span className="text-xs">donors</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl"> 147</span>
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
            </div>
          </div>
        </div>
      </div>
      <Tab data={tabs} generalContent={generalContent} />
    </div>
  );
};

export default CampaignProfile;
