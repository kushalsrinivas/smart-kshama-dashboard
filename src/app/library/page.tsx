import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import OverviewLayout from "~/components/privateLibrary/OverviewLayout";
import dynamic from 'next/dynamic';

// Dynamically import the DatePickerWithRange component
const DynamicDatePickerWithRange = dynamic(
  () => import('~/components/ui/datePicker').then((mod) => mod.DatePickerWithRange),
  { ssr: false }
);

const Page = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id;

  if (!session) {
    redirect("/api/auth/signin");
  }
  
  const startDate = '2024-05-04';
  const endDate = new Date().toISOString().split('T')[0]!;
  
  return (
    <div>
      <div className="flex w-full flex-col justify-center gap-10 px-4 py-6">
        <div className="flex w-full flex-row gap-5 overflow-x-auto p-2">
          <DynamicDatePickerWithRange />
        </div>
        <OverviewLayout
          startDate={startDate}
          endDate={endDate}
          userId={userId!}
        />
      </div>
    </div>
  );
};

export default Page;