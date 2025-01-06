import React, { useState } from 'react';
import Title from '../components/common/Title';
import ProductCard from '../components/common/ProductCard';
import Products from '../data/Products.json';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState(''); // 초기 상태 빈 문자열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 12; // 한 페이지에 보여줄 상품 개수
  const categories = ["안마의자", "등마사지기", "다리마사지기", "소형마사지기", "EMS마사지기", "기타제품", "소모품"];

  // 필터링 로직 수정: activeTab이 빈 문자열이면 모든 제품을 표시
  const filteredProducts = activeTab
    ? Products.filter((product) => product.type === activeTab)
    : Products;

  // 페이지네이션을 위한 상품 목록 슬라이싱
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleTabClick = (category) => {
    setActiveTab(category); // 탭 클릭 시 activeTab 업데이트
    setCurrentPage(1); // 카테고리 변경 시 페이지를 1로 리셋
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호를 변경
  };

  // 페이지네이션 처리
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // "가장 앞으로", "이전", "다음", "가장 뒤로" 버튼 로직
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(pageNumbers.length);
  const goToPrevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  const goToNextPage = () => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length);

  return (
    <div className="products inner">
      <Title title="Product" showlink={false} />
      {/* 탭 메뉴 */}
      <div className="tab-menu">
        {categories.map((category) => (
          <div
            key={category} // key 추가
            className={activeTab === category ? "active" : ""}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      {/* 수량 */}
      <div className="items-count">
        <div className="count">
          {filteredProducts.length}개의 상품
        </div>
      </div>
      {/* 상품 리스트 */}
      <div className="tab-item-list">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          <img src="images/ic_arr_pag_prev.svg" alt="가장 앞으로" />
        </button>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          <img src="images/ic_arr_pag_left.svg" alt="앞으로" />
        </button>
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </div>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === pageNumbers.length}>
          <img src="images/ic_arr_pag_right.svg" alt="뒤로" />
        </button>
        <button onClick={goToLastPage} disabled={currentPage === pageNumbers.length}>
          <img src="images/ic_arr_pag_next.svg" alt="가장 뒤로" />
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
