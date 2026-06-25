"use client";
import React, { useRef, useState } from 'react';
import Style from './MerchantTestimonialVideos.module.scss';
import Image from 'next/image';

const MuteIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const UnmuteIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VideoCard = ({ videoSrc, placeholderImage, caption }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={Style.videoCard} data-animation="fade-up">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={placeholderImage}
        src={videoSrc}
      />
      <div className={Style.videoOverlay}></div>
      
      {/* Top right watermark logo */}
      <div className={Style.watermark}>
        <img src="/images/logo_icon.png" alt="Pay10 Logo" />
      </div>

      <div className={Style.bottomInfo}>
        <div className={Style.profileRow}>
          <div className={Style.avatar}>
            <img src="/images/logo_icon.png" alt="Pay10 Profile" />
          </div>
          <span className={Style.username}>pay10.uae</span>
          <button className={Style.followBtn}>Follow</button>
        </div>
        <div className={Style.caption}>
          {caption} <span className={Style.more}>... more</span>
        </div>
      </div>

      <div className={Style.controls} onClick={toggleMute}>
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </div>
    </div>
  );
};

const MerchantTestimonialVideos = () => {
  return (
    <section className={Style.videoSection}>
      <div className={Style.container}>
        
        <div className={Style.textContent} data-animation="fade-up">
          <h2>Don't take our word for it. Hear it from the merchants themselves.</h2>
          <p>
            From small retailers to enterprise brands &mdash; businesses across the UAE are choosing Pay10 for faster settlements, lower costs, and support that actually shows up.
          </p>
        </div>

        <div className={Style.videosGrid}>
          {/* Using the downloaded Instagram reels */}
          <VideoCard 
            videoSrc="/videos/testimonial_1.mp4" 
            placeholderImage="/images/placeholder_video_1.jpg"
            caption="No change? No problem. She's got Pay10."
          />
          <VideoCard 
            videoSrc="/videos/testimonial_2.mp4" 
            placeholderImage="/images/placeholder_video_2.jpg"
            caption="Queue cleared in just a few minutes."
          />
        </div>

      </div>
    </section>
  );
};

export default MerchantTestimonialVideos;
