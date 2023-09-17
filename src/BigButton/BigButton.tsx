import React from "react";

export interface BigButtonProps {
  text: string;
  onClick?: (e: any) => void;
}

export default function BigButton(props: BigButtonProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "300px",
        border: "1px dolid grey",
        padding: "10px",
      }}
    >
      <div style={{ textAlign: "center", paddingBottom: "10px" }}>I AM BIG BUTTON</div>
      <div>
        <button
          style={{
            width: "150px",
            height: "80px",
            fontSize: "25px",
          }}
          onClick={props.onClick}
        >
          {props.text}
        </button>
      </div>
    </div>
  );
}
