import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

import VideoPlayer from "./components/VideoPlayer";

import { VIDEOS_DATA } from "./duck/constants";
import QuizItem from "./components/quiz";

import "./style/style.css";

const Home = () => {
  const [isSoundOn, setSoundOn] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const [activeVideoList, setActiveVideoList] = useState([]);
  const [totalFetchedVideo, setTotalFetchedVideo] = useState(0);
  const [isFirstTimeLoad, setFirstTimeLoad] = useState(true);

  const sliderRef = useRef();

  const handleSound = () => {
    setSoundOn((prevState) => !prevState);
  };

  const showVideo = () => {
    setShowVideos(true);
  };

  useEffect(() => {
    _fetchVideo(5, 0);
  }, []);

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      setActiveVideoList([]);
      setShowVideos(false);
      setTotalFetchedVideo(0);
    };
  }, []);

  const _fetchVideo = (videoToBeFetched, lastIndex) => {
    let videoData = [];
    for (let i = lastIndex; i < lastIndex + videoToBeFetched; i++) {
      if (VIDEOS_DATA[i]) {
        videoData.push(VIDEOS_DATA[i]);
      } else {
        break;
      }
    }
    setActiveVideoList((prevState) => [...prevState, ...videoData]);
    setTotalFetchedVideo(lastIndex + videoToBeFetched);
  };

  let slick_is_animating = false;

  // const handleCurrentActive = (index) => {
  //   console.log(index, "activeIndex");
  //   setCurrentActive(Number(index));
  // };

  // const handleScroll = () => {
  //   console.log(currentActive, "currentActive");

  //   if (currentActive >= VIDEOS_DATA.length) return;
  //   if (currentActive === 0) {
  //     setActiveVideoList([VIDEOS_DATA[0], VIDEOS_DATA[1]]);
  //   } else {
  //     if (isUpdating) return;

  //     // if (currentActive === activeVideoList.length - 1 && !isUpdating) {
  //     console.log("fetch");
  //     setUpdatingStatus(true);
  //     console.log(currentActive);
  //     // setActiveVideoList([
  //     //   ...activeVideoList,
  //     //   VIDEOS_DATA[currentActive+1],
  //     // ]);
  //     setUpdatingStatus(false);
  //   }
  // };

  const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const handleWheel = (e) => {
    slick_handle_wheel_event_debounced(e, slick_is_animating);
  };

  const slick_handle_wheel_event = (e, slick_is_animating) => {
    console.log("wheeel");
    // do not trigger a slide change if another is being animated
    if (!slick_is_animating) {
      // pick the larger of the two delta magnitudes (x or y) to determine nav direction
      var direction =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

      if (direction > 0) {
        // next slide
        sliderRef.current.slickNext();
      } else {
        // prev slide
        sliderRef.current.slickPrev();
      }
    }
  };

  // debounce the wheel event handling since trackpads can have a lot of inertia
  const slick_handle_wheel_event_debounced = debounce(
    slick_handle_wheel_event,
    100,
    true
  );

  const onAfterChange = (index) => {
    console.log("Slide after change " + index);
    slick_is_animating = false;
    if (isFirstTimeLoad) {
      setFirstTimeLoad(false);
    }

    if (activeVideoList.length - 2 === index) {
      _fetchVideo(5, totalFetchedVideo);
    }
  };

  const onBeforeChange = (index) => {
    if (isFirstTimeLoad) {
      setFirstTimeLoad(false);
    }

    console.log("Slide before change " + index);
    slick_is_animating = true;
  };

  const submitted = (index) => {

  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    touchMove: true,
    verticalSwiping: true,
    touchThreshold: 20,
  };

  return (
    <div className="short-video-container" onWheel={(e) => handleWheel(e)}>
      {
        !showVideos ? (
          <button onClick={showVideo}>Play Turtle-Reels</button>
        ) : (
          <>
            <Slider
              {...settings}
              ref={sliderRef}
              beforeChange={onBeforeChange}
              afterChange={onAfterChange}
            >
              {Array.isArray(activeVideoList) &&
                activeVideoList.length &&
                activeVideoList.map((item, index) => {
                  return item.type === "quiz" ? (
                    <QuizItem
                      items={item.questions}
//                      submitted={(index) => handleQuizSubmit(index)}
                    />
                    ) : (
                      <VideoPlayer
                        key={item.sources}
                        videoUrl={item.sources}
                        isSoundOn={isSoundOn}
                        handleSound={handleSound}
                        videoIndex={item.index}
                        // handleCurrentActive={handleCurrentActive}
                      />
                      )
                   })}
            </Slider>
            {isFirstTimeLoad ? (
              <div className="animate-scroll-up">
                <span>^</span>
                <span>Swipe up</span>
              </div>
            ) : null}
          </>
        )

        // <div onScroll={handleScroll} id="video-container">
        // <div>
        //   {Array.isArray(activeVideoList) &&
        //     activeVideoList.length &&
        //     activeVideoList.map((item, index) => {
        //       return (
        //         <VideoPlayer
        //           key={item.sources}
        //           videoUrl={item.sources}
        //           isSoundOn={isSoundOn}
        //           handleSound={handleSound}
        //           videoIndex={item.index}
        //           handleCurrentActive={handleCurrentActive}
        //         />
        //       );
        //     })}
        // </div>
        // <Slider {...settings}>
        // <div onScroll={handleScroll} id="video-container">
        //   {Array.isArray(activeVideoList) &&
        //     activeVideoList.length &&
        //     activeVideoList.map((item, index) => {
        //       return (
        //         <VideoPlayer
        //           key={item.sources}
        //           videoUrl={item.sources}
        //           isSoundOn={isSoundOn}
        //           handleSound={handleSound}
        //           videoIndex={item.index}
        //           handleCurrentActive={handleCurrentActive}
        //         />
        //       );
        //     })}
        // </div>
      }
    </div>
  );
};

export default Home;
