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

  if (!session) {
    redirect("/api/auth/signin");
  }
  const options = ["Google Meet", "Discord", "Zoom", "Teams"];

  return (
    <div>
      <div className="flex w-full flex-col gap-10 px-4 py-6 justify-center">
        <div className="flex w-full flex-row gap-5 overflow-x-auto p-2">
          <FilterDropdown options={options} label="All Platforms" />
          <FilterDropdown options={options} label="Meeting Source" />
          <DatePickerWithRange />
          <FilterDropdown options={options} label="Recorded By" />
          <FilterDropdown options={options} label="Clients" />
        </div>
        <OverviewLayout />
      </div>
    </div>
  );
};

export default page;
