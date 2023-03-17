import { getStylesCSSClasses } from "@/core/utils";
import clsx from "clsx";
import { FC } from "react";
import styles from "./Button.module.css";

type ButtonStyle = "primary" | "secondary" | "success" | "danger";
type ButtonVariant = "raised" | "outlined" | "light";
type ButtonSize = "xs" | "sm" | "md" | "lg";

type Props = {
  label: string;
  style: ButtonStyle;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
};

const getCSSClasses = (
  style: ButtonStyle,
  variant: ButtonVariant,
  size: ButtonSize,
  disabled?: boolean
) => {
  let classNames = ["btn", `btn-${size}`];
  classNames = disabled
    ? classNames
    : [...classNames, `btn-${style}`, `btn-${variant}`, "btn-ripple"];
  return getStylesCSSClasses(classNames, styles);
};

export const Button: FC<Props> = (props) => {
  const { label, style, variant, size, disabled, className, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        getCSSClasses(style, variant, size, disabled),
        className,
        "medium"
      )}
    >
      {label}
    </button>
  );
};
