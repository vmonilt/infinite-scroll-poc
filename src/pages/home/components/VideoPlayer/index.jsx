import React, { useState, useRef, useEffect } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { HiSpeakerWave, HiSpeakerXMark, HiPlay, HiPause } from 'react-icons/hi2';

import './style/style.css'

const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
      setIsPlaying(true)
    } else {
      if (videoRef.current.play) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false)
      }
    }
  }, [isVisible]);

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true)
    } else {
      videoRef.current.pause();
      setIsPlaying(false)
    }
  }

  const { isSoundOn, videoUrl, handleSound } = props;
  return (
    <div className='video-container'>
      <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
        <video
        ref={videoRef}
        src={videoUrl} 
        autoPlay
        muted = {!isSoundOn}
        loop
        controls
        // onClick={handleVideoClick}
      />
      </VisibilitySensor>
      <div className='control-container'>
        <button className='video-status-icon' onClick={handleVideoClick}>{isPlaying ? <HiPause aria-hidden = {true}/> : <HiPlay aria-hidden = {true} />}</button>
        <button className='video-sound-icon' onClick={handleSound}>{isSoundOn ? <HiSpeakerWave /> :  <HiSpeakerXMark />}</button>
      </div>
    </div >
  );
};

export default VideoPlayer;