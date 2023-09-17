import React, { useEffect, useState } from "react";

export interface ClockProps {
  showSeconds?: boolean;
}

export default function Clock({ showSeconds = false }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);

    return () => {
      id && clearInterval(id);
    };
  }, []);

  const hhMM = `${time.getHours()}:${time.getMinutes()}`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "120px",
        border: "1px dolid grey",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "20px" }}>{showSeconds ? `${hhMM}:${time.getSeconds()}` : hhMM}</div>
    </div>
  );
}
