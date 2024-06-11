/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import React, { type FC, useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import ShimmerEffect from "./ShimmerEffect";

interface Meeting {
  userId: string;
}

const OverviewLayout: FC<Meeting> = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

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
            start_date: "2024-05-04",
            end_date: "2024-06-12",
            client_emailId: [],
            hostEmailId: "contact@smartdonna.com",
            client_client_id: userId,
          }),
        },
      );

      const data = await response.json();
      console.log("data", data);
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
        <div className="m-auto pt-24">No meetings to display</div>
      )}
    </div>
  );
};

export default OverviewLayout;
