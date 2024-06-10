"use client";
import React, { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useParams } from "next/navigation";
import Aichat from "~/components/meetings/Aichat";
import Todo from "~/components/meetings/Todo";
import Keypoints from "~/components/meetings/Keypoints";
import Tldr from "~/components/meetings/Tldr";
import { type MeetingDetails } from "~/@types/meetingInfo";

function Page() {
  const [index, setIndex] = useState<number>(0);
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MeetingDetails>();
  const getData = async () => {
    const formData = new URLSearchParams();
    formData.append("clientID", params.id);
    try {
      const response = await fetch("http://localhost:8080/getRecording", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: MeetingDetails = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch error: ", error);
      return error;
    }
  };
  useEffect(() => {
    void getData();
  }, []);
  return (
    <div className="flex flex-row">
      <div className="h-screen w-full bg-zinc-100">
        <div className="flex w-full flex-row gap-5 p-20">
          <Card className="w-full">
            <CardHeader>
              <div className="h-96 w-full bg-slate-300"></div>
            </CardHeader>
            <CardContent>
              <h1>Synopsis</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, a.
                Ducimus porro voluptatibus aperiam veniam natus, itaque
                possimus, harum quia incidunt temporibus ex? Atque pariatur
                aperiam harum et architecto doloribus?
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <div className="flex flex-row justify-center gap-5">
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(0);
                    }}
                  >
                    ToDo
                  </Button>
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(1);
                    }}
                  >
                    Keypoints
                  </Button>
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(2);
                    }}
                  >
                    Ai Chat
                  </Button>
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setIndex(3);
                    }}
                  >
                    TLDR
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full ">
                {index === 0 && (
                  <>
                    <Todo></Todo>
                  </>
                )}
                {index === 1 && (
                  <>
                    <Keypoints></Keypoints>
                  </>
                )}
                {index === 2 && <Aichat id={params.id}></Aichat>}
                {index === 3 && <Tldr></Tldr>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
