import React from "react";

interface TldrProps {
  data: string | undefined;
}

const Tldr: React.FC<TldrProps> = ({ data }) => {
  return (
    <div>
      <div>{data}</div>
    </div>
  );
};

export default Tldr;
