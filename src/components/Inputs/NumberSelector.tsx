import React from "react";
import { roundToNearestDecimal } from "../../utils/number";
import { IconButton } from "../Buttons/IconButton";
import { Arrow } from "../Icons";
import { Directions } from "../Icons/Arrow";
import styles from "./NumberSelector.module.scss";

export function NumberSelector({
  step = 1,
  decimalPlaces = 2,
  prefix,
  suffix,
  max,
  min,
}: {
  step?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  max?: number;
  min?: number;
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curVal = Number(e.target.value);
    const rounded = roundToNearestDecimal(curVal, decimalPlaces);
    setValue(rounded);
  };

  return (
    <div className={styles.numberSelector}>
      {prefix ? <span>{prefix}</span> : null}
      <input
        className={styles.numberInput}
        type="number"
        value={value}
        onChange={handleChange}
      />
      {suffix ? <span>{suffix}</span> : null}
      <div className={styles.stepButtons}>
        <IconButton
          className={styles.stepButton}
          onClick={() => {
            const newVal = max ? Math.min(max, value + step) : value + step;
            const rounded = roundToNearestDecimal(newVal, decimalPlaces);
            setValue(rounded);
          }}
        >
          <Arrow direction={Directions.up} />
        </IconButton>
        <IconButton
          className={styles.stepButton}
          onClick={() => {
            const newVal = min ? Math.max(min, value - step) : value - step;
            const rounded = roundToNearestDecimal(newVal, decimalPlaces);
            setValue(rounded);
          }}
        >
          <Arrow direction={Directions.down} />
        </IconButton>
      </div>
    </div>
  );
}
