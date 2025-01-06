import React, { useState } from 'react'

const ProductQna = ({qnas}) => {
  // 페이지네이션
  const itemsPerPage = 5;
  const [currentQnaPage, setCurrentQnaPage] = useState(1);

  const indexOfLastQna = currentQnaPage * itemsPerPage;
  const indexOfFirstQna = indexOfLastQna - itemsPerPage;
  const currentQnas = qnas.slice(indexOfFirstQna, indexOfLastQna);

  const totalQnaPages = Math.ceil(qnas.length / itemsPerPage);

  const goToQnaPage = (page) => {
    if (page >= 1 && page <= totalQnaPages) setCurrentQnaPage(page);
  };

  return (
    <div id="product-qna" className="sec-03">
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>질문</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {currentQnas.map((qna) => (
          <tr key={qna.id}>
            <td className="no">{qna.id}</td>
            <td className="subject">{qna.question}</td>
            <td className="writter">{qna.writer}</td>
            <td className="date">{qna.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* btn */}
    <div className="product-btn-wraps">
      <div className="float">
        <button className="white">전체보기</button>
        <button className="black">상품문의쓰기</button>
      </div>
    </div>
    {/* 페이지네이션 */}
    <div className="pagination">
      <button onClick={() => goToQnaPage(1)} disabled={currentQnaPage === 1}>
        <img src="/images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
      </button>
      <button onClick={() => goToQnaPage(currentQnaPage - 1)} disabled={currentQnaPage === 1}>
        <img src="/images/ic_arr_pag_left.svg" alt="앞으로" />
      </button>
      {Array.from({ length: totalQnaPages }, (_, i) => (
        <div
          key={i + 1}
          onClick={() => goToQnaPage(i + 1)}
          className={`page-item ${currentQnaPage === i + 1 ? 'active' : ''}`}
        >
          {i + 1}
        </div>
      ))}
      <button onClick={() => goToQnaPage(currentQnaPage + 1)} disabled={currentQnaPage === totalQnaPages}>
        <img src="/images/ic_arr_pag_right.svg" alt="뒤로" />
      </button>
      <button onClick={() => goToQnaPage(totalQnaPages)} disabled={currentQnaPage === totalQnaPages}>
        <img src="/images/ic_arr_pag_next.svg" alt="가장 뒤로" />
      </button>
    </div>
    </div>
  )
}

export default ProductQna