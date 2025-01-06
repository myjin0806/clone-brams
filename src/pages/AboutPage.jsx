import React from 'react'
import AboutUs from '../components/sub/AboutUs'
import Works from '../components/sub/Works'
import History from '../components/sub/History'
import Location from '../components/sub/Location'

const AboutPage = () => {
  return (
    <div className='about'>
      <AboutUs />
      <Works />
      <History />
      <Location />
    </div>
  )
}

export default AboutPage