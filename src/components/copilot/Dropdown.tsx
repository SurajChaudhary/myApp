import React, { memo } from "react";
import styles from "../../styles/copilot/Dropdown.module.css";

interface DropdownProps {
  label: string;
  options: Array<{ value: number; label: string }>;
  selectedValue: number;
  onChange: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, onChange }) => (
  <div className={styles.container}>
    <label htmlFor={`${label.toLowerCase()}-dropdown`} className={styles.label}>
      {label}:
    </label>
    <select
      id={`${label.toLowerCase()}-dropdown`}
      className={styles.select}
      value={selectedValue}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default memo(Dropdown);
