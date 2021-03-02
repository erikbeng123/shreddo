import classnames from "classnames";
import React from "react";
import styles from "./Toggle.module.scss";

export function Toggle({ isOn }: { isOn: boolean }) {
  const [isChecked, setIsChecked] = React.useState(isOn);

  return (
    <label
      className={classnames(styles.toggle, isChecked ? styles.toggled : "")}
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    >
      <div className={styles.toggleHandle}></div>
    </label>
  );
}
