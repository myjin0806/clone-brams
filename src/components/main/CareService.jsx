import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../common/Title';

const CareService = () => {
  return (
    <section className='care-service inner'>
      <Link to="/about">
        <div className="care-banner">
          <img src="images/care_banner_01.jpg" alt="케어 서비스 배너" />
          <div className="banner-title">
            <p>Embrace Comfort with BRAMS</p>
            <h2>지친 나를 안아주는 브람스</h2>
            <span>EXPERIENCE RELAXATION</span>
          </div>
        </div>
      </Link>
      <div className="service-wrap">
        <div className="service-banner">
          <img src="images/care_banner_02.jpg" alt="브람스 제품 매뉴얼" />
        </div>
        <div className="service-banner">
          <img src="images/care_banner_03.jpg" alt="배송 및 A/S 안내" />
        </div>
        <div className="brams-news">
          <Title title="Brams News" showLink={true} linkTo=''/>
          <ul>
            <li>
              <Link title=''><span>6</span>브람스안마의자, 코스트코 부산점서 로드쇼 진행 브람스안마의자, 코스트코 부산점서 로드쇼 진행</Link>
            </li>
            <li>
              <Link title=''><span>5</span>브람스안마의자, 코스트코 부산점서 로드쇼 진행</Link>
            </li>
            <li>
              <Link title=''><span>4</span>브람스안마의자, 자동차 애프터마켓 전시회 '2023 오토살롱위크' 참가</Link>
            </li>
            <li>
              <Link title=''><span>3</span>	브람스안마의자, 현대시티몰 가든파이브점 신규 매장 오픈</Link>
            </li>
            <li>
              <Link title=''><span>2</span>브람스안마의자, 스타필드 하남점에 신규 매장 오픈</Link>
            </li>
            <li>
              <Link title=''><span>1</span>브람스안마의자, 스마트디바이스 및 소형가전 전시회 '키타스2023' 참가</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CareService