import React from "react";
import marioLogo from "./mario.svg";

export default function SuperMario() {
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
      <div style={{ textAlign: "center", paddingBottom: "10px" }}>I AM SUPER MARIO</div>
      <div>
        <img src={marioLogo} />
      </div>
    </div>
  );
}
