"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { useForm } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { countryNamesAndDialCodes, myStateList } from "@/helper/countryCode";
import useSWR from "swr";
import { fetcher } from "@/helper/common";

const donationOptions = [
  { id: 1, title: "RM 50", value: 50 },
  { id: 2, title: "RM 200", value: 200 },
  { id: 3, title: "RM 500", value: 500 },
];
const paymentMethodList = [
  { id: 1, name: "Malaysia FPX (Consumer)", value: "fpx" },
  { id: 2, name: "Malaysia FPX (Business)", value: "fpx_b2b1" },
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

const CheckoutV3 = ({ data, completed }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selecteddonationOptions, setSelecteddonationOptions] = useState(
    donationOptions[0]
  );
  const [selectedPayMethodLists, setSelectedPayMethodLists] = useState(
    paymentMethodList[0]
  );
  const [selectedOption, setSelectedOption] = useState("fpx");
  const [donationAmount, setDonationAmount] = useState(0);
  const [bankCharge, setBankCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [campaignStat, setCampaignStat] = useState(null);
  const [phoneNoError, setPhoneNumberError] = useState(false);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const params = useParams();
  useEffect(() => {
    setPhoneNumberError(false);
  }, [watch("phone")]);
  // const { data: responseStat, error } = useSWR(
  //   !!data?.story?.content
  //     ? `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/campaign/${data?.story?.content?.code}`
  //     : null,
  //   fetcher
  // );
  const onSubmit = async (data) => {
    if (data?.phone === "" && data?.phone === null) {
      // alert("Please enter your phone number");
      setPhoneNumberError(true);
    } else {
      setLoading(true);
      const countryCode = data.countryCode.split("(")[1].split(")")[0];
      let obj = {
        // amount: totalAmount,
        amount: data?.email === "pure-lotus@client.360hq.my" ? 1 : totalAmount,
        name: data?.name,
        phone: data?.phone,
        email: data?.email,
        paymentMethod: selectedPayMethodLists.value,
        campaign: campaignStat?.name,
        campaign_code: params?.id,
        newsUpdate: data?.newUpdate,
        countryCode: countryCode,
        country: data?.nationality,
        state:
          data?.nationality !== "Malaysia" ? data?.stateOutside : data?.state,
        bank_charge: bankCharge,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}payment/chip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((data2) => {
          setLoading(false);
          window.location.replace(data2?.data?.checkout_url);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });
    }
  };

  const fetchData = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/campaign/${params?.id}`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data2) => {
        setCampaignStat(data2?.data);
        if (!!data2?.data?.name) {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

    if (selecteddonationOptions.value !== undefined) {
      calculateDonation(selecteddonationOptions.value);
    }
  }, [selecteddonationOptions]);

  useEffect(() => {

    if (selecteddonationOptions.value !== undefined) {
      calculateDonation(selecteddonationOptions.value);
    }
  }, [quantity]);
  useEffect(() => {
    resetCalculation();
  }, [selecteddonationOptions]);

  useEffect(() => {
    calculateDonation();
  }, [selectedPayMethodLists]);

  function calculateDonation() {
    setDonationAmount(selecteddonationOptions.value * quantity);
    if (selectedPayMethodLists.value === "fpx") {
      setTotalAmount(selecteddonationOptions.value * quantity + 1);
      setBankCharge(1);
    } else {
      setTotalAmount(selecteddonationOptions.value * quantity + 2);
      setBankCharge(2);
    }
  }

  function resetCalculation() {
    setQuantity(1);
  }

  function formatedAmount(amount) {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16"
        >
          <div className="col-span-2">
            <div>
              <h2 className="text-lg sm:text-2xl font-medium text-gray-900">
                Your Donation
              </h2>

              <div className="mt-4">
                <RadioGroup
                  value={selecteddonationOptions}
                  onChange={setSelecteddonationOptions}
                >
                  <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900"></RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-0 gap-y-6 sm:grid-cols-4 sm:gap-y-2 sm:gap-x-4">
                    <div className="sm:col-span-2 flex flex-col gap-y-2">
                      {donationOptions.map((mailingList) => (
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
                    <div className="font-bold sm:flex sm:items-center text-center ">
                      X
                    </div>
                    <div className="sm:-ml-36 sm:mt-14 mb-8 sm:mb-14 border border-teal-600 rounded-lg flex justify-center items-center gap-6 mx-14 sm:mx-0">
                      <button
                        className="font-bold"
                        type="button"
                        onClick={handleMinus}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-xl">{quantity}</span>
                        <span className="text-sm text-gray-400 font-semibold">
                          no. of bricks
                        </span>
                      </div>

                      <button
                        className="font-bold"
                        type="button"
                        onClick={handlePlus}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className=" border-gray-200 sm:pt-10">
              <h2 className="text-lg sm:text-2xl font-medium text-gray-900">
                Your Details
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6  sm:gap-x-4">
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
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      required
                      {...register("email", {
                        validate: {
                          maxLength: (v) =>
                            v.length <= 50 ||
                            "The email should have at most 50 characters",
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address",
                        },
                      })}
                      placeholder="Email address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  {errors.email?.message && (
                    <small className="text-red-500 text-xs">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                <div className=" ">
                  <div className="grid grid-cols-4 sm:col-span-3 gap-2">
                    <div className="col-span-2 sm:col-span-2">
                      <select
                        id="countryCode"
                        name="countryCode"
                        className=" block w-full rounded-md border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
                        defaultValue={"Malaysia (+60)"}
                        {...register("countryCode")}
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
                    <div className="col-span-2 sm:col-span-2">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        {...register("phone")}
                        required
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.startsWith("0")) {
                            e.target.value = value.substring(1);
                          }
                        }}
                        placeholder="Phone no."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />{" "}
                      {phoneNoError && (
                        <span className="text-xs text-red-400">
                          Phone number required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" ">
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
                <div className="">
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
                        required
                        defaultValue={"Pulau Pinang"}
                        {...register("state")}
                      >
                        {myStateList.map((cnt, idx) => (
                          <option key={idx}>{cnt.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id="stateOutside"
                        name="stateOutside"
                        {...register("stateOutside")}
                        placeholder="State"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h2
              id="contact-info-heading"
              className="text-lg sm:text-2xl font-medium text-gray-900 mt-10 "
            >
              Payment method
            </h2>
            <h3 className="text-xs text-gray-400 mb-5">Powered by CHIP</h3>
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
                            checked ? "border-teal-600" : "border-transparent",
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

            {/* Term and Condition */}
            <h2
              id="contact-info-heading"
              className="text-lg sm:text-2xl font-medium text-gray-900 mt-10 mb-5"
            >
              Terms & Conditions
            </h2>

            <fieldset className="mt-2">
              <legend className="sr-only">Keep update news</legend>
              <div className="space-y-5">
                <div className="relative flex items-start border border-gray-200 p-2 rounded-md">
                  <div className="flex h-6 items-center">
                    <input
                      id="newUpdate"
                      aria-describedby="comments-description"
                      name="newUpdate"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                      {...register("newUpdate")}
                      defaultChecked
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
                      id="agree"
                      aria-describedby="comments-description"
                      name="agree"
                      type="checkbox"
                      {...register("agree", { required: true })}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6 ">
                    <label htmlFor="comments" className=" text-gray-900">
                      I accept the{" "}
                      <a
                        href="https://purelotushospice.com/donation-tos"
                        target="_blank"
                        className="underline"
                      >
                        Terms of Service for Donation.
                      </a>
                    </label>
                  </div>
                </div>
                {errors.agree && (
                  <span className="text-red-500 text-xs">
                    Please accept the Terms of Service.
                  </span>
                )}
              </div>
            </fieldset>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div>
                <Image src="/fund/photo.png" width={600} height={600} />
                <div className="p-2 flex flex-col">
                  <h3 className="font-bold pt-4">
                    Building Bricks for Home of Compassion
                  </h3>
                  <div className="flex justify-between">
                    <span className="mt-4">Donation Amount </span>
                    <span className="mt-4">
                      {formatedAmount(donationAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="mt-2 mb-2">Bank Charges </span>{" "}
                    <span className="mt-2">{formatedAmount(bankCharge)} </span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="mt-2 mb-2">Total Amount</span>{" "}
                    <span className="mt-2 font-bold">
                      RM {formatedAmount(totalAmount)}{" "}
                    </span>
                  </div>
                </div>
                <div></div>
              </div>
              <div className=" border-gray-200 px-4 pb-4 sm:px-4">
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="w-full rounded-md border border-transparent bg-[#E9471F] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ee7c5f] "
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CheckoutV3;
