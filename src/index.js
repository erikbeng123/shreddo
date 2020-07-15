import React from "react";
import ReactDOM from "react-dom";

import PlayerPage from "./pages/player/PlayerPage.jsx";
import testMp3 from "../test.mp3";
const testSong = new Audio(testMp3);
const App = () => (
  <div>
    <PlayerPage audio={testSong}>
      <div>VISUALIZER</div>
    </PlayerPage>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
