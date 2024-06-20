"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";

const ConnectCalender = () => {
  const handleClick = () => {
    toast("Comming soon");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to Calendar</CardTitle>
        <CardDescription>
          Auto-invite notetaker to calendar events
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Google</h1>
            <h2>Connect your Google Calendar</h2>
          </div>
          <Button onClick={handleClick}>Connect</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectCalender;
