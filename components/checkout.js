"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { useState } from "react";
const products = [
  {
    id: 1,
    name: "Pure Lotus Hospice",
    href: "#",
    price: "RM70.00",
    color: "Moss",
    size: "5L",
    imageSrc: "purelotus_logo.png",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
];

const donationAmounts = [
  {
    name: "RM50",
    value: 50,
  },
  {
    name: "RM100",
    value: 100,
  },
  {
    name: "RM150",
    value: 150,
  },
];

const onSubmit = async (data) => {
  await fetch(`http://localhost:3001/payment/chip`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data2) => {
      window.location.replace(data2?.data?.checkout_url);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const Checkout = ({ data, completed }) => {
  // console.log(completed)
  const [current, setCurrent] = useState(0);
  const [chooseAmount, setChooseAmount] = useState(null);
  // console.log("chooseAmountchooseAmount: ",chooseAmount);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div
        className="fixed left-0 top-0 hidden h-full  bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed right-0 top-0 hidden h-full  bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-xl grid-cols-1 gap-x-16  lg:px-8 xl:gap-x-48">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-md lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Donate amount
              </h2>
              <div className="mt-6 flex gap-4">
                {donationAmounts.map((item, index) => {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent(index), setChooseAmount(item?.value);
                      }}
                      key={index}
                      className={classNames(
                        current === index
                          ? "bg-indigo-800 text-white"
                          : "bg-gray-200 text-gray-500",
                        "   font-bold py-2 px-10 border rounded"
                      )}
                    >
                      {item?.name}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Custom amount
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name")}
                    // autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Contact information
              </h2>
              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name")}
                    // autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    {...register("email")}
                    // autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    {...register("phone")}
                    // autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="notes"
                    name="notes"
                    {...register("notes")}
                    // autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Payment method
              </h2>
              <div className="flex mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="helper-radio"
                    aria-describedby="helper-radio-text"
                    type="radio"
                    value=""
                    checked
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
                  />
                </div>
                <div className="ms-2 text-sm">
                  <label
                    for="helper-radio"
                    className="font-medium text-gray-900 
                    "
                  >
                    FPX B2C
                  </label>
                  <p
                    id="helper-radio-text"
                    className="text-xs font-normal text-gray-500 "
                  >
                    Power by CHIP
                  </p>
                </div>
              </div>
              <div className="flex mt-2">
                <div className="flex items-center h-5">
                  <input
                    id="helper-radio"
                    aria-describedby="helper-radio-text"
                    type="radio"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>
                <div className="ms-2 text-sm">
                  <label
                    for="helper-radio"
                    className="font-medium text-gray-900 
                    "
                  >
                    FPX B2B1
                  </label>
                  <p
                    id="helper-radio-text"
                    className="text-xs font-normal text-gray-500 "
                  >
                    Power by CHIP
                  </p>
                </div>
              </div>
            </section>

            {/* <section aria-labelledby="payment-heading" className="mt-10">
          <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
            Payment details
          </h2>

          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
            <div className="col-span-3 sm:col-span-4">
              <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                Name on card
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  autoComplete="cc-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-3 sm:col-span-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                Card number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  autoComplete="cc-number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-3">
              <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                Expiration date (MM/YY)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  autoComplete="cc-exp"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  autoComplete="csc"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </section> */}

            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                Continue
              </button>
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                You wont be charged until the next step.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
