import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayer = ({ src }) => {
  return (
    <div className="player w-full bottom-0 sticky">
      <AudioPlayer
        src="https://p.scdn.co/mp3-preview/96339b4101e4bd8b7a08d104659f0084bf76e37f?cid=614e09a7ebe6421f8667d2abfd43685a"
        showSkipControls={true}
        showJumpControls={true}
      />
    </div>
  );
};

export default MusicPlayer;
