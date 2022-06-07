import React from "react";

export default function Checkbox({
  formikList,
  value,
  title,
  handleChange,
  fieldName
}) {
  return (
    <li className={formikList.includes(value) ? "active" : null}>
      <label htmlFor={value}>{title}</label>
      <input
        type="checkbox"
        name={fieldName}
        id={value}
        onChange={handleChange}
        value={value}
      />
    </li>
  );
}
