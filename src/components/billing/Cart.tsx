import React from "react";
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

const Cart = () => {
  return (
    <div className="w-full h-full p-6 md:w-1/3">
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
              <TableHead className="whitespace-nowrap text-black">
                Amount(USD)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="whitespace-nowrap">
                Professional-USD-Monthly
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>28</TableCell>
              <TableCell>28</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="mt-4 font-bold">Total (USD) 28</p>
        <div className="tex-sm mt-2">
          <p>Added to unbilled charges and applicable taxes on activation</p>
        </div>
        <div className="mt-4 flex w-full flex-col gap-2">
          <span className="text-sm">
            To apply above changes effective today, please checkout.
          </span>
          <Button>Checkout</Button>
          <div className="mx-auto mt-1 flex items-center text-sm">
            <Lock size={20} /> Secure transaction
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
