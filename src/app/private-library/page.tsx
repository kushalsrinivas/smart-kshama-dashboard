import { Link } from "lucide-react";
import React, { type FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DatePickerWithRange } from "~/components/ui/datePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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

const page = () => {
  const options = ["Google Meet", "Discord", "Zoom", "Teams"];
  const id = "1";
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
          <Card>
            <CardHeader>
              <div className="h-40 w-full bg-slate-300"></div>
              <CardTitle>Meeting agenda</CardTitle>
              <CardDescription>4 Jun 2024 | 01:37 AM</CardDescription>
              <CardDescription>Recorded By: KUSHAL SRINIVAS</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row justify-between gap-10">
              <Button>More Options</Button>
              <Link href={`/dashboard/privateLibrary/${id}/view`}>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="h-40 w-full bg-slate-300"></div>
              <CardTitle>Meeting agenda</CardTitle>
              <CardDescription>4 Jun 2024 | 01:37 AM</CardDescription>
              <CardDescription>Recorded By: KUSHAL SRINIVAS</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row justify-between gap-10">
              <Button>More Options</Button>
              <Link href={`/dashboard/privateLibrary/${id}/view`}>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
