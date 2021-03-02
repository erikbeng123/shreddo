import classnames from "classnames";
import React, { ReactNode } from "react";
import styles from "./IconButton.module.scss";

export const IconButton: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string | undefined;
}) => {
  return (
    <button className={classnames(styles.iconButton, className)} {...props}>
      {children}
    </button>
  );
};
