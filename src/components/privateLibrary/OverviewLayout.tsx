"use client";
import React, { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import ShimmerEffect from "./ShimmerEffect";

interface Meeting {
  userId: string;
  startDate: string;
  endDate: string;
}

interface DateRangeChangedEvent extends CustomEvent {
  detail: {
    startDate: string;
    endDate: string;
  };
}

const OverviewLayout: React.FC<Meeting> = ({ userId, startDate, endDate }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate, endDate });

  const getData = async (start: string, end: string) => {
    try {
      setLoading(true);
      const bearerToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU0MmYwZjU0Yjg4MjAwMGU0NzE0ZDQiLCJpYXQiOjE3MTY4MTA0NTQsImV4cCI6MTc0ODM0NjQ1NCwidHlwZSI6ImFjY2VzcyJ9.OQLGGqS4jShahdC3wTaJ5yj4g4MYkeXv-jBXi-AD1sM";

      // Adjust the end date to include the full day
      const adjustedEndDate = new Date(end);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
      const adjustedEndDateString = adjustedEndDate.toISOString().split('T')[0];

      const response = await fetch(
        "https://api.goodmeetings.ai/v2/call/search-recording-based-client-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            start_date: start,
            end_date: adjustedEndDateString,
            client_emailId: [],
            hostEmailId: "",
            client_client_id: userId,
          }),
        },
      );

      const responseData = await response.json();
      console.log("data", responseData.data);
      setData(responseData.data);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(dateRange.startDate, dateRange.endDate);

    const handleDateRangeChange = (event: DateRangeChangedEvent) => {
      const { startDate, endDate } = event.detail;
      setDateRange({ startDate, endDate });
    };

    window.addEventListener('dateRangeChanged', handleDateRangeChange as EventListener);

    return () => {
      window.removeEventListener('dateRangeChanged', handleDateRangeChange as EventListener);
    };
  }, [userId]);

  useEffect(() => {
    getData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
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