"use client";
import React, { useState } from "react";
import Subscription from "./Subscription";
import Cart from "./Cart";

export interface Plan {
  selectedPlan: string;
  billingCycle: string;
  currency: string;
  price: number;
}

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>({
    selectedPlan: "pro",
    billingCycle: "monthly",
    currency: "usd",
    price: 14,
  });

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  console.log("selectedPlan", selectedPlan);

  return (
    <div>
      <h1 className="mb-4 mt-6 px-6 text-2xl font-bold">Manage Billing</h1>
      <div className="flex flex-col gap-3 md:flex-row">
        <Subscription onSelectPlan={handleSelectPlan} />
        <Cart {...selectedPlan} />
      </div>
    </div>
  );
};

export default Billing;
