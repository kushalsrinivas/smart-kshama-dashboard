import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import Link from "next/link";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { InfoIcon } from "lucide-react";
import { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ options, placeholder }) => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const Subscription = () => {

  const planOptions: Option[] = [
    { value: "professional", label: "Professional" },
    { value: "basic", label: "Basic" },
  ];

  const billingCycleOptions: Option[] = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const currencyOptions: Option[] = [
    { value: "usd", label: "USD ($)" },
    { value: "eur", label: "EUR (€)" },
  ];

  return (
    <div className="mx-auto w-full rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Subscription details</h2>
        <Badge className="">In Trial</Badge>
      </div>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="plan">Plan</Label>
          <CustomSelect options={planOptions} placeholder="Professional" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="billing-cycle">Billing Cycle</Label>
          <CustomSelect options={billingCycleOptions} placeholder="Monthly" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="currency">Currency</Label>
          <CustomSelect options={currencyOptions} placeholder="USD ($)" />
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Professional USD Monthly</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>
              Total Quantity: 1 <InfoIcon className="inline-block h-4 w-4" />
            </span>
            <span className="font-bold">70/ user</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap text-black">
                  Workspace
                </TableHead>
                <TableHead className="whitespace-nowrap text-black">
                  Active Users
                </TableHead>
                <TableHead className="whitespace-nowrap text-black">
                  Breakdown
                </TableHead>
                <TableHead className="whitespace-nowrap text-black">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>harsh</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <Link
                    className="underline underline-offset-2"
                    href="#"
                    prefetch={false}
                  >
                    View
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    className="underline underline-offset-2"
                    href="#"
                    prefetch={false}
                  >
                    Modify Users
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-bold">Add-on</h3>
        <p className="mb-1 text-sm">Recurring</p>
        <div className="flex items-center space-x-2">
          <Checkbox id="crm" />
          <label htmlFor="crm" className="text-sm font-medium leading-none">
            CRM USD Monthly
          </label>
          <span className="ml-auto font-bold">50/ account</span>
        </div>
      </div>
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
