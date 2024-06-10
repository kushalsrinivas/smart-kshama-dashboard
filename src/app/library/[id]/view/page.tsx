"use client";
import React, { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useParams } from "next/navigation";
import Aichat from "~/components/meetings/Aichat";
import Todo from "~/components/meetings/Todo";
import Keypoints from "~/components/meetings/Keypoints";
import Tldr from "~/components/meetings/Tldr";
import { Meeting } from "~/app/@types/meeting";
import { createClient } from "@supabase/supabase-js";
import { Video } from "~/components/meetings/video";

function Page() {
  const [index, setIndex] = useState<number>(0);
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<Meeting>();
  const supabase = createClient(
    "https://fodgwycudmbhoywjyfft.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZGd3eWN1ZG1iaG95d2p5ZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NDIzOTUsImV4cCI6MjAzMjAxODM5NX0.0cbuJgNEkAqDN7qoco3cCi5qP8cYvSAe7OBi6OEXAu0",
  );
  const getData = async () => {
    try {
      const { error, data } = await supabase
        .from("overveiw")
        .select("*")
        .eq("uuid", params.id)
        .single();
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
      <div className="h-screen w-full">
        <div className="flex w-full flex-col gap-5 md:p-20 p-2 md:flex-row">
          <Card className="w-full">
            <CardHeader>
              <Video url={data?.recordings[0].recorded_video_url_aws}></Video>
            </CardHeader>
            <CardContent>
              <h1>Synopsis</h1>
              <p>{data ? JSON.parse(data.agenda)[0] : ""}</p>
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
                  <>{data && <Todo data={data?.ActionPoints[0]}></Todo>}</>
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
