import React from "react";
import { Card, CardContent } from "../ui/card";
import { Clock } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { api } from "~/trpc/server";
import Link from "next/link";

const Trial = async () => {
  const user = await api.user.getUser();

  const createdAt = user?.createdAt;

  // const createdAt = "2024-06-19T06:49:13.430Z";

  const createdAtDate = createdAt ? new Date(createdAt) : null;
  const currentDate = new Date();

  const getPercentage = (remainingDays: number, totalDays: number): number => {
    const percentage = (remainingDays / totalDays) * 100;
    return Math.round(percentage);
  };

  const userPlans = await api.userPlan.getPlanByUser();

  const activeUserPlans = userPlans.filter((plan) => {
    if (!plan.startDate || !plan.endDate) return false;
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  });

  const plans = {
    1: 30,
    2: 365,
    3: 30,
    4: 365,
    5: 14,
  } as Record<number, number>;

  const userValidPlanPeriod = activeUserPlans.map((plan) => {
    const planId = plan.planId;
    const day = plans[Number(planId)];
    return day;
  });

  const minStartDate = activeUserPlans.reduce((minDate, plan) => {
    const startDate = new Date(plan.startDate);
    return startDate < minDate ? startDate : minDate;
  }, new Date());

  const maxEndDate = activeUserPlans.reduce((maxDate, plan) => {
    if (!plan.endDate) return maxDate;
    const endDate = new Date(plan.endDate);
    return endDate > maxDate ? endDate : maxDate;
  }, new Date());

  const remainingDays = createdAtDate
    ? Math.ceil(
        (maxEndDate.getTime() - minStartDate.getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;

  const totalDays = userValidPlanPeriod
    .map((day) => day)
    .reduce((a, b) => a! + b!, 0);

  console.log(
    "userValidPlanPeriod",
    userValidPlanPeriod,
    "minStartDate",
    minStartDate,
    "maxEndDate",
    maxEndDate,
    "remainingDays",
    remainingDays,
    "totalDays",
    totalDays,
  );

  const percentage = getPercentage(remainingDays, totalDays!);

  return (
    <>
      <Card>
        <CardContent className="flex  items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Clock size={30} />
            <div className="flex flex-col">
              <span>You are on a free trial of Professional Plan</span>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <span>
                  {remainingDays} / {totalDays} days left
                </span>
                <Progress value={100 - percentage} />
              </div>
            </div>
          </div>
          <Link href="/manage-billing">
            <Button>Manage Billing</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default Trial;
