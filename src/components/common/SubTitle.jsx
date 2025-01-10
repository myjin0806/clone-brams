import React from 'react'
import { Link } from 'react-router-dom'

const SubTitle = ({title}) => {
  return (
    <div className='sub-title'>
      <h2>{title}</h2>
      <div className="breadcrumb">
        <Link to="/"><img src="/images/ic_home.svg" alt="홈 아이콘" /></Link>
        <em> > </em>
        고객서비스
        <em> > </em>
        <span>{title}</span>
      </div>
    </div>
  )
}

export default SubTitle