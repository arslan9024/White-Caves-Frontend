import React, { memo, useState } from 'react';
import { Mic, Square } from 'lucide-react';

interface Props {
  onRecorded: (durationSec: number) => void;
}

export const LindaLiveAudioRecorder: React.FC<Props> = memo(({ onRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [sec, setSec] = useState(0);

  const startRecord = () => {
    setRecording(true);
    setSec(0);
  };

  const stopRecord = () => {
    setRecording(false);
    onRecorded(sec || 5);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {recording ? (
        <button
          onClick={stopRecord}
          style={{
            background: '#FF5252',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <Square size={12} />
        </button>
      ) : (
        <button
          onClick={startRecord}
          style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}
        >
          <Mic size={16} />
        </button>
      )}
      {recording && (
        <span style={{ fontSize: '11px', color: '#FF5252' }}>
          Recording... 0:{sec < 10 ? `0${sec}` : sec}
        </span>
      )}
    </div>
  );
});

export default LindaLiveAudioRecorder;
