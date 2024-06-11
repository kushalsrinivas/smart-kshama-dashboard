import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Meeting } from "~/@types/meeting";

interface OverviewCardProps {
  data: Meeting;
}
const OverviewCard: React.FC<OverviewCardProps> = ({ data }) => {

  console.log('sentData',data);
  
  return (
    <>
      <Card className="">
        <CardHeader>
          {data.host_image ? (
            <img src={data.host_image} alt="Host Image" />
          ) : (
            <div className="h-40 w-full bg-slate-300"></div>
          )}
          <CardTitle>{data.meetingId}</CardTitle>
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
