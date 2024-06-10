import React from "react";
import FileUpload from "~/components/common/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

const page = () => {
  const name = "Harsh Makwana";
  const email = "harshmakwana22211@gmail.com";
  return (
    <div className="flex flex-col gap-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <div>
            <div className="flex mt-4 flex-row items-center gap-2">
              <FileUpload
                className="h-10 w-10"
                value="https://avatars.githubusercontent.com/u/47269252?v=4"
              />
              <div className="text-3xl">Kushal Srinivas</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between gap-5">
            <div className="w-full">
              <div>Display Name</div>
              <Input value={name} />
            </div>
            <div className="w-full">
              <div>Email Id</div>
              <Input value={email} disabled />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Access Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-start gap-5">
            <div>Should my meetings be private by default?</div>
            <RadioGroup defaultValue="yes">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="yes" />
                <Label htmlFor="yes">No</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
