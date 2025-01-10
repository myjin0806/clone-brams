import React, { useState } from 'react'
import LeftBoard from '../components/sub/LeftBoard';
import SubTitle from '../components/common/SubTitle';
import Manual from '../data/Manual.json'

const ManualPage = () => {
  // 페이지네이션
  const itemsPerPage = 8;
  const [currentManualPage, setCurrentManualPage] = useState(1);

  const indexOfLastManual = currentManualPage * itemsPerPage;
  const indexOfFirstManual = indexOfLastManual - itemsPerPage;
  const currentManual = Manual.slice(indexOfFirstManual, indexOfLastManual);

  const totalManualPages = Math.ceil(Manual.length / itemsPerPage);

  const goToManualPage = (page) => {
    if (page >= 1 && page <= totalManualPages) {
      setCurrentManualPage(page);
    }
  };

      
  return (
    <div className='manual'>
      <div className="manual-inner inner">
        <LeftBoard />
        <div className="right-content">
          <SubTitle title="매뉴얼다운로드"/>
          <table className='sub-table'>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {currentManual.map((news, index)=>(
                <tr key={index}>
                  <td className='number'>{news.id}</td>
                  <td className='subject'>{news.title}{news.isAtt ? (<img src="/images/icon_att.png" alt="파일첨부" />) : ""}</td>
                  <td className='author'>{news.author}</td>
                  <td className='date'>{news.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 페이지네이션 */}
          <div className="pagination">
            <button onClick={() => goToManualPage(1)} disabled={currentManualPage === 1}>
              <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
            </button>
            <button onClick={() => goToManualPage(currentManualPage - 1)} disabled={currentManualPage === 1}>
              <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
            </button>
            {Array.from({ length: totalManualPages }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => goToManualPage(i + 1)}
                className={`page-item ${currentManualPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </div>
            ))}
            <button onClick={() => goToManualPage(currentManualPage + 1)} disabled={currentManualPage === totalManualPages}>
              <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
            </button>
            <button onClick={() => goToManualPage(totalManualPages)} disabled={currentManualPage === totalManualPages}>
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

export default ManualPage