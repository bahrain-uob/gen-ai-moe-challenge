import React from 'react';
import WaveSurferComponent from './waveformComponent';

export const ok: React.FC = () => {
  const audioUrl = 'add an s3 audio link here';

  return (
    <div>
      <h1>Audio</h1>
      <WaveSurferComponent audioUrl={audioUrl} />
    </div>
  );
};
export default ok;
