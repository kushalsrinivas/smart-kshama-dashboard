import React, { type FC } from "react";
import OverviewCard from "~/components/privateLibrary/OverviewCard";
import { Button } from "~/components/ui/button";
import { DatePickerWithRange } from "~/components/ui/datePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type Meeting } from "../../@types/meeting";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import OverviewLayout from "~/components/privateLibrary/OverviewLayout";

interface FilterDropdownProps {
  label: string;
  options: string[];
}

const FilterDropdown: FC<FilterDropdownProps> = ({ label, options }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant={"neutral"}>{label}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {options?.map((option) => (
        <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const page = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id;

  if (!session) {
    redirect("/api/auth/signin");
  }
  const options = ["Google Meet", "Discord", "Zoom", "Teams"];

  const startDate = '2024-05-04';
  const endDate = new Date().toISOString().split('T')[0]!; // Example output: '2023-09-29'
  
  return (
    <div>
      <div className="flex w-full flex-col justify-center gap-10 px-4 py-6">
        <div className="flex w-full flex-row gap-5 overflow-x-auto p-2">
          {/* <FilterDropdown options={options} label="All Platforms" />
          <FilterDropdown options={options} label="Meeting Source" /> */}
          <DatePickerWithRange onChange={(date) => console.log("date", date)} />
          {/* <FilterDropdown options={options} label="Recorded By" />
          <FilterDropdown options={options} label="Clients" /> */}
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

export default page;
