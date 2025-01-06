import React from 'react'
import Title from '../common/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const BramsStory = () => {
  return (
    <section className='brams-story'>
      <Title title="BRAMS Story" showLink={false}/>
      <Swiper
        spaceBetween={40}
        slidesPerView={2}
      >
        <SwiperSlide className='slide'>
          <a href="https://www.youtube.com/watch?v=CtTloo0U-1U" target="_blank"            rel="noopener noreferrer" >
            <img src="images/brams_story_01.svg" alt="브람스, 당신의 휴식을 위한 서사" />
            <p>브람스, 당신의 휴식을 위한 서사</p>
          </a>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <a href="https://www.youtube.com/watch?v=Q7-sgpuzGCE" target="_blank"            rel="noopener noreferrer" >
          <img src="images/brams_story_02.jpg" alt="브람스, 안마의자 이렇게 고르세요" />
            <p>브람스, 안마의자 이렇게 고르세요</p>
          </a>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <a href="https://www.youtube.com/watch?v=8NnjxlzXMQ8" target="_blank"            rel="noopener noreferrer" >
          <img src="images/brams_story_03.svg" alt="브람스, 다리마사지기의 명품, 각선미 스페셜" />
            <p>브람스, 다리마사지기의 명품, 각선미 스페셜</p>
          </a>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default BramsStory