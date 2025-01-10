import React, { useEffect } from 'react';

const Location = () => {
  useEffect(() => {
    // 카카오맵 스크립트가 로드되었는지 확인
    if (window.kakao) {
      var container = document.getElementById('map');
      var options = {
        center: new window.kakao.maps.LatLng(37.349370, 127.229967),
        level: 3
      };
      var map = new window.kakao.maps.Map(container, options);
    } else {
      console.error('카카오맵 스크립트가 로드되지 않았습니다.');
    }
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 마운트될 때만 실행되도록 설정

  return (
    <section className="location inner">
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
        <div className="map" id="map"></div>
      </div>
    </section>
  );
};

export default Location;
