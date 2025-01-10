import React, { useState } from 'react'
import LeftBoard from '../components/sub/LeftBoard'
import SubTitle from '../components/common/SubTitle'
import WithBrams from '../data/WithBrams.json'

const WithBramsPage = () => {
  // 페이지네이션
  const itemsPerPage = 12;
  const [currentWithBramsPage, setCurrentWithBramsPage] = useState(1);

  const indexOfLastWithBrams = currentWithBramsPage * itemsPerPage;
  const indexOfFirstWithBrams = indexOfLastWithBrams - itemsPerPage;
  const currentWithBrams = WithBrams.slice(indexOfFirstWithBrams, indexOfLastWithBrams);

  const totalWithBramsPages = Math.ceil(WithBrams.length / itemsPerPage);

  const goToWithBramsPage = (page) => {
    if (page >= 1 && page <= totalWithBramsPages) {
      setCurrentWithBramsPage(page);
    }
  };

      
  return (
    <div className='withbrams'>
      <div className="withbrams-inner inner">
        <LeftBoard />
        <div className="right-content">
          <SubTitle title="WITH 브람스"/>
          <div className="img-gallery">
            {currentWithBrams.reverse().map((item, index)=>(
              <div className='gallery-item' key={index}>
                <img src={`/images/${item.image}`} alt={item.title} />
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
          {/* 페이지네이션 */}
          <div className="pagination">
            <button onClick={() => goToWithBramsPage(1)} disabled={currentWithBramsPage === 1}>
              <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
            </button>
            <button onClick={() => goToWithBramsPage(currentWithBramsPage - 1)} disabled={currentWithBramsPage === 1}>
              <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
            </button>
            {Array.from({ length: totalWithBramsPages }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => goToWithBramsPage(i + 1)}
                className={`page-item ${currentWithBramsPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </div>
            ))}
            <button onClick={() => goToWithBramsPage(currentWithBramsPage + 1)} disabled={currentWithBramsPage === totalWithBramsPages}>
              <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
            </button>
            <button onClick={() => goToWithBramsPage(totalWithBramsPages)} disabled={currentWithBramsPage === totalWithBramsPages}>
              <img src="/images/ic_arr_pag_next.svg" alt="가장 뒤로" />
            </button>
          </div>
          {/* 검색창 */}
          <div className="search-wrap">
            <div>
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
            </div>
            <div>
              <input type="text" id='search' placeholder='내용을 입력하세요' />
              <button>찾기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithBramsPage