import React, { useRef } from 'react';
import Title from '../common/Title';
import ProductCard from '../common/ProductCard';
import Products from '../../data/Products.json';

const RentalService = () => {
  const sectionRef = useRef(null);

  const RentalProducts = Products.filter((product) => product.type === "렌탈");

  return (
    <section className="rental-service" ref={sectionRef}>
      <div className="rental-left">
        <img src="images/rental_banner.jpg" alt="렌탈 서비스 배너" />
        <div className="text">
          <h2>High-End Comfort, Affordable Price</h2>
          <p>고사양 브람스 안마의자를 부담 없는 가격으로 만나보세요!</p>
        </div>
      </div>
      <div className="rental-right">
        <Title title="Rental Service" showLink={true} linkTo="" />
        <div className="rental-products">
          {RentalProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RentalService;
