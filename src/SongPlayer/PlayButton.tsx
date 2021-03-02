import React from "react";
import { Arrow } from "../components/Icons";
import styles from "./SongPlayer.module.scss";

export function PlayButton({ isPlaying }: { isPlaying: boolean }) {
  return (
    <button className={styles.playButton}>
      {isPlaying ? "||" : <Arrow />}
    </button>
  );
}
