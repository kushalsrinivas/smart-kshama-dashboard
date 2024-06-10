"use client";
import React, { useEffect, useState } from "react";
import { type Meeting } from "~/@types/meeting";
import OverviewCard from "./OverviewCard";

const OverviewLayout = () => {
  const [data, setData] = useState<Meeting[]>();

  const getData = async () => {
    try {
      const response = await fetch("https://server.smartdonna.com/overview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: Meeting[] = await response.json();
      console.log(data);
      setData(data);
      return data;
    } catch (error) {
      console.error("Fetch error: ", error);
      return error;
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {data ? (
        data?.map((meeting, id) => {
          return <OverviewCard key={id} data={meeting} />;
        })
      ) : (
        <div className="m-auto pt-24">No meetings to display</div>
      )}
    </div>
  );
};

export default OverviewLayout;
