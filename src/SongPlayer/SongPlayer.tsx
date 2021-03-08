import React from "react";
import { PlayButton } from "./PlayButton";
import styles from "./SongPlayer.module.scss";
import classnames from "classnames";
import { Toggle, NumberSelector, Slider } from "../components/Inputs";
import { SongVisualizer } from "./SongVisualizer";
import { TapTempoButton } from "./TapTempoButton";
import { PlayerSettings, SongData } from "../App";

const convertToTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration % 60);
  return `${minutes}:${seconds}`;
};

export function SongPlayer({
  songData,
  updateSong,
  playerSettings,
}: {
  songData: SongData | null;
  updateSong(id: string, songData: any): void;
  playerSettings: PlayerSettings;
}) {
  const updateFn = (data: any) => () => updateSong(songData?.id || "", data);

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
                <Slider value={5} min={0} max={100} />
              </div>
            </div>
            <div className={styles.settingColumn}>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Playback Speed</label>
                <NumberSelector
                  value={songData.playbackSpeed}
                  updateValue={(newVal) => {
                    updateSong(songData.id || "", { playbackSpeed: newVal });
                  }}
                  min={0.05}
                  max={2}
                  step={0.05}
                />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Loop</label>
                <Toggle
                  isOn={songData.isLooping}
                  toggle={updateFn({ isLooping: !songData.isLooping })}
                />
              </div>
            </div>
            <div className={styles.settingColumn}>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Auto Speed Up</label>
                <Toggle
                  isOn={songData.isAutoSpeedUpEnabled}
                  toggle={updateFn({
                    isAutoSpeedUpEnabled: !songData.isAutoSpeedUpEnabled,
                  })}
                />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Speed Up By</label>
                <NumberSelector
                  value={songData.speedUpIncrement}
                  updateValue={(newVal) => {
                    updateSong(songData.id || "", { speedUpIncrement: newVal });
                  }}
                  step={0.1}
                  max={1}
                  min={0}
                />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Repetitions</label>
                <NumberSelector
                  value={songData.speedUpRepetitions}
                  updateValue={(newVal) => {
                    updateSong(songData.id || "", {
                      speedUpRepetitions: newVal,
                    });
                  }}
                  min={0}
                  max={1000}
                />
              </div>
            </div>
            <div className={styles.settingColumn}>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Count In</label>
                <Toggle
                  isOn={songData.isCountInEnabled}
                  toggle={updateFn({
                    isCountInEnabled: !songData.isCountInEnabled,
                  })}
                />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Number of Beats</label>
                <NumberSelector
                  value={songData.countInBeats}
                  updateValue={(newVal) => {
                    updateSong(songData.id || "", {
                      countInBeats: newVal,
                    });
                  }}
                  max={10}
                  min={0}
                />
              </div>
              <div className={styles.settingItem}>
                <label className={styles.settingLabel}>Tempo</label>
                <NumberSelector
                  value={songData.countInTempo}
                  updateValue={(newVal) => {
                    updateSong(songData.id || "", {
                      countInTempo: newVal,
                    });
                  }}
                  max={1000}
                  min={1}
                />
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
