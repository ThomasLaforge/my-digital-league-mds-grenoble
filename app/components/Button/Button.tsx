import styles from "./Button.module.scss";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "primary" | "secondary" | "tertiary";
  href?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "both";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const className = `${props.type ? `${styles.button} ${styles[props.type]}` : styles.button} ${props.fullWidth ? styles.fullWidth : ""}`;

  const content = (
    <>
      {props.icon &&
      (props.iconPosition === "left" || props.iconPosition === "both")
        ? props.icon
        : null}
      {props.label}
      {props.icon &&
      (props.iconPosition === "right" || props.iconPosition === "both")
        ? props.icon
        : null}
    </>
  );

  if (props.href && !props.disabled) {
    return (
      <Link href={props.href} className={className} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {content}
    </button>
  );
}
