import classnames from "classnames";
import React from "react";
import styles from "./Toggle.module.scss";

export function Toggle({ isOn, toggle }: { isOn: boolean; toggle(): void }) {
  return (
    <label
      className={classnames(styles.toggle, isOn ? styles.toggled : "")}
      onClick={toggle}
    >
      <div className={styles.toggleHandle}></div>
    </label>
  );
}
