"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FileUpload from "../common/FileUpload";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";

interface EditUserProps {
  name: string;
  email: string;
  image: string;
}

const EditUser: React.FC<EditUserProps> = ({
  name: propName,
  email,
  image,
}) => {
  const [name, setName] = useState(propName);

  const userName = api.user.updateUserName.useMutation();

  const handleSave = () => {
    if (name !== propName) {
      userName.mutate({ name });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <div>
          <div className="mt-4 flex flex-row items-center gap-2">
            <FileUpload className="h-10 w-10" value={image} />
            <div className="text-3xl">{name}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between gap-5">
          <div className="w-full">
            <div>Display Name</div>
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className="w-full">
            <div>Email Id</div>
            <Input value={email} disabled />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button onClick={handleSave} className="mt-4">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditUser;
