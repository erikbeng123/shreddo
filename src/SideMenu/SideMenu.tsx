import React, { ChangeEvent } from "react";
import styles from "./SideMenu.module.scss";
import classnames from "classnames";
import { Cog } from "./Cog";
import { SongData } from "../SongPlayer/SongPlayer";

export function SideMenu({
  songs,
  selectedSong,
  addSong,
  selectSong,
}: {
  songs: Array<SongData>;
  selectedSong: string | null;
  addSong: Function;
  selectSong: Function;
}) {
  const handleSongSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newSong: SongData = {
        id: `${songs.length}_wow`,
        title: file.name,
        artist: file.name,
        duration: 1000,
        sections: [],
        loopStart: 0,
        loopEnd: 1000,
        soundData: [],
      };
      addSong(newSong);
    }
  };

  return (
    <nav className={styles.sideMenu}>
      <h1 className={styles.logo}>Shreddo</h1>
      <ul className={styles.songList}>
        {songs.map((song) => {
          return (
            <li
              key={song.id}
              className={classnames(
                styles.songLink,
                selectedSong === song.id ? styles.selectedSong : ""
              )}
              onClick={() => selectSong(song.id)}
            >
              <a>{song.title}</a>
            </li>
          );
        })}
      </ul>
      <div className={styles.bottomButtons}>
        <input
          type="file"
          id="song_selector"
          style={{ display: "none" }}
          onChange={handleSongSelect}
        />
        <label
          htmlFor="song_selector"
          className={classnames(styles.bottomButton, styles.addSongButton)}
        >
          <div className={classnames(styles.bottomIcon, styles.plus)}></div>
          <span>Add Song</span>
        </label>
        <a
          href=""
          className={classnames(styles.bottomButton, styles.settingsLink)}
        >
          <div className={styles.bottomIcon}>
            <Cog className={styles.settingsCog} />
          </div>
          <span>Settings</span>
        </a>
      </div>
    </nav>
  );
}
