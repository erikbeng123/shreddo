import React from "react";
import styles from "./SongVisualizer.module.scss";

export const SoundWave = ({
  loopEndPercentage,
  loopStartPercentage,
  songWave,
}: {
  loopStartPercentage: number;
  loopEndPercentage: number;
  songWave: Array<number>;
}) => {
  return (
    <>
      <div className={styles.soundWave}>
        {songWave.map((x, i) => {
          return (
            <div
              key={`unselected_${x}_${i}`}
              className={styles.waveBar}
              style={{ height: `${x}%`, width: `${10}px` }}
            ></div>
          );
        })}
      </div>
      <div
        className={styles.selectedSoundWave}
        style={{
          clipPath: `inset(0 ${loopEndPercentage}% 0 ${loopStartPercentage}%)`,
        }}
      >
        {songWave.map((x, i) => {
          return (
            <div
              className={styles.waveBar}
              key={`selected_${x}_${i}`}
              style={{
                height: `${x}%`,
                width: `${10}px`,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
};
