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
  const options = ["Google Meet", "Discord", "Zoom", "Teams"];

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/overview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetch error: ", error);
      return error;
    }
  };
  const data: Meeting[] = await getData();

  return (
    <div>
      <div className="flex w-full flex-col gap-10 px-4 py-6 sm:px-10 sm:py-20 md:px-20 lg:px-40">
        <div className="flex w-full flex-row gap-5 overflow-x-auto p-2">
          <FilterDropdown options={options} label="All Platforms" />
          <FilterDropdown options={options} label="Meeting Source" />
          <DatePickerWithRange />
          <FilterDropdown options={options} label="Recorded By" />
          <FilterDropdown options={options} label="Clients" />
        </div>
        <div className="flex flex-row gap-10">
          {data.map((meeting, id) => {
            return <OverviewCard key={id} data={meeting}></OverviewCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
