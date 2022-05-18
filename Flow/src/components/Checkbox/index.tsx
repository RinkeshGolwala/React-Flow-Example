import React, { ChangeEvent } from "react";
import "./Checkbox.css";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default (props: CheckboxProps) => {
  const { label, ...restProps } = props;
  return (
    <label id={label} className="container">
      {label}
      <input {...restProps} type="checkbox" hidden />
      <span className="mark"></span>
    </label>
  );
};
