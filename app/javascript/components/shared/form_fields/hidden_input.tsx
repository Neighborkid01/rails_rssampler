import React from "react";

interface HiddenInputProps {
  field: string;
  value: number | string;
};

const HiddenInput = ({ field, value }: HiddenInputProps) => {
  return (
    <input type="hidden" name={field} value={value}/>
  );
};

export default HiddenInput;
