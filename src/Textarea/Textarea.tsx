import React from "react";

export interface TextareaProps {
  value: string;
  label: string;
  onChange?: (e: any) => void;
}

export default function Textarea(props: TextareaProps) {
  return (
    <label>
      {props.label}
      <textarea value={props.value} rows={4} cols={40} onChange={props.onChange} />
    </label>
  );
}
