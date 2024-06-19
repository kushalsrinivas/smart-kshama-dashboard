import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useState, type FC, useEffect } from "react";
import CustomSelect, { type Option } from "../common/CustomSelect";

interface SubscriptionProps {
  onSelectPlan: (plan: {
    selectedPlan: string;
    billingCycle: string;
    currency: string;
    price: number;
  }) => void;
}

const Subscription: FC<SubscriptionProps> = ({ onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState(14.99);

  const planOptions: Option[] = [
    { value: "pro", label: "Pro" },
    { value: "business", label: "Business" },
  ];

  const billingCycleOptions: Option[] = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const currencyOptions: Option[] = [{ value: "usd", label: "USD ($)" }];

  const getPrice = (plan: string, cycle: string): number => {
    if (plan === "pro" && cycle === "monthly") return 14.99;
    if (plan === "business" && cycle === "monthly") return 49.99;
    if (plan === "pro" && cycle === "yearly") return 120;
    if (plan === "business" && cycle === "yearly") return 408;
    return 14.99;
  };

  useEffect(() => {
    const price = getPrice(selectedPlan, billingCycle);
    setPrice(price);
    onSelectPlan({
      selectedPlan,
      billingCycle,
      currency,
      price,
    });
  }, [selectedPlan, billingCycle, currency]);

  return (
    <div className="mx-auto w-full rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Subscription details</h2>
        <Badge className="">In Trial</Badge>
      </div>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="plan">Plan</Label>
          <CustomSelect
            options={planOptions}
            placeholder="Pro"
            onChange={(value) => setSelectedPlan(value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="billing-cycle">Billing Cycle</Label>
          <CustomSelect
            options={billingCycleOptions}
            placeholder="Monthly"
            onChange={(value) => setBillingCycle(value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="currency">Currency</Label>
          <CustomSelect
            options={currencyOptions}
            placeholder="USD ($)"
            onChange={(value) => setCurrency(value)}
          />
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{`${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} ${currency.toUpperCase()} ${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}`}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>
              Total Quantity: 1 <InfoIcon className="inline-block h-4 w-4" />
            </span>
            <span className="font-bold">${price}/ user</span>
          </CardDescription>
        </CardHeader>
      </Card>
      <div>
        <h3 className="text-lg font-bold">Coupon code</h3>
        <div className="mt-2 flex items-center space-x-4">
          <Input type="text" placeholder="Your code" />
          <Button className="">Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
