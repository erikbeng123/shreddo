import React from "react";
import { SongData } from "./SongPlayer";
import styles from "./SongVisualizer.module.scss";
import { SoundWave } from "./SoundWave";

const SectionArrow = ({ position }: { position: number }) => {
  return (
    <div style={{ left: `${position}%` }} className={styles.sectionArrow}></div>
  );
};

export const SongVisualizer = ({ songData }: { songData: SongData }) => {
  const [blockSize, setBlockSize] = React.useState(3);
  const songWave = songData.soundData.filter((_, i) => i % blockSize === 0);

  const loopStartPercentage = 100 * (songData.loopStart / songData.duration);
  const loopEndPercentage = 100 - 100 * (songData.loopEnd / songData.duration);

  return (
    <div className={styles.container}>
      <div
        className={styles.songContainer}
        style={{ width: `${songWave.length * 10}px` }}
      >
        <div className={styles.sectionBar}>
          {songData.sections.map((x, i) => {
            return (
              <SectionArrow
                key={`section_${x}_${i}`}
                position={100 * (x / songData.duration)}
              />
            );
          })}
        </div>
        <SoundWave
          loopStartPercentage={loopStartPercentage}
          loopEndPercentage={loopEndPercentage}
          songWave={songWave}
        />
        <div
          className={styles.loopBar}
          style={{
            clipPath: `inset(0 ${loopEndPercentage}% 0 ${loopStartPercentage}%)`,
          }}
        ></div>
      </div>
    </div>
  );
};
