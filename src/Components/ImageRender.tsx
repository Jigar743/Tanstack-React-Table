import { useState, useEffect } from "react";

type propType = {
  getValue(): string;
};

export default function ImageRender({ getValue }: propType) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <img src={value} alt={value} />;
}
