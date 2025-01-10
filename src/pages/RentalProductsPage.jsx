import React, { useState } from 'react';
import Title from '../components/common/Title';
import ProductCard from '../components/common/ProductCard';
import Products from '../data/Products.json';

const RentalProductsPage = () => {
  const rentalProducts = Products.filter(
    (product) => product.type === "렌탈"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 페이지네이션을 위한 상품 목록 슬라이싱
  const indexOfLastRentalProduct = currentPage * itemsPerPage;
  const indexOfFirstRentalProduct = indexOfLastRentalProduct - itemsPerPage;
  const currentProducts = rentalProducts.slice(indexOfFirstRentalProduct, indexOfLastRentalProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호를 변경
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rentalProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(pageNumbers.length);
  const goToPrevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  const goToNextPage = () => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length);

  return (
    <div className="rental">
      <div className="rental-inner inner">
        <Title title="Rental" subtitle="고사양 브람스 안마의자를 부담없이 이용해보세요!" />
        <div className="rental-img">
          <img src="/images/rental.jpg" alt="렌탈 " />
        </div>
        {/* 수량 */}
        <div className="items-count">
          <div className="count">
            {rentalProducts.length}개의 상품
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
    </div>
  );
};

export default RentalProductsPage;
