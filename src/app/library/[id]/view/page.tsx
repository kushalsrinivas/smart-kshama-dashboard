"use client";
import React, { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useParams } from "next/navigation";
import Aichat from "~/components/meetings/Aichat";
import Todo from "~/components/meetings/Todo";
import Keypoints from "~/components/meetings/Keypoints";
import Tldr from "~/components/meetings/Tldr";
import { type Meeting } from "~/@types/meeting";
import { Video } from "~/components/meetings/video";

interface MeetingData {
  transcript: {
    text: string;
    name: string;
  };
  instance: {
    summary: string;
    tldr: string;
  };
}

function Page() {
  const [index, setIndex] = useState<number>(0);
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<Meeting>();
  const [synopsis, setSynopsis] = useState();

  const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const getData = async () => {
    const transcriptUrl =
      "https://api.goodmeetings.ai/v2/transcript/get?callInstanceId=";
    const instanceUrl =
      "https://api.goodmeetings.ai/v2/call/get-meeting-instance-info?callInstanceId=";
    try {
      const transcriptResponse = await fetch(transcriptUrl + params.id, {
        headers,
      });
      const instanceResponse = await fetch(instanceUrl + params.id, {
        headers,
      });
      const transcriptData = await transcriptResponse.json();
      const instanceData = await instanceResponse.json();
      console.log("transcriptData", transcriptData);
      console.log("instanceData", instanceData);
      const data = {
        // transcript: transcriptData.data,
        summary: instanceData.data[0].summary.summary_time_data,
        tldr: instanceData.data[0].summary.tldr,
      };
      setSynopsis(data);
    } catch (error) {
      return { data: "error" };
    }
  };

  console.log("synopsis", synopsis);

  useEffect(() => {
    void getData();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="h-screen w-full">
        <div className="flex w-full flex-col gap-5 p-2 md:flex-row md:p-20">
          <Card className="w-full">
            <CardHeader>
              {data?.recordings[0] ? (
                <Video url={data.recordings[0].recorded_video_url_aws}></Video>
              ) : (
                <Video url=""></Video>
              )}
            </CardHeader>
            <CardContent>
              <h1 className="mb-6 text-xl">Synopsis</h1>
              {/* <p>
                {data && JSON.parse(data.agenda)[0]
                  ? JSON.parse(data.agenda)[0]
                  : ""}
              </p> */}
              {/* {synopsis?.transcript?.length > 0 &&
                synopsis.transcript?.map((item) => (
                  <p key={item.name} className="my-4 text-lg">
                    <span className="font-semibold">{item.name}: &nbsp;</span>
                    {item.text}
                  </p>
                ))} */}
              {synopsis?.summary[0]
                ? synopsis.summary[0].map((item) => (
                    <p key={item.name} className="text-semibold text-lg">
                      {item[0]}
                      {item.text}
                    </p>
                  ))
                : ""}
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
                  <>{data && <Todo data={data?.ActionPoints[0] ?? []} />}</>
                )}
                {index === 1 && (
                  <>
                    <Keypoints></Keypoints>
                  </>
                )}
                {index === 2 && <Aichat id={params.id} />}
                {index === 3 && <Tldr  />}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
