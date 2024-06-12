/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import React, { type FC, useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import ShimmerEffect from "./ShimmerEffect";

interface Meeting {
  userId: string;
  startDate: string;
  endDate: string;
}

const OverviewLayout: FC<Meeting> = ({ userId, startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const currentUserId = "b859fc67-572b-4d49-a458-28a6a9aec0de";
  
  const getData = async () => {
    try {
      const bearerToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";

      const response = await fetch(
        "https://api.goodmeetings.ai/v2/call/search-recording-based-client-email",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },

          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
            client_emailId: [],
            hostEmailId: "",
            // client_client_id: userId,
            client_client_id: currentUserId,
          }),
        },
      );

      const data = await response.json();
      console.log("data", data.data);
      setData(data.data);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {/* {loading ? (
        Array(4)
          .fill(null)
          .map((_, idx) => <ShimmerEffect key={idx} />)
      ) : data?.length ? (
        data.map((meeting, id) => <OverviewCard key={id} data={meeting} />)
      ) : (
        <div className="m-auto pt-24">No meetings to display</div>
      )} */}
      {loading ? (
        Array(4)
          .fill(null)
          .map((_, idx) => <ShimmerEffect key={idx} />)
      ) : data.length > 0 ? (
        data.map((meeting, id) => <OverviewCard key={id} data={meeting} />)
      ) : (
        <div className="m-auto pt-24">
          <div className="mb-5">No meetings yet.</div>
          <div className="mb-5">
            If you just had one, then please note it takes about 5 minutes for
            insights to show up here.
          </div>
          <div>
            And also you just had a meeting, Take a walk and come back, your
            donna is extracting all the crazy insights for you.
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewLayout;
