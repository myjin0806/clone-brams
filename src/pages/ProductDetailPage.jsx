import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../data/Products.json';
/* components */
import ProductReview from '../components/sub/ProductReview';
import ProductQna from '../components/sub/ProductQna';
import ProductInfo from '../components/sub/ProductInfo';
import { CartContext } from '../components/sub/CartContext';
/* icon */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faShareNodes, faX } from '@fortawesome/free-solid-svg-icons';
/* swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = Products.find((item) => item.id === parseInt(productId, 10));
  const { addToCart } = useContext(CartContext); // CartContext에서 addToCart 함수 가져오기

  const [liked, setLiked] = useState(false); // 좋아요 기능
  const handleLike = () => setLiked(!liked);
  const [scrollingDown, setScrollingDown] = useState(false); // 아래로 스크롤 체크
  const [prevScrollPos, setPrevScrollPos] = useState(0); // 이전 스크롤 위치
  const [activeSection, setActiveSection] = useState(''); // 현재 활성화된 섹션 ID
  const [selectedColor, setSelectedColor] = useState(''); // 상품 추가
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  //리뷰 데이터
  const reviews = [
    { id: 1, title: '구매 후기입니다:) 만족합니다.', author: '케*****', date: '2024.09.25' },
    { id: 2, title: '정말 좋은 제품이에요.', author: '김****', date: '2024.10.01' },
    { id: 3, title: '배송이 빨라서 좋았어요.', author: '이****', date: '2024.10.03' },
    { id: 4, title: '다음에 또 구매할게요!', author: '박****', date: '2024.10.05' },
    { id: 5, title: '제품 품질이 아쉬워요.', author: '정****', date: '2024.10.07' },
    { id: 6, title: '최고입니다!', author: '홍****', date: '2024.10.09' },
  ];
  // Q&A 데이터
  const qnas = [
    {
      id: 1,
      question: "제품의 크기가 어떻게 되나요?",
      writer: "김**",
      date: "2024.12.30",
      answer: "해당 제품의 크기는 가로 70cm, 세로 150cm, 높이 120cm입니다. 더 자세한 정보는 상품 상세페이지를 참고해주세요."
    },
    {
      id: 2,
      question: "이 제품은 AS가 가능한가요?",
      writer: "박**",
      date: "2024.12.09",
      answer: "네, 구매일로부터 1년간 무상 AS를 제공합니다. 자세한 내용은 고객센터로 문의해주세요."
    },
    {
      id: 3,
      question: "배송은 얼마나 걸리나요?",
      writer: "이**",
      date: "2024.11.28",
      answer: "일반적으로 배송은 결제일로부터 3~5일 정도 소요됩니다. 도서 산간 지역은 추가 시간이 필요할 수 있습니다."
    },
    {
      id: 4,
      question: "반품은 어떻게 진행되나요?",
      writer: "최**",
      date: "2024.11.14",
      answer: "제품 수령일로부터 7일 이내 반품 신청이 가능합니다. 단, 상품이 훼손되지 않아야 하며 왕복 배송비는 고객 부담입니다."
    },
    {
      id: 5,
      question: "제품 사용법을 어디서 볼 수 있나요?",
      writer: "윤**",
      date: "2024.10.26",
      answer: "제품과 함께 사용 설명서를 동봉해드립니다. 설명서를 분실하셨다면, 고객센터를 통해 요청하시면 PDF 파일로 다시 보내드립니다."
    }
  ];

  // 스크롤 방향에 따른 내비게이션 top 변경
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset; // 현재 스크롤 위치

    if (currentScrollPos > prevScrollPos) {
      setScrollingDown(true); // 아래로 스크롤
    } else {
      setScrollingDown(false); // 위로 스크롤
    }
    setPrevScrollPos(currentScrollPos); // 이전 스크롤 위치 업데이트

    // 섹션 위치 확인하여 active 클래스 부여
    const sections = document.querySelectorAll('.sec-01, .sec-02, .sec-03, .sec-04');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // 화면에 섹션이 50% 이상 보이면 active 클래스를 추가
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        setActiveSection(section.id);
      }
    });
  };

  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // 언마운트 시 이벤트 제거
    };
  }, [prevScrollPos]);

  // 카피
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다.');
      })
      .catch((err) => {
        alert('복사에 실패했습니다.' + err);
      });
  };
  const currentUrl = window.location.href;

  // 상품이 로드되었을 때만 가격 계산하도록 수정
  useEffect(() => {
    if (product && selectedColor) {
      setTotalPrice(quantity * product.price); // 컬러를 선택했을 때만 totalPrice 계산
    } else {
      setTotalPrice(0); // 컬러가 선택되지 않으면 0원
    }
  }, [product, selectedColor, quantity]);
  //상품이 로드되지않았을 때
  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  const { name, images, description, price, isBest, isSale, isNew, detail, color: productColors } = product;

  // 컬러 선택 핸들러
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    setQuantity(1); // 컬러 변경 시 수량 1로 초기화
    setTotalPrice(product.price); // 가격도 초기화
  };

  // 수량 증가/감소 핸들러
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1);
  };

  //선택 초기화 핸들러 
  const resetSelection = () => {
    setSelectedColor("")
    setQuantity(1);
    setTotalPrice(0);
  }
// 구매하기 버튼 클릭 이벤트
const handleBuyNow = () => {
  if (productColors.length > 0 && !selectedColor) {
    alert('옵션을 선택해주세요.');
  } else {
    alert('로그인 후 구매하실 수 있습니다.');
  }
};

// 장바구니 담기 버튼 클릭 이벤트
const handleAddToCart = () => {
  if (productColors.length > 0 && !selectedColor) {
    alert('옵션을 선택해주세요.');
    return;
  }
  const colorToAddToCart = productColors.length > 0 ? selectedColor : '';

  addToCart({ ...product, color: colorToAddToCart, quantity: quantity });
  alert('장바구니에 상품이 추가되었습니다.');
};

  return (
    <div className="product-detail inner">
      <div className="detail-left">
        {/* 이미지 갤러리 */}
        <div className="image-gallery">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={2}
            pagination={{
              type: 'progressbar',
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`/images/${image}`}
                  alt={`${name} - ${index + 1}`}
                  className="product-gallery-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 네비게이션 */}
        <div className="product-additional">
          <nav className="product-nav"
            style={{
              top: scrollingDown ? '0' : '70px'
            }}
          >
            <ul>
              <li><a href="#product-detail" className={activeSection === 'product-detail' ? 'active' : ''}>상세정보</a></li>
              <li><a href="#product-review" className={activeSection === 'product-review' ? 'active' : ''}>후기({reviews.length})</a></li>
              <li><a href="#product-qna" className={activeSection === 'product-qna' ? 'active' : ''}>문의({qnas.length})</a></li>
              <li><a href="#product-info" className={activeSection === 'product-info' ? 'active' : ''}>구매정보</a></li>
            </ul>
          </nav>
          {/* 상세정보 */}
          <div id="product-detail" className="sec-01">
            <img src={`/images/${detail}`} alt="" />
          </div>
          {/* 리뷰 */}
          <ProductReview reviews={reviews} />
          {/* Q&A */}
          <ProductQna qnas={qnas} />
          {/* 구매정보 */}
          <ProductInfo />
        </div>
      </div>
      <div className="detail-right">
        <div className="product-info">
          <div className="product-badge">
            {isBest ? (<img src="/images/custom_best.png" alt="베스트 아이콘" />) : ''}
            {isSale ? (<img src="/images/custom_sale.png" alt="세일 아이콘" />) : ''}
            {isNew ? (<img src="/images/custom_best.png" alt="신제품 아이콘" />) : ''}
          </div>
          <div className="title">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="price-btns-wrap">
            <div className="price">
              {price.toLocaleString()}원
            </div>
            <div className="btns">
              <button onClick={handleLike}>
                <FontAwesomeIcon
                  icon={liked ? faHeartSolid : faHeartRegular}
                  className={liked ? 'liked' : ''}
                />
              </button>
              <button onClick={() => handleCopy(currentUrl)}>
                <FontAwesomeIcon icon={faShareNodes} />
              </button>
            </div>
          </div>
        </div>
        <div className="product-option">
          {productColors && productColors.length > 0 && (
            <div className='selected-color'>
              <select value={selectedColor} onChange={handleColorChange}>
                <option value="">
                  - [필수] 옵션 선택 -
                </option>
                <option value="" disabled>
                  -------------------
                </option>
                <option value="" disabled>
                  색상
                </option>
                {productColors.map((col, index) => (
                  <option key={index} value={col} className='select-color'>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* 수량 및 가격 렌더링 로직 */}
          {productColors.length > 0 ? (
            // 컬러가 있는 경우: 컬러 선택 후에만 수량, 가격, x 아이콘 표시
            selectedColor && (
              <>
                <div className='product-select'>
                  <h3>{name}<span>- {selectedColor}</span></h3>
                  <FontAwesomeIcon icon={faX} className='x-icon' onClick={resetSelection} />
                  <div className='de-increase'>
                    <button onClick={decreaseQuantity}>-</button>
                    <span className='quantity'>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                </div>
                <div className='total-price'>
                  <h3><span>총 상품 금액 </span><span>{totalPrice.toLocaleString()}원</span></h3>
                </div>
              </>
            )
          ) : (
            // 컬러가 없는 경우: 바로 수량, 가격 영역 표시
            <>
              <div className='product-select'>
                <h3>{name}</h3>
                <div className='de-increase'>
                  <button onClick={decreaseQuantity}>-</button>
                  <span className='quantity'>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
              </div>
              <div className='total-price'>
                <h3><span>총 상품 금액 </span><span>{totalPrice.toLocaleString()}원</span></h3>
              </div>
            </>
          )}
          <div className="cart-buy-btns">
            <button className='add-to-cart' onClick={handleAddToCart}>ADD TO CART</button>
            <button className='buy-now' onClick={handleBuyNow}>BUY NOW</button>
          </div>
        </div>
        <div className="banner-wraps">
          <img src="/images/img_naver_pay.png" alt="네이버페이 배너" />
          <img src="/images/img_kakao_pay.png" alt="카카오페이 배너" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;