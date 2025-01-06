import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'; // 채워진 하트 아이콘
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'; // 빈 하트 아이콘
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, images, description, price, isBest, isSale, isNew } = product;
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => setLiked(!liked);

  const handleMouseEnter = () => {
    if (images && images.length > 1) {
      setCurrentImageIndex(images.length - 1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0); 
  };

  const formattedPrice = price ? price.toLocaleString() : '가격 미제공';

  return (
    <Link to={`/product/${id}`}>
      <div className='product-card'>
        <div
          className='product-image'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-container">
            <img src={`/images/${images[currentImageIndex]}`} alt={name} className="image" />
          </div>
        </div>
        <div className="product-desc">
          <div className="product-title">
            <h2>{name}</h2>
            <FontAwesomeIcon
              icon={liked ? faHeartSolid : faHeartRegular} // 조건에 맞는 아이콘 선택
              className={`icon heart-icon ${liked ? 'active' : ''}`}
              onClick={handleLike}
            />
          </div>
          <p>{description}</p>
          <h3>{formattedPrice}원</h3>
          <div className="btn-wraps">
            {isBest ? (<img src="/images/custom_best.png" alt="베스트 아이콘" />) : ''}
            {isSale ? (<img src="/images/custom_sale.png" alt="세일 아이콘" />) : ''}
            {isNew ? (<img src="/images/custom_best.png" alt="신제품 아이콘" />) : ''}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;