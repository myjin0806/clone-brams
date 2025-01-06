import React from 'react'
/* components */
import MainVisual from '../components/main/MainVisual'
import MainButtons from '../components/main/MainButtons'
import MdsPick from '../components/main/MdsPick'
import Recommend from '../components/main/Recommend'
import BramsStory from '../components/main/BramsStory'
import RentalService from '../components/main/RentalService'
import CareService from '../components/main/CareService'
import MainBanner from '../components/main/MainBanner'
import ExperienceStore from '../components/main/ExperienceStore'
import CommunityBanner from '../components/main/CommunityBanner'


const HomePage = () => {
  return (
    <div className='home'>
      <MainVisual />
      <MainButtons />
      <MdsPick />
      <Recommend />
      <BramsStory />
      <RentalService />
      <CareService />
      <MainBanner />
      <ExperienceStore />
      <CommunityBanner />
    </div>
  )
}

export default HomePage