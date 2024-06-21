import React from "react";
import { Card, CardContent } from "../ui/card";
import { Clock } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { api } from "~/trpc/server";
import Link from "next/link";

const Trial = async () => {
  const totalDays = 14;

  const user = await api.user.getUser();

  const createdAt = user?.createdAt;

  // const createdAt = "2024-06-19T06:49:13.430Z";

  const createdAtDate = createdAt ? new Date(createdAt) : null;
  const currentDate = new Date();
  const remainingDays = createdAtDate
    ? Math.ceil(
        (currentDate.getTime() - createdAtDate.getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  const getPercentage = (remainingDays: number, totalDays: number): number => {
    const percentage = (remainingDays / totalDays) * 100;
    return Math.round(percentage);
  };

  const userPlans = await api.userPlan.getPlanByUser();

  const isTrialClaimed = userPlans.some((plan) => plan.planId === '5');

  if (!isTrialClaimed) {
    api.userPlan.create({
      planId: "5",
      transactionId: "",
      startDate: new Date(),
      endDate: new Date(createdAtDate!.getTime() + 15 * 24 * 60 * 60 * 1000),
    });
  } else {
    console.log("isTrialClaimed", isTrialClaimed);
  }

  return (
    <Card>
      <CardContent className="flex  items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Clock size={30} />
          <div className="flex flex-col">
            <span>You are on a free trial of Professional Plan</span>
            <div className="flex items-center gap-4 whitespace-nowrap">
              <span>
                {totalDays - remainingDays} / {totalDays} days left
              </span>
              <Progress value={getPercentage(remainingDays, totalDays)} />
            </div>
          </div>
        </div>
        <Link href="/manage-billing">
          <Button>Manage Billing</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Trial;
