import React from "react";

const SeekBar = ({ audio }) => {
  const dur = audio.duration ? audio.duration / 60 : 0;
  return (
    <div>
      <div className="seekbar">
        <div></div>
        <div>o</div>
      </div>
      <div>
        <span>{dur}</span>
      </div>
    </div>
  );
};

export default SeekBar;
