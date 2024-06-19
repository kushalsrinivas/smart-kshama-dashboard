import React from "react";
import Cart from "~/components/billing/Cart";
import Subscription from "~/components/billing/Subscription";

const page = () => {
  return (
    <div>
      <h1 className="mb-4 mt-6 px-6 text-2xl font-bold">Manage Billing</h1>
      <div className="flex-col flex gap-3 md:flex-row">
        <Subscription />
        <Cart />
      </div>
    </div>
  );
};

export default page;
