import { redirect } from "next/navigation";
import React from "react";
import FileUpload from "~/components/common/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const name = session?.user.name;
  const email = session?.user.email;
  const image = session?.user.image;
  return (
    <div className="flex flex-col gap-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <div>
            <div className="mt-4 flex flex-row items-center gap-2">
              <FileUpload className="h-10 w-10" value={image!} />
              <div className="text-3xl">{name}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between gap-5">
            <div className="w-full">
              <div>Display Name</div>
              <Input value={name!} />
            </div>
            <div className="w-full">
              <div>Email Id</div>
              <Input value={email!} disabled />
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
