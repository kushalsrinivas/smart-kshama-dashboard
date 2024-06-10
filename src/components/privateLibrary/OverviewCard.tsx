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
import { Meeting } from "~/app/@types/meeting";

interface OverviewCardProps {
  data: Meeting;
}
const OverviewCard: React.FC<OverviewCardProps> = ({ data }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="h-40 w-full bg-slate-300"></div>
          <CardTitle>{JSON.parse(data.agenda)[0]}</CardTitle>
          <CardDescription>{data.created_at.substring(0, 10)}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-row justify-between gap-10">
          <Button>More Options</Button>
          <Link href={`/private-library/${data.uuid}/view`}>
            <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default OverviewCard;
