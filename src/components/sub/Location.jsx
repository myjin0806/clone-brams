import React, { useEffect } from 'react';

const Location = () => {
  useEffect(() => {
    // 카카오맵 API 스크립트 로드 확인
    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=4e7aaf58f204e63b2c7429a70e212b71";
      document.body.appendChild(script);

      script.onload = () => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.349370, 127.229967),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
      };
    } else {
      // 이미 로드된 경우 바로 맵 생성
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.349370, 127.229967),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
    }
  }, []);

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
        <div id="map" className="map"></div>
      </div>
    </section>
  );
};

export default Location;
