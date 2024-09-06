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
import { Plan } from ".";
import {
  BUSINESS_MONTHLY,
  BUSINESS_PLAN,
  BUSINESS_YEARLY,
  MONTHLY_CYCLE,
  PRO_MONTHLY,
  PRO_PLAN,
  PRO_YEARLY,
  YEARLY_CYCLE,
} from "~/constant/price";

interface SubscriptionProps {
  onSelectPlan: (plan: {
    id: number;
    selectedPlan: string;
    billingCycle: string;
    currency: string;
    price: number;
  }) => void;
}

const Subscription: FC<SubscriptionProps> = ({ onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState(PRO_PLAN);
  const [billingCycle, setBillingCycle] = useState(MONTHLY_CYCLE);
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState(PRO_MONTHLY);

  const plans: Plan[] = [
    {
      id: 1,
      selectedPlan: PRO_PLAN,
      price: PRO_MONTHLY,
      billingCycle: MONTHLY_CYCLE,
      currency: "usd",
    },
    {
      id: 2,
      selectedPlan: PRO_PLAN,
      price: PRO_YEARLY,
      billingCycle: YEARLY_CYCLE,
      currency: "usd",
    },
    {
      id: 3,
      selectedPlan: BUSINESS_PLAN,
      price: BUSINESS_MONTHLY,
      billingCycle: MONTHLY_CYCLE,
      currency: "usd",
    },
    {
      id: 4,
      selectedPlan: BUSINESS_PLAN,
      price: BUSINESS_YEARLY,
      billingCycle: YEARLY_CYCLE,
      currency: "usd",
    },
  ];

  const planOptions: Option[] = [
    { value: PRO_PLAN, label: PRO_PLAN },
    { value: BUSINESS_PLAN, label: BUSINESS_PLAN },
  ];

  const billingCycleOptions: Option[] = [
    { value: MONTHLY_CYCLE, label: MONTHLY_CYCLE },
    { value: YEARLY_CYCLE, label: YEARLY_CYCLE },
  ];

  const currencyOptions: Option[] = [{ value: "usd", label: "USD ($)" }];

  const getPrice = (plan: string, cycle: string): number => {
    if (plan === PRO_PLAN && cycle === MONTHLY_CYCLE) return PRO_MONTHLY;
    if (plan === BUSINESS_PLAN && cycle === MONTHLY_CYCLE)
      return BUSINESS_MONTHLY;
    if (plan === PRO_PLAN && cycle === YEARLY_CYCLE) return PRO_YEARLY;
    if (plan === BUSINESS_PLAN && cycle === YEARLY_CYCLE)
      return BUSINESS_YEARLY;
    return PRO_MONTHLY;
  };

  useEffect(() => {
    const price = getPrice(selectedPlan, billingCycle);
    setPrice(price);
    const selectedPlanDetails = plans.find(
      (plan) =>
        plan.selectedPlan.toLowerCase() === selectedPlan &&
        plan.billingCycle === billingCycle,
    );
    if (selectedPlanDetails) {
      onSelectPlan(selectedPlanDetails);
    }
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
            placeholder={PRO_PLAN}
            onChange={(value) => setSelectedPlan(value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="billing-cycle">Billing Cycle</Label>
          <CustomSelect
            options={billingCycleOptions}
            placeholder={MONTHLY_CYCLE}
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
