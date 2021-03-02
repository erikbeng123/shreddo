import React from "react";

import styles from "./styles.module.scss";
import { SideMenu } from "./SideMenu";
import { SongPlayer } from "./SongPlayer";
import { SongData } from "./SongPlayer/SongPlayer";
import { roundToNearestDecimal } from "./utils/number";

const songData = {
  id: " 1234",
  title: "Cool Song",
  artist: "Sick Artist",
  duration: 888,
  sections: [100, 160, 600, 777],
  loopStart: 0,
  loopEnd: 888,
  soundData: new Array(888)
    .fill(0)
    .map(
      (_, i) =>
        roundToNearestDecimal(Math.abs(Math.cos(i * (Math.PI / 180))), 2) * 100
    ),
};

const initSongs: Array<SongData> = [songData];

const playerSettings = {
  volume: 0.5,
  playbackSpeed: 1,
  isLooping: true,
  isAutoSpeedUpEnabled: true,
  speedUpIncrement: 0.25,
  speedUpRepetitions: 10,
  isCountInEnabled: false,
  countInBeats: 2,
  countInTempo: 180,
};

export function App() {
  const [songs, setSongs] = React.useState(initSongs);
  const findSong = (id: string) => songs.find((x) => x.id === id) || null;
  const selectedId = songs[0]?.id || "";
  const [selectedSong, setSelectedSong] = React.useState(findSong(selectedId));

  const addSong = (newSong: SongData) => {
    setSongs([...songs, newSong]);
  };

  const selectSong = (id: string) => {
    setSelectedSong(findSong(id));
  };

  return (
    <div className={styles.shreddo}>
      <SideMenu
        songs={songs}
        selectedSong={selectedSong?.id || ""}
        addSong={addSong}
        selectSong={selectSong}
      />
      <SongPlayer songData={selectedSong} playerSettings={playerSettings} />
    </div>
  );
}
