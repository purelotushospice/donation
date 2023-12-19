"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { useState } from "react";
export default function Tab({ data }) {
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
                    onClick={()=> handleCurrentTab(index)}
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
        {
            currentTab === 0 ? <>  <h3 className="font-bold ">Story</h3>
            <div className="space-y-1">
              <p>
                Cupidatat occaecat adipisicing reprehenderit qui consectetur et.
                Nisi aliqua aute mollit elit laboris cupidatat tempor eu eiusmod.
                Eiusmod. Esse amet veniam elit veniam laborum ad id aliqua et.
                Officia sunt nulla veniam nostrud nostrud consequat. Do labore
                exercitation eu pariatur. Do qui laborum proident eu reprehenderit
                consequat laboris nulla. In id sit nisi sint do reprehenderit
                occaecat.
              </p>
              <p>
                Ea non ullamco voluptate fugiat nulla Lorem aliquip eu. Nostrud
                mollit proident reprehenderit nulla ad. Nostrud labore et incididunt
                cillum. Aliquip cupidatat consectetur culpa reprehenderit dolor
                culpa sit non est. Eu anim ipsum nostrud adipisicing. Ad nostrud.
                Culpa ad cupidatat elit commodo. Ex qui ex culpa enim. Consectetur
                pariatur.
              </p>
              <p>
                Sit exercitation exercitation velit elit deserunt commodo.
                Reprehenderit. Laborum anim amet anim id amet. Minim sit nostrud
                exercitation veniam proident id ea cupidatat id. Ipsum dolore
                deserunt fugiat Lorem eu dolore est non deserunt. Sunt cillum duis
                ex dolor amet voluptate.s
              </p>
              <p>
                Enim adipisicing. Ea commodo laboris esse. Sunt in aute nostrud
                tempor sit esse sit Lorem nulla.
              </p>
            </div></> : null
        }
      
      </div>
    </div>
  );
}
