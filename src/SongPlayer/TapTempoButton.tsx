import React from "react";
import styles from "./SongPlayer.module.scss";

const RESET_TIMEOUT = 3000;

const calcAverage = (arr: Array<number>) => {
  if (arr.length < 2) return 0;
  const diffs = [];
  let [tmp, ...rest] = arr;
  for (const num of rest) {
    diffs.push(num - tmp);
    tmp = num;
  }
  const avg = diffs.reduce((acc, x) => acc + x, 0) / diffs.length;
  const bpm = 60 / (avg / 1000);
  return Math.round(bpm);
};

export const TapTempoButton = () => {
  const [clicks, setClicks] = React.useState<Array<number>>([]);
  let timer: number;

  React.useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setClicks([]);
    }, RESET_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [clicks]);

  const handleClick = () => {
    if (clicks.length < 10) {
      setClicks([...clicks, Date.now()]);
    } else {
      setClicks([...clicks.slice(1), Date.now()]);
    }
  };

  return (
    <button onClick={handleClick} className={styles.tapTempoButton}>
      Tap Tempo {calcAverage(clicks)}
    </button>
  );
};
