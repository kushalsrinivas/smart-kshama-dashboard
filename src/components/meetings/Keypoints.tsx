import React from "react";
import KeypointsItems from "./items/KeypointsItems";

function Keypoints() {
  return (
    <div className="flex flex-col gap-2">
      <KeypointsItems></KeypointsItems>
      <KeypointsItems></KeypointsItems>
      <KeypointsItems></KeypointsItems>
      <KeypointsItems></KeypointsItems>
    </div>
  );
}

export default Keypoints;
