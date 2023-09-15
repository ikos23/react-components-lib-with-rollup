import React from "react";

export interface ButtonProps {
  text: string;
  onClick?: (e: any) => void;
}

export default function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.text}</button>;
}
