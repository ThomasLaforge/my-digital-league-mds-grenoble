"use client";
import styles from "./Input.module.scss";
import { ChevronDownIcon } from "@/app/components/Icons/Icons";

interface OptionItem {
  value: string;
  label: string;
}

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  obligatory?: boolean;
  options?: string[] | OptionItem[];
}

export default function Input(props: InputProps) {
  const isSelect = props.type === "select";
  const isTextarea = props.type === "textarea";

  return (
    <div className={styles.inputContainer}>
      {props.label && (
        <label className={styles.inputLabel}>
          {props.label}{" "}
          {props.obligatory && <span className={styles.required}>*</span>}
        </label>
      )}

      {isTextarea ? (
        <textarea
          className={styles.inputField}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
          disabled={props.disabled}
          rows={4}
        />
      ) : isSelect ? (
        <div className={styles.selectWrapper}>
          <select
            className={styles.inputField}
            value={props.value}
            onChange={(e) => props.onChange?.(e.target.value)}
            disabled={props.disabled}
          >
            {props.placeholder && <option value="">{props.placeholder}</option>}
            {props.options?.map((opt) => {
              const isObjectOption = typeof opt === "object";
              const value = isObjectOption ? opt.value : opt;
              const label = isObjectOption ? opt.label : opt;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
          <span className={styles.chevron}>
            <ChevronDownIcon
              width={12}
              height={8}
              color="var(--color-icon-dark)"
            />
          </span>
        </div>
      ) : (
        <input
          type={props.type || "text"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
          disabled={props.disabled}
          className={`${styles.inputField} ${props.error ? styles.errorActive : ""}`}
        />
      )}

      {props.error && props.errorMessage && (
        <span className={styles.errorMessage}>{props.errorMessage}</span>
      )}
    </div>
  );
}
