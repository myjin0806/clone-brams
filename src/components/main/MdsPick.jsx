import React, { useState, useEffect } from 'react';
import Title from '../common/Title';
import ProductCard from '../common/ProductCard';
import Products from '../../data/Products.json';

const MdsPick = () => {
  const [activeTab, setActiveTab] = useState('안마의자');
  const [visibleCount, setVisibleCount] = useState(4);
  const cateories = ["안마의자", "등마사지기", "다리마사지기", "소형마사지기", "EMS마사지기"];

  // 탭 변경 시 visibleCount를 초기화
  useEffect(() => {
    setVisibleCount(4); 
  }, [activeTab]);

  const filteredProducts = Products.filter(
    (product) => product.type === activeTab // 필터링 기준 수정: 'category' -> 'type'
  );

  const handleTabClick = (category) => {
    setActiveTab(category); // 카테고리 변경
    setVisibleCount(4); // 탭 변경 시 visibleCount를 4로 리셋
  };

  return (
    <section className='mds-pick inner'>
      <Title title="Md's Pick Best Product" showLink={true} linkTo="" />
      {/* 탭 메뉴 */}
      <div className="tab-menu">
        {cateories.map((category) => {
          return (
            <div
              key={category} // key 추가
              className={activeTab === category ? "active" : ""}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </div>
          );
        })}
      </div>
      {/* 상품 리스트 */}
      {filteredProducts.length > 0 ? (
        <div className="tab-item-list">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      ):(
        <div className="no-products">추천 상품이 없어요😥</div>
      )}
    </section>
  );
};

export default MdsPick;
