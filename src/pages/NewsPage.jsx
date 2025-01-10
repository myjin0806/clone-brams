import React, { useState } from 'react'
import LeftBoard from '../components/sub/LeftBoard'
import SubTitle from '../components/common/SubTitle'
import News from '../data/News.json'

const NewsPage = () => {
      // 페이지네이션
      const itemsPerPage = 10;
      const [currentNewsPage, setCurrentNewsPage] = useState(1);
    
      const indexOfLastNews = currentNewsPage * itemsPerPage;
      const indexOfFirstNews = indexOfLastNews - itemsPerPage;
      const currentNews = News.slice(indexOfFirstNews, indexOfLastNews);
    
      const totalNewsPages = Math.ceil(News.length / itemsPerPage);
    
      const goToNewsPage = (page) => {
        if (page >= 1 && page <= totalNewsPages) {
          setCurrentNewsPage(page);
        }
      };

  return (
    <div className='news'>
      <div className="news-inner inner">
        <LeftBoard />
        <div className="right-content">
          <SubTitle title="보도자료"/>
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
              {currentNews.map((news, index)=>(
                <tr key={index}>
                  <td className='number'>{news.id}</td>
                  <td className='subject'>{news.title}</td>
                  <td className='author'>{news.author}</td>
                  <td className='date'>{news.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 페이지네이션 */}
          <div className="pagination">
            <button onClick={() => goToNewsPage(1)} disabled={currentNewsPage === 1}>
              <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
            </button>
            <button onClick={() => goToNewsPage(currentNewsPage - 1)} disabled={currentNewsPage === 1}>
              <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
            </button>
            {Array.from({ length: totalNewsPages }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => goToNewsPage(i + 1)}
                className={`page-item ${currentNewsPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </div>
            ))}
            <button onClick={() => goToNewsPage(currentNewsPage + 1)} disabled={currentNewsPage === totalNewsPages}>
              <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
            </button>
            <button onClick={() => goToNewsPage(totalNewsPages)} disabled={currentNewsPage === totalNewsPages}>
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

export default NewsPage