import React from "react";
import Cart from "~/components/billing/Cart";
import Subscription from "~/components/billing/subscription";

const page = () => {
  return (
    <div>
      <h1 className="px-6 text-2xl font-bold">Manage Billing</h1>
      <div className="flex gap-6">
        <Subscription />
        <Cart />
      </div>
    </div>
  );
};

export default page;
