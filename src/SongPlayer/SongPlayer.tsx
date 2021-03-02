import React from "react";
import { PlayButton } from "./PlayButton";
import styles from "./SongPlayer.module.scss";
import classnames from "classnames";
import { Toggle, NumberSelector } from "../components/Inputs";
import { SongVisualizer } from "./SongVisualizer";
import { TapTempoButton } from "./TapTempoButton";

export type SongData = {
  id: string | null;
  title: string;
  artist: string;
  duration: number;
  sections: Array<number>;
  loopStart: number;
  loopEnd: number;
  soundData: Array<number>;
};

type PlayerSettings = {
  volume: number;
  playbackSpeed: number;
  isLooping: boolean;
  isAutoSpeedUpEnabled: boolean;
  speedUpIncrement: number;
  speedUpRepetitions: number;
  isCountInEnabled: boolean;
  countInBeats: number;
  countInTempo: number;
};

const convertToTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds}`;
};

export function SongPlayer({
  songData,
  playerSettings,
}: {
  songData: SongData | null;
  playerSettings: PlayerSettings;
}) {
  return (
    <main className={styles.songPlayerContainer}>
      {songData ? (
        <>
          <div className={styles.songInfoContainer}>
            <h1 className={styles.songTitle}>{songData.title}</h1>
            <h2 className={styles.songInfo}>
              {songData.artist}・{convertToTime(songData.duration)}
            </h2>
          </div>
          <SongVisualizer songData={songData} />
          <div className={styles.songSettings}>
            <div className={classnames(styles.settingColumn, styles.controls)}>
              <PlayButton isPlaying={false} />
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>VOLUME</label>
                <input type="range" />
              </div>
            </div>
            <div className={styles.settingColumn}>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Playback Speed</label>
                <NumberSelector min={0.05} max={2} step={0.05} />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Loop</label>
                <Toggle isOn={playerSettings.isLooping} />
              </div>
            </div>
            <div className={styles.settingColumn}>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Auto Speed Up</label>
                <Toggle isOn={playerSettings.isAutoSpeedUpEnabled} />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Speed Up By</label>
                <NumberSelector step={0.1} max={1} min={0} />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Repetitions</label>
                <NumberSelector min={0} max={1000} />
              </div>
            </div>
            <div className={styles.settingColumn}>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Count In</label>
                <Toggle isOn={playerSettings.isCountInEnabled} />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Number of Beats</label>
                <NumberSelector max={10} min={0} />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Tempo</label>
                <NumberSelector max={1000} min={1} />
              </div>
              <TapTempoButton />
            </div>
          </div>
        </>
      ) : (
        <div>NO DATA</div>
      )}
    </main>
  );
}
