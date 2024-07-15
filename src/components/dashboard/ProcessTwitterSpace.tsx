"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Loader2, RefreshCcw } from "lucide-react";
import Tree from 'react-d3-tree';

interface SpaceData {
  original_transcript: string | null;
  abstract: string | null;
  mind_map: string | null;
  summary: string | null;
}

interface Space extends SpaceData {
  id: string;
  space_url: string;
  status: 'queued' | 'downloading' | 'processing' | 'completed' | 'error';
  activeTab: keyof SpaceData;
}

interface ProcessTwitterSpaceProps {
  currentUserId: string;
}

const ProcessTwitterSpace: React.FC<ProcessTwitterSpaceProps> = ({ currentUserId }) => {
  const [spaceUrl, setSpaceUrl] = useState("");
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isAddingSpace, setIsAddingSpace] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSpaces = useCallback(async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`https://spaces.smartdonna.com/spaces/${currentUserId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch spaces');
      }
      const data = await response.json();
      setSpaces(prevSpaces => {
        const newSpaces = data.map((space: Space) => ({
          ...space,
          activeTab: 'abstract' as keyof SpaceData
        }));
        return newSpaces.map((newSpace: Space) => {
          const existingSpace = prevSpaces.find(s => s.id === newSpace.id);
          return existingSpace ? { ...newSpace, activeTab: existingSpace.activeTab } : newSpace;
        });
      });
    } catch (error) {
      console.error('Error fetching spaces:', error);
      toast.error('Failed to fetch spaces');
    } finally {
      setIsInitialLoading(false);
      setIsUpdating(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchSpaces();
    const intervalId = setInterval(fetchSpaces, 10000);
    return () => clearInterval(intervalId);
  }, [fetchSpaces]);

  const addSpace = async () => {
    if (spaceUrl.includes("twitter.com") || spaceUrl.includes("t.co")) {
      setIsAddingSpace(true);
      try {
        const response = await fetch("https://spaces.smartdonna.com/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: spaceUrl,
            userId: currentUserId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const newSpace: Space = {
          id: data.id,
          space_url: spaceUrl,
          status: 'queued',
          original_transcript: null,
          abstract: null,
          mind_map: null,
          summary: null,
          activeTab: 'abstract'
        };
        setSpaces(prev => [newSpace, ...prev]);
        setSpaceUrl("");
        toast.success(`Twitter Space added and queued for processing: ${spaceUrl}`);

        await fetchSpaces();
      } catch (error) {
        console.error("Error adding Twitter Space: ", error);
        toast.error(`Failed to add Twitter Space: ${spaceUrl}`);
      } finally {
        setIsAddingSpace(false);
      }
    } else {
      toast.error("Please enter a valid Twitter Space link");
    }
  };

  const changeTab = (spaceId: string, tab: keyof SpaceData) => {
    setSpaces(prev => prev.map(space =>
      space.id === spaceId ? { ...space, activeTab: tab } : space
    ));
  };

  const tabNames: Record<keyof SpaceData, string> = {
    abstract: "Abstract",
    original_transcript: "Transcript",
    mind_map: "Mind Map",
    summary: "Summary",
  };

  const getStatusMessage = (status: Space['status']) => {
    switch (status) {
      case 'queued': return 'Queued for processing';
      case 'downloading': return 'Downloading audio';
      case 'processing': return 'Processing audio';
      case 'completed': return 'Processing complete';
      case 'error': return 'Error occurred';
      default: return 'Unknown status';
    }
  };

  const renderMindMap = (mindMapJson: string | null) => {
    if (!mindMapJson) return null;
    try {
      const mindMapData = JSON.parse(mindMapJson);
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <Tree 
            data={mindMapData} 
            orientation="horizontal"
            pathFunc="straight"
            translate={{ x: 50, y: 100 }}
            separation={{ siblings: 1, nonSiblings: 1.5 }}
            nodeSize={{ x: 200, y: 30 }}
            zoom={0.8}
            centeringTransitionDuration={800}
          />
        </div>
      );
    } catch (error) {
      console.error('Error parsing mind map JSON:', error);
      return <p className="text-red-500 text-sm">Invalid mind map data</p>;
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading Twitter Spaces...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Process Twitter Space</CardTitle>
          <CardDescription>
            Analyze and get insights from a Twitter Space recording
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-5">
          <Input
            value={spaceUrl}
            onChange={(e) => setSpaceUrl(e.target.value)}
            placeholder="Enter Twitter Space URL"
            disabled={isAddingSpace}
          />
          <Button onClick={addSpace} disabled={isAddingSpace}>
            {isAddingSpace ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {isAddingSpace ? 'Adding...' : 'Add Space'}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Twitter Spaces</h2>
        <Button
          variant="neutral"
          size="sm"
          onClick={fetchSpaces}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCcw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {spaces.map(space => (
          <Card key={space.id} className="w-full">
            <CardHeader>
              <CardTitle className="text-sm truncate">{space.space_url}</CardTitle>
              <CardDescription>{getStatusMessage(space.status)}</CardDescription>
            </CardHeader>
            <CardContent>
              {space.status !== 'completed' && space.status !== 'error' && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {getStatusMessage(space.status)}
                </div>
              )}
              {space.status === 'completed' && (
                <div>
                  <div className="flex space-x-2 mb-4">
                    {(Object.keys(tabNames) as Array<keyof SpaceData>).map((key) => (
                      <Button
                        key={key}
                        variant={space.activeTab === key ? "default" : "noShadow"}
                        onClick={() => changeTab(space.id, key)}
                        className="px-2 py-1 text-xs font-medium"
                      >
                        {tabNames[key]}
                      </Button>
                    ))}
                  </div>
                  <div className="h-64 overflow-hidden">
                    <h3 className="text-sm font-semibold mb-2">{tabNames[space.activeTab]}</h3>
                    {space.activeTab === 'mind_map' ? (
                      <div className="h-[calc(100%-2rem)] overflow-auto">
                        {renderMindMap(space.mind_map)}
                      </div>
                    ) : (
                      <div className="h-[calc(100%-2rem)] overflow-auto">
                        <pre className="text-xs whitespace-pre-wrap">
                          {space[space.activeTab]}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {space.status === 'error' && (
                <p className="text-red-500 text-sm">An error occurred while processing this Space.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProcessTwitterSpace;