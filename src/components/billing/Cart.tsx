import React, { type FC, useState } from "react";
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
import { useRouter } from "next/navigation";

const Cart: FC<Plan> = ({
  id: planId,
  selectedPlan,
  billingCycle,
  currency,
  price,
}) => {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const router = useRouter();

  function generateRandomNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const fetchInvoice = async (inputPrice: number) => {
    const orderId = generateRandomNumber();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetch("https://api.nowpayments.io/v1/invoice", {
        method: "POST",
        headers: {
          "x-api-key": "A4G6FB1-9WYMRQW-N80WYS0-KNDQT3X",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // price_amount: inputPrice,
          price_amount: 0.35,
          price_currency: currency,
          // pay_currency: "ETHBASE",
          order_id: orderId,
          order_description: `${selectedPlan}-${currency}-${billingCycle}`,
          ipn_callback_url: `${window.location.href}`,
          success_url: `${window.location.href}/payment-success?order_id=${orderId}&amount=${inputPrice}&billingCycle=${billingCycle}&currency=${currency}&planId=${planId}`,
          cancel_url: `${window.location.href}/manage-billing`,
        }),
      });
      const data = await response.json();
      setInvoiceId(data.id as string);
      setInvoiceUrl(data.invoice_url as string);
      setIsLoading(false);
      console.log(
        `Invoice ID: ${invoiceId}, Order ID: ${orderId}, Invoice URL: ${invoiceUrl}`,
      );
      router.push(data.invoice_url as string);
    } catch (error) {
      console.error("Error fetching invoice", error);
      setIsLoading(false);
    }
  };

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
          {/* {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {invoiceUrl ? (
                <>
                  <Link href={invoiceUrl}>
                    <Button>Checkout</Button>
                  </Link>
                </>
              ) : null}
            </>
          )} */}
          <Button
            onClick={() => fetchInvoice(price)}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Loading..." : "Checkout"}
          </Button>

          <div className="mx-auto mt-1 flex items-center text-sm">
            <Lock size={20} /> Secure transaction
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
