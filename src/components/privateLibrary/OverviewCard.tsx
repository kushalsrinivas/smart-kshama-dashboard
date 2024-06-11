import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { type Meeting } from "~/@types/meeting";

interface OverviewCardProps {
  data: Meeting;
}
const OverviewCard: React.FC<OverviewCardProps> = ({ data }) => {
  return (
    <>
      <Card className="">
        <CardHeader>
          <div className="h-40 w-full bg-slate-300"></div>
          {/* <CardTitle>{JSON.parse(data.agenda)[0]}</CardTitle> */}
          <CardDescription>{data.created_at}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between gap-2 p-0 px-3 pb-3">
          <Button>More Options</Button>
          <Link href={`/library/${data.uuid}/view`}>
            <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default OverviewCard;
