import React from "react";
import { roundToNearestDecimal } from "../../utils/number";
import { IconButton } from "../Buttons/IconButton";
import { Arrow } from "../Icons";
import { Directions } from "../Icons/Arrow";
import styles from "./NumberSelector.module.scss";

export function NumberSelector({
  value,
  updateValue,
  step = 1,
  decimalPlaces = 2,
  prefix,
  suffix,
  max = null,
  min = null,
}: {
  value: number;
  updateValue(newValue: number): void;
  step?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  max?: number | null;
  min?: number | null;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curVal = Number(e.target.value);
    const rounded = roundToNearestDecimal(curVal, decimalPlaces);
    updateValue(rounded);
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
            const newVal =
              max !== null ? Math.min(max, value + step) : value + step;
            const rounded = roundToNearestDecimal(newVal, decimalPlaces);
            updateValue(rounded);
          }}
        >
          <Arrow direction={Directions.up} />
        </IconButton>
        <IconButton
          className={styles.stepButton}
          onClick={() => {
            const newVal =
              min !== null ? Math.max(min, value - step) : value - step;
            const rounded = roundToNearestDecimal(newVal, decimalPlaces);
            updateValue(rounded);
          }}
        >
          <Arrow direction={Directions.down} />
        </IconButton>
      </div>
    </div>
  );
}
