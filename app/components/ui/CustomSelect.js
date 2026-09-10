"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

// Styled dropdown shared by every contact/lead form. `styles` is that form's
// own CSS module — every form already defines formInput/customSelect* classes
// for its own input styling, so this reuses whichever module the caller passes
// instead of forcing a single shared stylesheet.
const CustomSelect = ({ options, value, onChange, placeholder, name, error, styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelectWrapper} ref={wrapperRef}>
      <div
        className={`${styles.formInput} ${styles.customSelectTrigger} ${error ? styles.formInputError : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.customSelectValue : styles.customSelectPlaceholder}>
          {value ? options.find(o => o.value === value)?.label || value : placeholder}
        </span>
        <Icon icon="mdi:chevron-down" className={`${styles.customSelectIcon} ${isOpen ? styles.customSelectIconOpen : ""}`} />
      </div>
      {isOpen && (
        <ul className={styles.customSelectMenu}>
          {options.map((option, idx) => (
            <li
              key={idx}
              className={`${styles.customSelectOption} ${value === option.value ? styles.customSelectOptionActive : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
