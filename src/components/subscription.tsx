import { Badge } from "~/components/ui/badge"
import { Label } from "~/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import Link from "next/link"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export function Subscription() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Subscription details</h2>
        <Badge variant="secondary" className="bg-[#f5a623] text-white">
          In Trial
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="plan">Plan</Label>
          <Select>
            <SelectTrigger id="plan">
              <SelectValue placeholder="Professional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="billing-cycle">Billing Cycle</Label>
          <Select>
            <SelectTrigger id="billing-cycle">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select>
            <SelectTrigger id="currency">
              <SelectValue placeholder="USD ($)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Professional USD Monthly</CardTitle>
          <CardDescription className="flex justify-between items-center">
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
                <TableHead>Workspace</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Breakdown</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>harsh</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <Link className="text-blue-600" href="#" prefetch={false}>
                    View
                  </Link>
                </TableCell>
                <TableCell>
                  <Link className="text-blue-600" href="#" prefetch={false}>
                    Modify Users
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mb-6">
        <h3 className="text-lg font-bold">Add-on</h3>
        <p className="text-sm text-muted-foreground">Recurring</p>
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
        <div className="flex items-center space-x-4 mt-2">
          <Input type="text" placeholder="Your code" />
          <Button className="bg-blue-600 text-white">Apply</Button>
        </div>
      </div>
    </div>
  )
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
