import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../components/common/Title';
import ProductCard from '../components/common/ProductCard';
import Products from '../data/Products.json';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryCategory = queryParams.get('category'); // URL에서 카테고리 값 읽기
  const [activeTab, setActiveTab] = useState(queryCategory || ''); // URL 기반 초기 상태 설정
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 12; // 한 페이지에 보여줄 상품 개수
  const categories = ["안마의자", "등마사지기", "다리마사지기", "발마사지기", "소형마사지기", "EMS마사지기", "기타제품", "소모품"];

  // 필터링 로직: activeTab이 빈 문자열이면 모든 제품을 표시
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

  // 각 카테고리의 상품 개수 계산
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = Products.filter(product => product.type === category).length;
    return acc;
  }, {});

  // URL 쿼리 파라미터로 페이지 진입 시 activeTab 설정
  useEffect(() => {
    if (queryCategory) {
      setActiveTab(queryCategory);
    }
  }, [queryCategory]);

  return (
    <div className="products inner">
      <Title title="Product" showlink={false} />
      {/* 탭 메뉴 */}
      <div className="tab-menu">
        {categories.map((category) => (
          <div
            key={category}
            className={activeTab === category ? "active" : ""}
            onClick={() => handleTabClick(category)}
          >
            {category} ({categoryCounts[category]})
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
