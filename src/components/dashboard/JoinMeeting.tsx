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

interface JoinMeetingProps {
  currentUserId: string;
}

const JoinMeeting: React.FC<JoinMeetingProps> = ({ currentUserId }) => {
  const [meetLink, setMeetLink] = useState("");
  

  const joinMeet = async () => {
    toast("Donna Ai notetaker request is underprocess");
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

  const newJoinMeet = async () => {

    toast("Donna Ai notetaker request is underprocess");

    try {
      const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";
      const response = await fetch("https://api.goodmeetings.ai/v2/call/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          "meetingUrl": meetLink,
          "botName": "Smart Donna",
          "client_client_id": currentUserId
        }),
      });

      const data: JoinCallResponse = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }

  }
  
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
        <Button onClick={newJoinMeet}>Join Meeting</Button>
      </CardContent>
    </Card>
  );
};

export default JoinMeeting;
