import React, { type FC } from "react";
import { Card } from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";
import { type Plan } from ".";
import Link from "next/link";

const Cart: FC<Plan> = ({ selectedPlan, billingCycle, currency, price }) => {
  const links = [
    { link: "https://nowpayments.io/payment/?iid=5738819257", price: 14.99 },
    { link: "https://nowpayments.io/payment/?iid=5610552222", price: 49.99 },
    { link: "https://nowpayments.io/payment/?iid=5790124730", price: 120 },
    { link: "https://nowpayments.io/payment/?iid=4975768519", price: 408 },
  ];

  return (
    <div className="h-full w-full p-6 md:w-1/3">
      <Card className="p-2 sm:p-4">
        <h1 className="text-lg font-bold">Plan Upgrade Estimate (Pro-Rata)</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap text-black">
                Items
              </TableHead>
              <TableHead className="whitespace-nowrap text-black">
                Units
              </TableHead>
              <TableHead className="whitespace-nowrap text-black">
                Unit Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="whitespace-nowrap capitalize">
                {selectedPlan}-{currency}-{billingCycle}
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>{price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="mt-4 font-bold">Total (USD) {price}</p>
        <div className="tex-sm mt-2">
          <p>Added to unbilled charges and applicable taxes on activation</p>
        </div>
        <div className="mt-4 flex w-full flex-col gap-2">
          <span className="text-sm">
            To apply above changes effective today, please checkout.
          </span>
          {links.map((linkObj) =>
            linkObj.price === price ? (
              <>
                <Link key={linkObj.link} href={linkObj.link}>
                  <Button>Checkout</Button>
                </Link>
              </>
            ) : null,
          )}
          <div className="mx-auto mt-1 flex items-center text-sm">
            <Lock size={20} /> Secure transaction
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
