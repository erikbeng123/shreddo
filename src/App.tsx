import React from "react";

import styles from "./styles.module.scss";
import { SideMenu } from "./SideMenu";
import { SongPlayer } from "./SongPlayer";
import { roundToNearestDecimal } from "./utils/number";
import { createMusicPlayer } from "./audio/MusicPlayer";
import audioFile from "../test.mp3";

export type SongData = {
  id: string | null;
  title: string;
  artist: string;
  duration: number;
  sections: Array<number>;
  loopStart: number;
  loopEnd: number;
  soundData: Array<number>;
  isLooping: boolean;
  playbackSpeed: number;
  isAutoSpeedUpEnabled: boolean;
  speedUpIncrement: number;
  speedUpRepetitions: number;
  isCountInEnabled: boolean;
  countInBeats: number;
  countInTempo: number;
};

export type PlayerSettings = {
  isPlaying: boolean;
  volume: number;
};

type AppState = {
  songList: Array<SongData>;
  selectedSongId: string | null;
};

type Action = {
  type: string;
  payload: any;
};

const songData = {
  id: "1234",
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
  isLooping: false,
  playbackSpeed: 1,
  isAutoSpeedUpEnabled: false,
  speedUpIncrement: 0,
  speedUpRepetitions: 0,
  isCountInEnabled: false,
  countInBeats: 0,
  countInTempo: 0,
};

const playerSettings = {
  volume: 0.5,
  isPlaying: false,
};

const musicPlayer = createMusicPlayer(audioFile);

export function App() {
  const initState: AppState = {
    songList: [songData],
    selectedSongId: "1234",
  };

  const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
      case "addSong":
        const newSongList = [...state.songList, action.payload];
        return { ...state, songList: newSongList };
      case "selectSong":
        return { ...state, selectedSongId: action.payload };
      case "updateSong":
        const songToUpdate = state.songList.find(
          (x) => x.id === action.payload.id
        );
        if (songToUpdate) {
          const songData = { ...songToUpdate, ...action.payload.songData };
          const newSongList = state.songList.map((x) => {
            return x.id === action.payload.id ? { ...x, ...songData } : x;
          });
          return { ...state, songList: newSongList };
        }
        return state;
      default:
        break;
    }
    return state;
  };

  const [state, dispatch] = React.useReducer(reducer, initState);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  const addSong = (newSong: SongData) => {
    dispatch({ type: "addSong", payload: newSong });
  };

  const selectSong = (id: string) => {
    dispatch({ type: "selectSong", payload: id });
  };

  const updateSong = (id: string, songData: any) => {
    dispatch({ type: "updateSong", payload: { id, songData } });
  };

  const selectedSong = state.songList.find(
    (x) => x.id === state.selectedSongId
  );

  return (
    <div className={styles.shreddo}>
      <SideMenu
        songs={state.songList}
        selectedSong={state.selectedSongId || ""}
        addSong={addSong}
        selectSong={selectSong}
      />
      <SongPlayer
        songData={selectedSong || null}
        updateSong={updateSong}
        playerSettings={playerSettings}
      />
    </div>
  );
}
