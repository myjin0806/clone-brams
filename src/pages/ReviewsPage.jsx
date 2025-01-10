import React, { useState } from 'react'
import Title from '../components/common/Title'
import Reviews from '../data/Reviews.json'

const ReviewsPage = () => {
    // 페이지네이션
    const itemsPerPage = 4;
    const [currentReivewsPage, setCurrentReivewsPage] = useState(1);
  
    const indexOfLastReivews = currentReivewsPage * itemsPerPage;
    const indexOfFirstReivews = indexOfLastReivews - itemsPerPage;
    const currentReivews = Reviews.slice(indexOfFirstReivews, indexOfLastReivews);
    const totalReivewsPages = Math.ceil(Reviews.length / itemsPerPage);
    
  
    const goToReivewsPage = (page) => {
      if (page >= 1 && page <= totalReivewsPages) {
        setCurrentReivewsPage(page);
      }
    };

  return (
    <div className='reviews'>
      <div className="reviews-inner inner">
        <Title title="Review" subtitle="실제 사용자의 솔직한 리뷰" />
        <div className="reviews-wrap">
          {currentReivews.map((review, index)=>(
            <div className='review' key={index}>
              <div className="review-img">
                <img src={`/images/${review.reviewImg}`} alt={review.product} />
              </div>
              <div className="review-text">
                <div className="product-info">
                  <img src={`/images/${review.productImg}`} alt={`${review.product} 리뷰`} />
                  <span>{review.product}</span>
                </div>
                <h3>{review.Title}</h3>
                <p>{review.Text}</p>
              </div>
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className="pagination">
          <button onClick={() => goToReivewsPage(1)} disabled={currentReivewsPage === 1}>
            <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
          </button>
          <button onClick={() => goToReivewsPage(currentReivewsPage - 1)} disabled={currentReivewsPage === 1}>
            <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
          </button>
          {Array.from({ length: totalReivewsPages }, (_, i) => (
            <div
              key={i + 1}
              onClick={() => goToReivewsPage(i + 1)}
              className={`page-item ${currentReivewsPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </div>
          ))}
          <button onClick={() => goToReivewsPage(currentReivewsPage + 1)} disabled={currentReivewsPage === totalReivewsPages}>
            <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
          </button>
          <button onClick={() => goToReivewsPage(totalReivewsPages)} disabled={currentReivewsPage === totalReivewsPages}>
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
  )
}

export default ReviewsPage