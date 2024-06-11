"use client";
import React, { useEffect, useState } from "react";
import { type Meeting } from "~/@types/meeting";
import OverviewCard from "./OverviewCard";
import ShimmerEffect from "./ShimmerEffect";
import { useSession } from "next-auth/react";

const OverviewLayout = () => {
  const [data, setData] = useState<Meeting[]>();
  const [loading, setLoading] = useState(true);  // State to track loading status

  const getData = async () => {

    //const currentUserId = useSession().data?.user.id;
    const currentUserId = 'b859fc67-572b-4d49-a458-28a6a9aec0de';

    try {

      const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";
      
      const response = await fetch("https://api.goodmeetings.ai/v2/call/search-recording-based-client-email", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`,
        },

        body: JSON.stringify({
          "start_date": "2024-05-04",
          "end_date": "2024-06-12",
          "client_emailId": [],
          "hostEmailId": "contact@smartdonna.com",
          "client_client_id": currentUserId
        }),
      });

      const data: Meeting[] = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setLoading(false);  // Set loading to false once the data is fetched or fails
    }
  };

  const oldGetData = async () => {
    try {
      const response = await fetch("https://server.smartdonna.com/overview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: Meeting[] = await response.json();
      setData(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setLoading(false);  // Set loading to false once the data is fetched or fails
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {loading ? (
        Array(4).fill(null).map((_, idx) => (  // Render 4 shimmer boxes
          <ShimmerEffect key={idx} />
        ))
      ) : data?.length ? (
        data.map((meeting, id) => (
          <OverviewCard key={id} data={meeting} />
        ))
      ) : (
        <div className="m-auto pt-24">No meetings to display</div>
      )}
    </div>
  );
};

export default OverviewLayout;
