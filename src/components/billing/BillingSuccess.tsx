"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const BillingSuccess = () => {
  const query = useSearchParams();

  // const url = new URL("http://localhost:3000/manage-billing/payment-success?order_id=45922&amount=14&billingCycle=monthly&currency=usd&selectedPlan=pro&NP_id=5278096907");
  const orderId = query.get("order_id");
  const amount = query.get("amount");
  const billingCycle = query.get("billingCycle");
  const currency = query.get("currency");
  const selectedPlan = query.get("selectedPlan");
  const npId = query.get("NP_id");
  const router = useRouter();

  const addUserPlan = api.userPlan.create.useMutation();

  const validity =
    billingCycle === "monthly" ? 30 : billingCycle === "yearly" ? 365 : 0;

  const handleUserPlan = async () => {
    if (selectedPlan) {
      addUserPlan.mutate({
        planId: selectedPlan,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + validity)),
        transactionId: orderId!,
      });
    }
  };

  const transactions = api.transactions.createTransactions.useMutation({
    onSuccess: handleUserPlan,
    // onError: (error) => {
    //   router.push("/");
    // },
  });

  useEffect(() => {
    if (orderId && amount && billingCycle && currency && selectedPlan && npId) {
      transactions.mutate({
        orderId: orderId,
        amount: Number(amount),
        billingCycle: billingCycle,
        currency: currency,
        plan: selectedPlan,
        npId: npId,
        expiresAt: new Date(),
      });
    }
  }, [orderId, amount, billingCycle, currency, selectedPlan, npId]);

  const plansApi = api.userPlan.getPlanByUser.useQuery();
  const plans = plansApi.data;

  function getActiveDays() {
    if (plans) {
      const currentDate = new Date();
      const activePlans = plans.filter((plan) => plan.endDate! >= currentDate);
      const activeDays: Date[] = [];

      activePlans.forEach((plan) => {
        const startDate = new Date(plan.startDate);
        const endDate = new Date(plan.endDate!);

        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          activeDays.push(new Date(date));
        }
      });

      return activeDays;
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-4 md:p-12">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <h1 className="text-center text-2xl font-bold">
        Thank you for subscribing
      </h1>
      <Link href="/">
        <Button> Go to Home</Button>
      </Link>
    </div>
  );
};

export default BillingSuccess;
