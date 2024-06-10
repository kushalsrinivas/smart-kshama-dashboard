"use client";
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
interface joinCallData {
  message: string;
  status: number;
}
interface JoinCallResponse {
  clientID: string;
  data: joinCallData;
}

const JoinMeeting = () => {
  const [meetLink, setMeetLink] = useState("");

  const joinMeet = async () => {
    toast("Dona Ai notetaker request is underprocess");
    const formData = new URLSearchParams();
    formData.append("meetLink", meetLink);

    try {
      const response = await fetch("https://server.smartdonna.com/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data: JoinCallResponse = await response.json();
      console.log(data);
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
