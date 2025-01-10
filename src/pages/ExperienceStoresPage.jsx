import React, { useState } from 'react';
import Title from '../components/common/Title';
import ExperienceStores from '../data/ExperienceStores.json';

const ExperienceStoresPage = () => {
  // 페이지네이션
  const itemsPerPage = 12;
  const [currentStoresPage, setCurrentStoresPage] = useState(1);

  const indexOfLastStores = currentStoresPage * itemsPerPage;
  const indexOfFirstStores = indexOfLastStores - itemsPerPage;
  const currentStores = ExperienceStores.slice(indexOfFirstStores, indexOfLastStores);

  const totalStoresPages = Math.ceil(ExperienceStores.length / itemsPerPage);

  const goToStoresPage = (page) => {
    if (page >= 1 && page <= totalStoresPages) {
      setCurrentStoresPage(page);
    }
  };

  return (
    <div className="experience-stores">
      <div className="experience-stores-inner inner">
        <Title title="Experience Store" subtitle="브람스 체험매장 안내입니다." />
        <div className="stores-wrap">
          {/* 페이지네이션 적용 */}
          {currentStores.map((store, index) => ( 
            <div className="store" key={index}>
              <div className="store-img">
                <img src={`images/${store.image}`} alt={store.name} />
              </div>
              <div className="store-info">
                <h3>{store.name}</h3>
                <h5>{store.date}</h5>
              </div>
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className="pagination">
          <button onClick={() => goToStoresPage(1)} disabled={currentStoresPage === 1}>
            <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
          </button>
          <button onClick={() => goToStoresPage(currentStoresPage - 1)} disabled={currentStoresPage === 1}>
            <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
          </button>
          {Array.from({ length: totalStoresPages }, (_, i) => (
            <div
              key={i + 1}
              onClick={() => goToStoresPage(i + 1)}
              className={`page-item ${currentStoresPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </div>
          ))}
          <button onClick={() => goToStoresPage(currentStoresPage + 1)} disabled={currentStoresPage === totalStoresPages}>
            <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
          </button>
          <button onClick={() => goToStoresPage(totalStoresPages)} disabled={currentStoresPage === totalStoresPages}>
            <img src="/images/ic_arr_pag_next.svg" alt="가장 뒤로" />
          </button>
        </div>
        {/* 검색창 */}
        <div className="search-wrap">
          <select name="search_date" id="search-date">
            <option value="week">일주일</option>
            <option value="month">한달</option>
            <option value="month3">세달</option>
            <option value="all">전체</option>
          </select>
          <select name="search_date" id="search-key">
            <option value="subject">제목</option>
            <option value="content">내용</option>
            <option value="writer_name">글쓴이</option>
            <option value="member_id">아이디</option>
            <option value="nick_name">별명</option>
          </select>
          <input type="text" id='search' placeholder='내용을 입력하세요' />
          <button>찾기</button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStoresPage;