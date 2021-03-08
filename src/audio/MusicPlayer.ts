import { clamp } from "../utils/number";

export const createMusicPlayer = (audioPath: string, pollingInterval = 100) => {
  const audio = new Audio(audioPath);
  const onProgressCallbacks: Array<Function> = [];
  let loopCallback: Function | null;
  let playingInterval: number;

  audio.addEventListener("error", (e) => {
    console.log("Sorry, audio cannot be played", e);
  });

  return {
    changeSong(newPath: string) {
      audio.src = newPath;
    },
    play() {
      audio.play();
      playingInterval = window.setInterval(() => {
        onProgressCallbacks.forEach((cb) => cb(audio.currentTime));
        if (loopCallback) {
          loopCallback(audio.currentTime);
        }
      }, pollingInterval);
    },
    pause() {
      audio.pause();
      clearInterval(playingInterval);
    },
    seek(time: number) {
      audio.currentTime = time;
    },
    setPlaybackSpeed(playbackSpeed: number) {
      const clamped = clamp(playbackSpeed, 0.01, 4.0);
      audio.playbackRate = clamped;
    },
    setLoop(start: number, end: number) {
      audio.currentTime = start;
      loopCallback = (currentTime: number) => {
        if (currentTime >= end) {
          audio.currentTime = start;
        }
      };
    },
    clearLoop() {
      loopCallback = null;
    },
    onProgress(cb: Function) {
      onProgressCallbacks.push(cb);
    },
    getDuration() {
      return audio.duration;
    },
    setVolume(volume: number) {
      audio.volume = volume;
    },
  };
};
