import React, { useState } from 'react'
import LeftBoard from '../components/sub/LeftBoard'
import SubTitle from '../components/common/SubTitle'
import Announcements from '../data/Announcements.json'

const AnnouncementsPage = () => {

  // 페이지네이션
  const itemsPerPage = 8;
  const [currentAnnouncementsPage, setCurrentAnnouncementsPage] = useState(1);

  const indexOfLastAnnouncements = currentAnnouncementsPage * itemsPerPage;
  const indexOfFirstAnnouncements = indexOfLastAnnouncements - itemsPerPage;
  const currentAnnouncements = Announcements.slice(indexOfFirstAnnouncements, indexOfLastAnnouncements);

  const totalAnnouncementsPages = Math.ceil(Announcements.length / itemsPerPage);

  const goToAnnouncementsPage = (page) => {
    if (page >= 1 && page <= totalAnnouncementsPages) {
      setCurrentAnnouncementsPage(page);
    }
  };

  return (
    <div className='announcements'>
      <div className="announcements-inner inner">
        <LeftBoard />
        <div className="right-content">
          <SubTitle title="공지사항"/>
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
          {/* 공지사항 테이블 */}
          <table className='sub-table'>
            <tbody>
              <tr>
                <td className='ann'>공지</td>
                <td className='subject'>브람스안마의자와 성공의 길로 함께 할 대리점을 모집합니다.</td>
                <td className='author'>케이디자인</td>
                <td className='date'>2024.11.13</td>
              </tr>
              <tr>
                <td className='ann'>공지</td>
                <td className='subject'>건강한 삶을 위한 안마의자 안전 사용 캠페인!</td>
                <td className='author'>케이디자인</td>
                <td className='date'>2024.11.13</td>
              </tr>
              {currentAnnouncements.map((ann, index)=>(
                <tr key={index}>
                  <td className='number'>{ann.number}</td>
                  <td className='subject'>{ann.title}</td>
                  <td className='author'>{ann.author}</td>
                  <td className='date'>{ann.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 페이지네이션 */}
          <div className="pagination">
            <button onClick={() => goToAnnouncementsPage(1)} disabled={currentAnnouncementsPage === 1}>
              <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
            </button>
            <button onClick={() => goToAnnouncementsPage(currentAnnouncementsPage - 1)} disabled={currentAnnouncementsPage === 1}>
              <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
            </button>
            {Array.from({ length: totalAnnouncementsPages }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => goToAnnouncementsPage(i + 1)}
                className={`page-item ${currentAnnouncementsPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </div>
            ))}
            <button onClick={() => goToAnnouncementsPage(currentAnnouncementsPage + 1)} disabled={currentAnnouncementsPage === totalAnnouncementsPages}>
              <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
            </button>
            <button onClick={() => goToAnnouncementsPage(totalAnnouncementsPages)} disabled={currentAnnouncementsPage === totalAnnouncementsPages}>
              <img src="/images/ic_arr_pag_next.svg" alt="가장 뒤로" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementsPage