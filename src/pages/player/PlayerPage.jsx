import React, { useState } from "react";
import SeekBar from "./SeekBar.jsx";

const Player = ({ audio, children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(100);
  const [increment, setIncrement] = useState(1);
  const [splits, setSplits] = useState([]);
  const [sections, setSections] = useState([]);

  const handlePlaybackSpeed = (e) => {
    audio.playbackRate = e.target.value / 100;
    setPlaybackSpeed(e.target.value);
  };

  const handlePlayButton = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoopCheck = () => {
    setIsLooping(!isLooping);
  };

  const addSplit = () => {
    setSplits(splits.concat([audio.currentTime]));
  };

  const calcSections = () => {
    return splits;
  };

  const handleRewind = () => {
    audio.currentTime = audio.currentTime - increment;
  };

  const handleFastForward = () => {
    audio.currentTime = audio.currentTime + increment;
  };

  const handleIncrementChange = (e) => {
    setIncrement(Number(e.target.value));
  };

  return (
    <div>
      {children}
      <SeekBar audio={audio}></SeekBar>
      <label>
        Rewind/FF Increments
        <select
          name=""
          id=""
          value={increment}
          onChange={handleIncrementChange}
        >
          <option value="1">1s</option>
          <option value="5">5s</option>
          <option value="10">10s</option>
        </select>
      </label>
      <label>
        <input
          type="range"
          min="10"
          max="100"
          value={playbackSpeed}
          onChange={handlePlaybackSpeed}
        />
        Playback speed ({playbackSpeed / 100})
      </label>
      <button onClick={handleRewind}>Rewind</button>
      <button onClick={handlePlayButton}>{!isPlaying ? "Play" : "Stop"}</button>
      <button onClick={handleFastForward}>FastForward</button>
      <button onClick={addSplit}>Split</button>
      <label>
        <input type="checkbox" onChange={handleLoopCheck} value={isLooping} />
        Loop
      </label>
      {isLooping &&
        calcSections().map((x, i) => {
          return (
            <div key={i}>
              <label>
                <input type="checkbox" />
                Section {x}
              </label>
            </div>
          );
        })}
    </div>
  );
};

export default Player;
