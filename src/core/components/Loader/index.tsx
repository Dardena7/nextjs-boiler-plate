import { getStylesCSSClasses } from "@/core/utils";
import clsx from "clsx";
import { FC } from "react";
import styles from "./Loader.module.css";

type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  size: LoaderSize;
};

const getStyles = (size: LoaderSize) => {
  const classNames = ["loader", `loader-${size}`];
  return getStylesCSSClasses(classNames, styles);
};

export const Loader: FC<Props> = (props) => {
  const { size } = props;

  return <div className={clsx(getStyles(size))}></div>;
};
