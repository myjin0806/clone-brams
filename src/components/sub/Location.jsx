import React from 'react'

const Location = () => {
  return (
    <section className='location inner'>
      <h2>Location</h2>
      <div className="location-wrap">
        <ul>
          <li>
            <h3>구관[본사]</h3>
            <p>경기도 광주시 오포읍 오포로 498번길 21</p>
          </li>
          <li>
            <h3>신관 [고객센터]</h3>
            <p>경기도 용인시 처인구 모현읍 곡현로 752</p>
          </li>
          <li>
            <h3>Tel</h3>
            <p>031-766-3993 (평일 09:00 - 18:00 / 토, 일, 공휴일 휴무)</p>
          </li>
          <li>
            <h3>E-mail</h3>
            <p>brams@ebrams.co.kr</p>
          </li>
        </ul>
        <div className="map">
          MAP
        </div>
      </div>
    </section>
  )
}

export default Location