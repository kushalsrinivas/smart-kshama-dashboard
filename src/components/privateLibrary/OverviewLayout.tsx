"use client";
import React, { useEffect, useState } from "react";
import { type Meeting } from "~/@types/meeting";
import OverviewCard from "./OverviewCard";
import ShimmerEffect from "./ShimmerEffect";

const OverviewLayout = () => {
  const [data, setData] = useState<Meeting[]>();
  const [loading, setLoading] = useState(true);  // State to track loading status

  const getData = async () => {
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
