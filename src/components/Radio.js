import React from "react";

export default function Radio({
  formikName,
  value,
  title,
  handleChange,
  fieldName,
}) {
  return (
    <li className={formikName === value ? "active" : null}>
      <label htmlFor={value + fieldName}>{title}</label>
      <input
        type="radio"
        name={fieldName}
        id={value + fieldName}
        value={value}
        onChange={handleChange}
      />
    </li>
  );
}
