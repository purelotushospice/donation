"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Our Causes", href: "/", disable: false },
  // { name: "Wall of Love", href: "#", disable: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="https://purelotushospice.com" target="_blank" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image height={50} width={50} src="/purelotus_logo.png" alt="" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              onClick={() => router.push(item.href)}
              disabled={item.disable ? true : false}
              key={item.name}
              href={item.href}
              className={classNames(
                item.disable ? " text-gray-300" : "text-gray-900",
                "text-lg font-semibold leading-6 "
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a
            href="https://app.donorcare.my/"
            target="_blank"
            className="rounded-2xl bg-[#02AA9F] px-5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#3c9c96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            DonorCARE
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between gap-x-6 pb-4">
            <a href="https://purelotushospice.com" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image height={50} width={50} src="/purelotus_logo.png" alt="" />

            </a>
            {/* <a
            href="http://donor.ticketcare.my/"
            target="_blank"
            className="rounded-2xl bg-[#02AA9F] px-5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#3c9c96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            DonorCARE
          </a> */}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <hr>
          </hr>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {/* <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
