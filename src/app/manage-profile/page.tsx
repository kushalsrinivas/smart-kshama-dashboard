import { redirect } from "next/navigation";
import React from "react";
import EditUser from "~/components/manage-user/EditUser";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
      <EditUser name={name!} email={email!} image={image!} />
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
