import React, { useState } from 'react';

import VideoPlayer from './components/VideoPlayer'

import { VIDEOS_DATA } from './duck/constants'

import './style/style.css'

const Home = () => {
  const [isSoundOn, setSoundOn] = useState(false);

  const handleSound = () => {
    setSoundOn((prevState) => !prevState)
    // console.log('sasd')
    // videoRef.current.muted = false
  }

  return <div className='short-video-container'>
    <div>
    {
      Array.isArray(VIDEOS_DATA) && VIDEOS_DATA.length && VIDEOS_DATA.map((item) => {
        return <VideoPlayer key = {item.sources} videoUrl={item.sources} isSoundOn = {isSoundOn} handleSound = {handleSound}/>
      })
    }
    </div>
  </div>
}

export default Home;