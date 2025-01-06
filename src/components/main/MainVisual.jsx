import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainVisual = () => {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [cursorStyle, setCursorStyle] = useState({ x: 0, y: 0, visible: false });

  const slides = [1, 2, 3];

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = (e) => {
    setCursorStyle({ x: e.clientX, y: e.clientY, visible: true });
  };

  const handleMouseLeave = () => {
    setCursorStyle((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section className="main-visual">
      {/* Swiper */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setCurrentPage(swiper.activeIndex + 1);
        }}
        onProgress={(swiper, progress) => {
          setProgress(progress);
        }}
      >
        <SwiperSlide>
          <img src="images/main_visual_01.jpg" alt="" />
          <div className="main-title">
            <span>
              각도 조절로 생활의 영역을 넓히다, 리클라이닝 하우징 소파
            </span>
            <h2>
              RECLINING<br/>HOUSING SOFA
            </h2>
            <p>
              다리를 뻗을 때마다 스툴이나 탁자를 찾는 번거로움,<br/>
              이젠 이별할 시간입니다.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/main_visual_02.jpg" alt="" />
          <div className="main-title">
            <span>
              내 몸에 맞춘 휴식 바이오 테크놀로지, 골든 이글 바이오
            </span>
            <h2>
              GOLDEN EAGLE BIO
            </h2>
            <p>
              생체 공학적 원리를 적용한 통합건강 관리 안마의자<br/>
              BRAMS-K8I722NC
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="images/main_visual_01.jpg" alt="" />
          <div className="main-title">
            <span>
              각도 조절로 생활의 영역을 넓히다, 리클라이닝 하우징 소파
            </span>
            <h2>
              RECLINING<br/>HOUSING SOFA
            </h2>
            <p>
              다리를 뻗을 때마다 스툴이나 탁자를 찾는 번거로움,<br/>
              이젠 이별할 시간입니다.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Hover areas */}
      <div
        className="hover-area left"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <div
        className="hover-area right"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Controls */}
      <div className="swiper-controls">
        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        {/* Pagination numbers */}
        <div className="pagination-numbers">
          <span>{currentPage}</span>
          <span>|</span>
          <span>{slides.length}</span>
        </div>

        {/* Autoplay toggle button */}
        <div className="autoplay-controls">
          <button onClick={toggleAutoplay}>
            {isPlaying ? (
              <img src="images/btn_pause.png" alt="Pause" />
            ) : (
              <img src="images/btn_play.png" alt="Play" />
            )}
          </button>
        </div>
      </div>

      {/* Custom cursor */}
      <div
        className={`custom-cursor ${cursorStyle.visible ? 'visible' : ''}`}
        style={{
          left: `${cursorStyle.x}px`,
          top: `${cursorStyle.y}px`,
        }}
      >
        <button>{cursorStyle.visible ? '→' : ''}</button>
      </div>
    </section>
  );
};

export default MainVisual;
