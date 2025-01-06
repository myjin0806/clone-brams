import React, { useState } from 'react';


const ProductReview = ({ reviews }) => {
  //페이지네이션
  const itemsPerPage = 5;
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  const indexOfLastReview = currentReviewPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalReviewPages = Math.ceil(reviews.length / itemsPerPage);

  const goToReviewPage = (page) => {
    if (page >= 1 && page <= totalReviewPages) setCurrentReviewPage(page);
  };

  return (
    <div id="product-review" className="sec-02">
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review) => (
            <tr key={review.id}>
              <td className="no">{review.id}</td>
              <td className="subject">{review.title}</td>
              <td className="writter">{review.author}</td>
              <td className="date">{review.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="product-btn-wraps">
        <div className="float">
          <button className="white">전체보기</button>
          <button className="black">상품후기쓰기</button>
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => goToReviewPage(1)} disabled={currentReviewPage === 1}>
          <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
        </button>
        <button onClick={() => goToReviewPage(currentReviewPage - 1)} disabled={currentReviewPage === 1}>
          <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
        </button>
        {Array.from({ length: totalReviewPages }, (_, i) => (
          <div
            key={i + 1}
            onClick={() => goToReviewPage(i + 1)}
            className={`page-item ${currentReviewPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </div>
        ))}
        <button onClick={() => goToReviewPage(currentReviewPage + 1)} disabled={currentReviewPage === totalReviewPages}>
          <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
        </button>
        <button onClick={() => goToReviewPage(totalReviewPages)} disabled={currentReviewPage === totalReviewPages}>
          <img src="/images/ic_arr_pag_next.svg" alt="가장 뒤로" />
        </button>
      </div>
    </div>
  );
};

export default ProductReview;
