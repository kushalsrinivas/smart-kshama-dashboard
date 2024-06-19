import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Billing from "~/components/billing";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

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

export default page;
