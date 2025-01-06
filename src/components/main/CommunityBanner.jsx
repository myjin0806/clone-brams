import React from 'react'
import { Link } from 'react-router-dom';

const CommunityBanner = () => {
  return (
    <section className='community-banner'>
      <Link to="">
        <img src="images/communication_01.jpg" alt="커뮤니티 배너" />
      </Link>
      <Link to="">
        <img src="images/communication_02.jpg" alt="커뮤니티 배너" />
      </Link>
    </section>
  )
}

export default CommunityBanner