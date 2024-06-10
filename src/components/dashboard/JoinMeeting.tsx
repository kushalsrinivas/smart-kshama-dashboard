'use client'
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const JoinMeeting = () => {
  const [meetLink, setMeetLink] = useState("");

  const joinMeet = async () => {
    // Create the form body as a JSON object
    const formBody = {
      meetingUrl: meetLink,
      botName: "Dona Ai",
      client_client_id: "123",
    };

    try {
      const response = await fetch("https://api.goodmeetings.ai/v2/call/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM`,
        },
        body: JSON.stringify(formBody),
      });
    //   const data = await response.json();
      toast("Dona Ai notetaker request is under process");
    //   console.log(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Copy paste the meeting link</CardTitle>
        <CardDescription>
          Invite notetaker ad hoc to a specific meeting
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-5">
        <Input
          value={meetLink}
          onChange={(e) => setMeetLink(e.target.value)}
          placeholder="Please enter a Zoom/Google Meet/Teams Meeting Link"
        />
        <Button onClick={joinMeet}>join meeting</Button>
      </CardContent>
    </Card>
  );
};

export default JoinMeeting;
