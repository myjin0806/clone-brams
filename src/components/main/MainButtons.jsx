import React from 'react'
import { Link } from 'react-router-dom'

const MainButtons = () => {
  return (
    <section className='main-buttons inner'>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_01.jpg" alt="안마의자" />
          <p>안마의자</p>
        </Link>
      </div>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_02.png" alt="렌탈서비스" />
          <p>렌탈서비스</p>
        </Link>
      </div>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_03.jpg" alt="체험매장" />
          <p>체험매장</p>
        </Link>
      </div>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_04.png" alt="이벤트" />
          <p>이벤트</p>
        </Link>
      </div>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_05.png" alt="매뉴얼" />
          <p>매뉴얼</p>
        </Link>
      </div>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_06.png" alt="배송 및 A/S" />
          <p>배송 및 A/S</p>
        </Link>
      </div>
      <div className='main-button'>
        <Link to="">
          <img src="images/main_btns_07.png" alt="클린케어서비스" />
          <p>클린케어서비스</p>
        </Link>
      </div>
    </section>
  )
}

export default MainButtons