"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import Tree from "react-d3-tree";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface SpaceData {
  original_transcript: string | null;
  abstract: string | null;
  mind_map: string | null;
  summary: string | null;
}

interface Space extends SpaceData {
  id: string;
  space_url: string;
  status: "queued" | "downloading" | "processing" | "completed" | "error";
}

interface SpaceDetailProps {
  space:
    | {
        id: number;
        user_id: string | null;
        title: string | null;
        space_url: string | null;
        status: string | null;
        original_transcript: string | null;
        abstract: string | null;
        mind_map: string | null;
        summary: string | null;
        created_at: Date | null;
        updated_at: Date | null;
      }
    | undefined;
}

const SpaceDetail: React.FC<SpaceDetailProps> = ({ space }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<keyof SpaceData>("abstract");

  const tabNames: Record<keyof SpaceData, string> = {
    abstract: "Abstract",
    original_transcript: "Transcript",
    mind_map: "Mind Map",
    summary: "Summary",
  };

  const renderMindMap = (mindMapJson: string | null) => {
    if (!mindMapJson) return null;
    try {
      const mindMapData = JSON.parse(mindMapJson);
      return (
        <div style={{ width: "100%", height: "600px", overflow: "hidden" }}>
          <Tree
            data={mindMapData}
            orientation="horizontal"
            translate={{ x: 150, y: 250 }}
            separation={{ siblings: 1.2, nonSiblings: 1.8 }}
            nodeSize={{ x: 220, y: 50 }}
            zoom={0.8}
            centeringTransitionDuration={800}
            scaleExtent={{ min: 0.1, max: 1 }}
          />
        </div>
      );
    } catch (error) {
      console.error("Error parsing mind map JSON:", error);
      return <p className="text-red-500">Invalid mind map data</p>;
    }
  };

  if (!space) {
    return <div className="mt-8 text-center">Space not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="neutral" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Spaces
      </Button>
      <Card className="mb-6 w-full">
        <CardHeader>
          <CardTitle>{space.space_url}</CardTitle>
          <CardDescription>Status: {space.status}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-2">
            {(Object.keys(tabNames) as Array<keyof SpaceData>).map((key) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "noShadow"}
                onClick={() => setActiveTab(key)}
              >
                {tabNames[key]}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            {activeTab === "mind_map" ? (
              renderMindMap(space.mind_map)
            ) : (
              <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap rounded bg-gray-100 p-4">
                {space[activeTab]}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpaceDetail;
