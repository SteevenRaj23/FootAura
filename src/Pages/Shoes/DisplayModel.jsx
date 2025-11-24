import React from 'react'
import myVideo from '../../assets/Video/video1.mp4';
import myVideo2 from '../../assets/Video/video2.mp4';
import myVideo3 from '../../assets/Video/video3.mp4';
import myVideo4 from '../../assets/Video/video4.mp4';
import myVideo5 from '../../assets/Video/video5.mp4';

export default function DisplayModel() {
  return (
    <div className='flex gap-5 p-5'>
      <video width="250"  autoPlay loop muted>
        <source src={myVideo} type="video/mp4" />
      </video>
       <video width="250"  autoPlay loop muted>
        <source src={myVideo2} type="video/mp4" />
      </video>
      <video width="250"  autoPlay loop muted>
        <source src={myVideo3} type="video/mp4" />
      </video>
       <video width="250" height="500"  autoPlay loop muted>
        <source src={myVideo4} type="video/mp4" />
      </video>
       <video width="250" height="500"  autoPlay loop muted>
        <source src={myVideo5} type="video/mp4" />
      </video>
    </div>
  )
}
