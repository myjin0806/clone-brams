import React from 'react'
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <section className='main-banner inner'>
      <Link to="">
        <img src="images/main_banner.jpg" alt="메인 배너" />
      </Link>
    </section>
  )
}

export default MainBanner