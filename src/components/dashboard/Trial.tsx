import React from "react";
import { Card, CardContent } from "../ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { api } from "~/trpc/server";
import Link from "next/link";

const Trial = async () => {
  const user = await api.user.getUser();

  const createdAt = user?.createdAt;
  const currentDate = new Date();

  function generateRandomNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const orderId = generateRandomNumber();

  // Assume trial length is 14 days
  const trialLength = 14;
  const trialEndDate = new Date(createdAt);
  trialEndDate.setDate(trialEndDate.getDate() + trialLength);

  await api.userPlan.createTrial({
    planId: "5",
    transactionId: orderId.toString(),
    startDate: new Date(createdAt),
    endDate: trialEndDate,
  });

  const userPlans = await api.userPlan.getPlanByUser();

  const activeUserPlans = userPlans.filter((plan) => {
    if (!plan.startDate || !plan.endDate) return false;
    const startDate = new Date(plan.startDate);
    const endDate = new Date(plan.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  });

  const isTrialExpired = currentDate > trialEndDate;

  const remainingDays = isTrialExpired ? 0 : Math.max(0, Math.ceil(
    (trialEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  ));

  const getPlanName = () => {
    const planIds = activeUserPlans.map((plan) => Number(plan.planId));
    if (planIds.includes(2) || planIds.includes(4)) return "Professional";
    if (planIds.includes(1) || planIds.includes(3)) return "Basic";
    return "Trial";
  };

  const getRemainingTimeText = () => {
    if (isTrialExpired) {
      return "Your trial has expired";
    } else if (remainingDays === 1) {
      return "Last day of your trial";
    } else {
      return `${remainingDays} days left`;
    }
  };

  const percentage = (remainingDays / trialLength) * 100;

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {isTrialExpired ? <AlertCircle size={30} color="orange" /> : <Clock size={30} />}
          <div className="flex flex-col">
            <span>You are on a {getPlanName()} Plan</span>
            <div className="flex items-center gap-4 whitespace-nowrap">
              <span>{getRemainingTimeText()}</span>
              {!isTrialExpired && (
                <Progress value={percentage} className="w-24" />
              )}
            </div>
          </div>
        </div>
        <Link href="/manage-billing">
          <Button>{isTrialExpired ? "Upgrade Now" : "Manage Billing"}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Trial;