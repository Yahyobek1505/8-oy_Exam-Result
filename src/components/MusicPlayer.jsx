import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayer = ({ src }) => {
  return (
    <div className="player w-full bottom-0 sticky">
      <AudioPlayer
        autoPlay
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        showSkipControls={true}
        showJumpControls={true}
      />
    </div>
  );
};

export default MusicPlayer;
