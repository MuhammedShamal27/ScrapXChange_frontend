import React from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder';


const VoiceRecorder = ({ onRecordingComplete }) => {

    const handleRecordingStart = () => {
        console.log("Recording started");
      };
    
    const handleRecordingComplete = (blob) => {
    console.log("Recording ended, audio blob created:", blob);
    onRecordingComplete(blob);
    };
    
  return (
    <>
    <AudioRecorder
    //   onRecordingComplete={onRecordingComplete}
    onRecordingStart={handleRecordingStart}
    onRecordingComplete={handleRecordingComplete}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadOnSavePress={false}
      showVisualizer={true}
      downloadFileExtension="webm"
      onNotAllowedOrFound={()=>alert("Microphone access denied or not found")}
    />
  </>
  )
}

export default VoiceRecorder