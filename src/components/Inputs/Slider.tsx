import React, { ChangeEvent } from "react";
import styles from "./Slider.module.scss";

export const Slider = ({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) => {
  const [curVal, setCurVal] = React.useState(value);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurVal(Number(e.target.value));
  };

  const percentage = 100 * ((curVal - min) / (max - min));
  return (
    <div className={styles.sliderContainer}>
      <input
        className={styles.slider}
        type="range"
        value={curVal}
        onChange={handleChange}
      />
      <div
        className={styles.track}
        style={{ width: `calc(${Math.min(percentage, 97)}% + 1px)` }}
      ></div>
    </div>
  );
};
