import React from 'react'
import Title from '../common/Title';
import experienceStores from  '../../data/ExperienceStores.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';


const ExperienceStore = () => {
  return (
    <section className='experience-store inner'>
      <Title title="Experience Store" showLink={true} linkTo=""/>
      <Swiper
        modules={[ Scrollbar ]}
        spaceBetween={40}
        slidesPerView={3}
        loop={true}
        scrollbar={{ draggable: true }} 
      >
        {experienceStores.map((store, index)=>(
          <SwiperSlide className="slide" key={index}>
            <img src={`images/${store.image}`} alt= {store.name} />
            <span>{store.name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ExperienceStore