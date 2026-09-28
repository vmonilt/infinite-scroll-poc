import React, { useState, useRef, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import {
  HiSpeakerWave,
  HiSpeakerXMark,
  HiPlay,
  HiPause,
} from "react-icons/hi2";

import "./style/style.css";

const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const seekBarRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonClicked, setIsButtonClicked] = useState({
    isPlayIconClicked: false,
    isPauseIconClicked: false,
  });

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
      setIsPlaying(true);
      // const videoDataIndex = videoRef.current.getAttribute("videoindex");
      // props.handleCurrentActive(videoDataIndex);
    } else {
      if (videoRef.current.play) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsButtonClicked({
        isPlayIconClicked: true,
        isPauseIconClicked: false,
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsButtonClicked({
        isPlayIconClicked: false,
        isPauseIconClicked: true,
      });
    }
  };

  const videoTimeUpdate = () => {
    const video = videoRef.current;
    const seekBar = seekBarRef.current;
    const percentage = (video.currentTime / video.duration) * 100;
    seekBar.style.width = `${percentage}%`;
  };

  const { isSoundOn, videoUrl, handleSound, videoIndex } = props;
  const { isPauseIconClicked, isPlayIconClicked } = buttonClicked;

  return (
    <div className="video-container" data-index={videoIndex}>
      <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted={!isSoundOn}
          loop
          onClick={handleVideoClick}
          videoIndex={videoIndex}
          onTimeUpdate={videoTimeUpdate}
          preload="none" 
        />
      </VisibilitySensor>
      <div id="custom-seekbar">
        <span ref={seekBarRef}></span>
      </div>
      <div className="control-container">
        <button className="video-status-icon" onClick={handleVideoClick}>
          {isPlaying ? (
            <HiPause aria-hidden={true} />
          ) : (
            <HiPlay aria-hidden={true} />
          )}
        </button>
        <button className="video-sound-icon" onClick={handleSound}>
          {isSoundOn ? (
            <HiSpeakerWave aria-hidden={true} />
          ) : (
            <HiSpeakerXMark aria-hidden={true} />
          )}
        </button>
      </div>
      {isPlayIconClicked ? (
        <span className="animate-icon" onClick={handleVideoClick}>
          <HiPlay aria-hidden={true} />
        </span>
      ) : null}
      {isPauseIconClicked ? (
        <span className="animate-icon" onClick={handleVideoClick}>
          <HiPause aria-hidden={true} />
        </span>
      ) : null}
    </div>
  );
};

export default VideoPlayer;
