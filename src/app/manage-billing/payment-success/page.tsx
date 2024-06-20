"use client";
import Image from "next/image";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

// export const metadata = {
//   title: "Smart Donna AI",
//   description:
//     "Automatically record, transcribe, and get actionable insights from your meetings.",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

const Page = () => {
  // const query = useSearchParams();

  // const orderId = query.get("order_id");
  // const npId = query.get("NP_id");

  // console.log("orderId", orderId);
  // console.log("npId", npId);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start gap-4 md:p-12">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <h1 className="text-center text-2xl font-bold">
          Thank you for subscribing
        </h1>
        <Link href="/">
          <Button> Go to Home</Button>
        </Link>
      </div>
    </>
  );
};

export default Page;

// http://localhost:3001/manage-billing/payment-success?order_id=34738&NP_id=4567658585
