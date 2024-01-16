"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black p-10 pb-10 md:pb-10">
      <div className="mx-auto max-w-5xl text-gray-300">
        <div className="md:grid grid-cols-2 gap-32">
          <div className="col-span-1">
            <img
            src="/purelotus_logo.png"
            alt="penanglogo"
            // width={120}
            // height={50}
          />
            <p className="pt-2">
              Pure Lotus Hospice of Compassion, founded in 2001, provides
              round-the-clock palliative care for end-stage cancer patients.
            </p>

            <p className="mt-6 flex gap-2">
              Need help with your donation?{" "}
              <div className="underline pb-4 hover:cursor-pointer">
                <a
                  target={"_blank"}
                  rel={"noreferrer"}
                  href={`mailto:donation@purelotushospice.com`}
                >
                  Write to us
                </a>
              </div>
            </p>
          </div>
          <div className="col-span-1 flex gap-6 sm:gap-10 pt-6">
            <div className="flex flex-col">
              <h2 className="font-bold mb-4">Donation</h2>
              <Link href={"https://donation.purelotushospice.com/"}>Our Causes</Link>
              <a href={"https://donor.ticketcare.my/"} target="_blank">DonoCARE</a>
              <a href={"https://purelotushospice.com/donation-tos"} target="_blank">Terms of Service</a>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold mb-4">Links</h2>
              <a
                target="_blank"
                href={
                  "https://purelotushospice.com/"
                }
              >
                Home
              </a>
              <a
                target="_blank"
                href={
                  "https://purelotushospice.com/services"
                }
              >
                Services
              </a>
              <a
                target="_blank"
                href={
                  "https://purelotushospice.com/about"
                }
              >
                About Us
              </a>
              <a
                target="_blank"
                href={
                  "https://purelotushospice.com/contact"
                }
              >
                Contact Us
              </a>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold mb-4">Admin</h2>
              <a target="_blank" href={"/dashboard"}>
                Dashboard
              </a>
              <a
                target="_blank"
                href={"https://portal.360hq.my/login/passwordless"}
              >
                Client Portal
              </a>
            
            </div>
          </div>
        </div>
        <div className="italic mt-6 text-center">
          © 2024 Penang Pure Lotus Society Hospice of Compassion. All Rights
          Reserved.
        </div>
        <div className="italic text-center text-xs  mb-6">
        Made with ♥️ by TicketCARE
        </div>
      </div>
    </div>
  );
}
