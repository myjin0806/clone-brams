import React, { useEffect } from 'react';

const Location = () => {
  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인하는 함수
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
        } else {
          // 카카오맵 API 스크립트가 로드되지 않았다면, 스크립트를 추가
          const script = document.createElement('script');
          script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false'; // 여기에 실제 앱 키 넣어야 해
          script.onload = () => resolve(window.kakao);
          script.onerror = (error) => reject(error);
          document.head.appendChild(script);
        }
      });
    };

    // 카카오맵 로드 후 맵을 초기화
    loadKakaoMapScript()
      .then((kakao) => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.349370, 127.229967),
          level: 3
        };
        new kakao.maps.Map(container, options);
      })
      .catch((error) => {
        console.error('카카오맵 API 로드 실패:', error);
      });
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
