"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { countryNamesAndDialCodes } from "@/helper/countryCode";
const mailingLists = [
  { id: 1, title: "RM 50", value: 50 },
  { id: 2, title: "RM 200", value: 200 },
  { id: 3, title: "RM 500", value: 500 },
];
const paymentMethodList = [
  { id: 1, name: "Malaysia FPX (Consumer)", value: "fpx" },
  { id: 2, name: "Malaysia FPX (Business)", value: "fpx_b2b1" },
];
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

const myStates = [
  { name: "Johor" },
  { name: "Kedah" },
  { name: "Kelantan" },
  { name: "Kuala Lumpur" },
  { name: "Labuan" },
  { name: "Melaka" },
  { name: "Negeri Sembilan" },
  { name: "Pahang" },
  { name: "Penang" },
  { name: "Perak" },
  { name: "Perlis" },
  { name: "Putrajaya" },
  { name: "Sabah" },
  { name: "Sarawak" },
  { name: "Selangor" },
  { name: "Terengganu" },
];

const CheckoutV2 = ({ data, completed }) => {
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0]
  );
  const [selectedPayMethodLists, setSelectedPayMethodLists] = useState(
    paymentMethodList[0]
  );
  const [current, setCurrent] = useState(0);
  const [chooseAmount, setChooseAmount] = useState(50);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // Function to go back to the previous page
  const goBack = () => {
    router.back();
  };

  // State to manage the selected value
  const [selectedOption, setSelectedOption] = useState("fpx");

  // Function to handle radio button changes
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // const { id } = router.query;
  const params = useParams();

  console.log("params: ", params);
  const onSubmit = async (data) => {
    let obj = {
      amount: chooseAmount,
      name: data?.name,
      phone: data?.phone,
      email: data?.email,
      notes: data?.notes,
      paymentMethod: selectedOption,
      campaign_code: params?.id,
    };

    console.log("obj: ", obj);
    await fetch(`http://localhost:3001/payment/chip`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data2) => {
        window.location.replace(data2?.data?.checkout_url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [quantity, setQuantity] = useState(1);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
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

      <button onClick={() => goBack()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 32"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </button>

      {/* <div className="relative mx-auto grid max-w-4xl grid-cols-5 gap-x-10"> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto grid max-w-4xl grid-cols-5 gap-x-10"
      >
        <div className="col-span-3 px-4 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <h2
            id="contact-info-heading"
            className="text-3xl font-medium text-gray-900"
          >
            Please fill in the following
          </h2>
          <div className="mx-auto max-w-md lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Donation
              </h2>
              {/* <div className="mt-6 flex gap-4">
                {donationAmounts.map((item, index) => {
                  return 
                })}
              </div> */}
              <RadioGroup
                value={selectedMailingLists}
                onChange={setSelectedMailingLists}
              >
                <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900"></RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-y-2 sm:gap-x-4">
                  <div className="col-span-2 flex flex-col gap-y-2">
                    {mailingLists.map((mailingList) => (
                      <RadioGroup.Option
                        key={mailingList.id}
                        value={mailingList}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "border-teal-600 ring-2 ring-teal-600"
                              : "border-gray-300",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none "
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1 justify-center ml-4">
                              <span className="flex flex-col ">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {mailingList.title}
                                </RadioGroup.Label>
                              </span>
                            </span>
                            <CheckCircleIcon
                              className={classNames(
                                !checked ? "invisible" : "",
                                "h-5 w-5 text-teal-600"
                              )}
                              aria-hidden="true"
                            />
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-teal-600"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                  <div className="font-bold flex items-center">X</div>
                  <div className="-ml-24 mt-14 mb-14 border border-teal-600 rounded-lg flex justify-center items-center gap-6">
                    <button
                      className="font-bold"
                      type="button"
                      onClick={handleMinus}
                    >
                      -
                    </button>
                    <span className="text-xl">{quantity}</span>
                    <button
                      className="font-bold"
                      type="button"
                      onClick={handlePlus}
                    >
                      +
                    </button>
                  </div>
                </div>
              </RadioGroup>
              {/* <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Custom amount
                </label>
                <div className="mt-1">
                  <input
                    disabled
                    type="text"
                    id="customAmount"
                    name="customAmount"
                    {...register("customAmount")}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  />
                </div>
              </div> */}

              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Your Details
              </h2>
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name")}
                    placeholder="Full Name"
                    // autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    {...register("email")}
                    placeholder="Email address"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 ">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <select
                      id="countryCode"
                      name="countryCode"
                      className=" block w-full rounded-md border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
                      defaultValue={"Malaysia (+60)"}
                    >
                      {countryNamesAndDialCodes.map((cnt, idx) => (
                        <option key={idx}>
                          {cnt.name} {`(`}
                          {cnt.dial_code}
                          {`)`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      {...register("phone")}
                      placeholder="Phone no."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-1">
                  <select
                    id="nationality"
                    name="nationality"
                    className=" block w-full rounded-md border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
                    defaultValue={"Malaysia"}
                    {...register("nationality")}
                  >
                    {countryNamesAndDialCodes.map((cnt, idx) => (
                      <option key={idx}>{cnt.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-1">
                  {/* */}

                  {watch("nationality") === "Malaysia" ? (
                    <select
                      id="state"
                      name="state"
                      className=" block w-full rounded-md border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    >
                      {myStates.map((cnt, idx) => (
                        <option key={idx}>{cnt.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id="state"
                      name="state"
                      {...register("state")}
                      placeholder="State"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  )}
                </div>
              </div>
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Payment method
              </h2>
              <RadioGroup
                value={selectedPayMethodLists}
                onChange={setSelectedPayMethodLists}
              >
                <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {paymentMethodList.map((payMethod) => (
                    <RadioGroup.Option
                      key={payMethod.id}
                      value={payMethod}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "border-teal-600 ring-2 ring-teal-600"
                            : "border-gray-300",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col gap-y-2">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {payMethod.name}
                              </RadioGroup.Label>
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                <Image src="/fpx.png" width={50} height={50} />
                              </RadioGroup.Label>
                            </span>
                          </span>
                          <CheckCircleIcon
                            className={classNames(
                              !checked ? "invisible" : "",
                              "h-5 w-5 text-teal-600"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-teal-600"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900 mt-4"
              >
                Terms & Condition
              </h2>

              <fieldset className="mt-2">
                <legend className="sr-only">Keep update news</legend>
                <div className="space-y-5">
                  <div className="relative flex items-start border border-gray-200 p-2 rounded-md">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6 ">
                      <label htmlFor="comments" className=" text-gray-900">
                        Keep me updated with new donations like this via Pure
                        Lotus Hospice newsletters.
                      </label>
                    </div>
                  </div>
                  <div className="relative flex items-start border border-gray-200 p-2 rounded-md">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6 ">
                      <label htmlFor="comments" className=" text-gray-900">
                        I accept the Terms of Service for Donation.
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </section>
          </div>
        </div>
        <div className="col-span-2  rounded-xl border" style={{ minHeight: '500px' }}>
          <div>
            <Image src="/fund/photo.png" width={600} height={600} />
            <div className="p-2 flex flex-col">
              <h3 className="font-bold pt-4">
                Building Bricks for Home of Compassion
              </h3>
              <div className="flex justify-between">
                <span className="mt-4">Donation Amount </span>
                <span className="mt-4">100.00 </span>
              </div>
              <div className="flex justify-between">
                <span className="mt-2 mb-2">Bank Charges </span>{" "}
                <span className="mt-2">1.00 </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="mt-2 mb-2">Total Amount</span>{" "}
                <span className="mt-2 font-bold">RM 101.00 </span>
              </div>
            </div>
            <div></div>
          </div>

          <button
            type="submit"
            className=" w-full rounded-md border border-transparent bg-[#E9471F]  py-2 text-sm font-medium text-white shadow-sm hover:bg-[#ec7557] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last "
          >
            Continue
          </button>

          <span className="text-xs text-gray-400 flex justify-center pt-2">You won't be charged until the next step</span>
        </div>
      </form>
    </div>
  );
};

export default CheckoutV2;
