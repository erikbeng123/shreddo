import React from "react";
import { createMusicPlayer } from "./MusicPlayer";
import audioFile from "../../test.mp3";

const musicPlayer = createMusicPlayer(audioFile);

const toMinSec = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const Test = () => {
  const [curTime, setCurTime] = React.useState(0);
  const [isLooping, setIsLooping] = React.useState(false);
  const [loopStart, setLoopStart] = React.useState(0);
  const [loopEnd, setLoopEnd] = React.useState(0);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);

  React.useEffect(() => {
    musicPlayer.onProgress(setCurTime);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={musicPlayer.play}>Play</button>
      <button onClick={musicPlayer.pause}>Pause</button>
      <button onClick={() => musicPlayer.seek(0)}>ToStart</button>
      <strong>{toMinSec(Math.round(curTime))}</strong>
      <label htmlFor="">
        Loop
        <input
          type="checkbox"
          checked={isLooping}
          onChange={(e) => {
            setIsLooping(e.target.checked);
            if (e.target.checked) {
              musicPlayer.setLoop(loopStart, loopEnd);
            } else {
              musicPlayer.clearLoop();
            }
          }}
        />
        <input
          type="number"
          value={loopStart}
          onChange={(e) => {
            setLoopStart(Number(e.target.value));
          }}
        />
        <input
          type="number"
          value={loopEnd}
          onChange={(e) => {
            setLoopEnd(Number(e.target.value));
          }}
        />
      </label>
      <label htmlFor="">
        Speed
        <input
          type="number"
          value={playbackSpeed}
          step={0.01}
          max={1}
          min={0.25}
          onChange={(e) => {
            setPlaybackSpeed(Number(e.target.value));
            musicPlayer.setPlaybackSpeed(Number(e.target.value));
          }}
        />
      </label>
    </div>
  );
};
