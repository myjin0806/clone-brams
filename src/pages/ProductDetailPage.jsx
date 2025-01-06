import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../data/Products.json';
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

const ProductDetailPage = ({addToCart}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  // 각 아코디언 항목
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false); 
  const [isOpen3, setIsOpen3] = useState(false); 

  const toggleAccordion1 = () => setIsOpen1(prevState => !prevState);
  const toggleAccordion2 = () => setIsOpen2(prevState => !prevState);
  const toggleAccordion3 = () => setIsOpen3(prevState => !prevState);

  // 상품 데이터 불러오기

  useEffect(() => {
    const fetchedProduct = Products.find(p => p.id === parseInt(productId));
    setProduct(fetchedProduct);
  }, [productId, Products]);
  // 좋아요 기능
  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(!liked);

  // 리뷰 데이터
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

  const [scrollingDown, setScrollingDown] = useState(false); // 아래로 스크롤 체크
  const [prevScrollPos, setPrevScrollPos] = useState(0); // 이전 스크롤 위치
  const [activeSection, setActiveSection] = useState(''); // 현재 활성화된 섹션 ID

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

  // 페이지네이션
  const itemsPerPage = 5;
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [currentQnaPage, setCurrentQnaPage] = useState(1);

  const indexOfLastReview = currentReviewPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const indexOfLastQna = currentQnaPage * itemsPerPage;
  const indexOfFirstQna = indexOfLastQna - itemsPerPage;
  const currentQnas = qnas.slice(indexOfFirstQna, indexOfLastQna);

  const totalReviewPages = Math.ceil(reviews.length / itemsPerPage);
  const totalQnaPages = Math.ceil(qnas.length / itemsPerPage);

  const goToReviewPage = (page) => {
    if (page >= 1 && page <= totalReviewPages) setCurrentReviewPage(page);
  };
  const goToQnaPage = (page) => {
    if (page >= 1 && page <= totalQnaPages) setCurrentQnaPage(page);
  };

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

  // 상품 추가
  const [selectedColor, setSelectedColor] = useState(product?.color[0] || '');
  const [quantity, setQuantity] = useState(1);

const [totalPrice, setTotalPrice] = useState(0);

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

  const { name, images, description, price, isBest, isSale, isNew, detail } = product;

  // 컬러 선택 핸들러
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  
  // 수량 증가/감소 핸들러
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1);
  };

  //선택 초기화 핸들러 
  const resetSelection = () =>{
    setSelectedColor("")
    setQuantity(1);
  }

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
        {/* 상세 정보 */}
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
            {/* btn */}
            <div className="product-btn-wraps">
              <div className="float">
                <button className="white">전체보기</button>
                <button className="black">상품후기쓰기</button>
              </div>
            </div>
            {/* 페이지네이션 */}
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
          {/* Q&A */}
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
                  className={`page-item ${currentReviewPage === i + 1 ? 'active' : ''}`}
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
          {/* 구매정보 */}
          <div id="product-info" className='sec-04'>
            <div className={`accordion-item ${isOpen1 ? 'active' : ''}`}>
              <div className="accordion-title" onClick={toggleAccordion1}>
                <h2>결제안내</h2>
              </div>
              <div className="accordion-content" style={{ maxHeight: isOpen1 ? '150px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease, overflow 0.3s ease', padding: isOpen1 ? '24px 32px' : '0 32px'}}>
                <p>
                고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.<br/><br/>
                무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.  <br/>
                주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.
                </p>
              </div>
            </div>
            <div className={`accordion-item ${isOpen2 ? 'active' : ''}`}>
              <div className="accordion-title" onClick={toggleAccordion2}>
                <h2>배송안내</h2>
              </div>
              <div className="accordion-content" style={{ maxHeight: isOpen2 ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease, overflow 0.3s ease' , padding: isOpen2 ? '24px 32px' : '0 32px'}}>
                <ul>
                  <li>배송 방법 : 택배</li>
                  <li>배송 지역 : 전국지역</li>
                  <li>배송 비용 : 2,500원</li>
                  <li>배송 기간 : 3일 ~ 7일</li>
                  <li>배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.
                  고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다.<br/> 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.</li>
                </ul>
              </div>
            </div>
            <div className={`accordion-item ${isOpen3 ? 'active' : ''}`}>
              <div className="accordion-title" onClick={toggleAccordion3}>
                <h2>교환&반품 안내</h2>
              </div>
              <div className="accordion-content" style={{ maxHeight: isOpen3 ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease, overflow 0.3s ease', padding: isOpen3 ? '24px 32px' : '0 32px'}}>
                <p>
                  <b>교환 및 반품 주소</b>
                  - <br/><br/>
                  <b>교환 및 반품이 가능한 경우</b>
                  - 계약내용에 관한 서면을 받은 날부터 7일. 단, 그 서면을 받은 때보다 재화등의 공급이 늦게 이루어진 경우에는 재화등을 공급받거나 재화등의 공급이 시작된 날부터 7일 이내<br/>
                  - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날 부터 3월이내, 그사실을 알게 된 날 또는 알 수 있었던 날부터 30일이내<br/><br/>
                  <b>교환 및 반품이 불가능한 경우</b>
                  - 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)<br/>
                  - 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우<br/>
                  - 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우<br/>
                  - 복제가 가능한 재화등의 포장을 훼손한 경우<br/>
                  - 개별 주문 생산되는 재화 등 청약철회시 판매자에게 회복할 수 없는 피해가 예상되어 소비자의 사전 동의를 얻은 경우<br/>
                  - 디지털 콘텐츠의 제공이 개시된 경우, (다만, 가분적 용역 또는 가분적 디지털콘텐츠로 구성된 계약의 경우 제공이 개시되지 아니한 부분은 청약철회를 할 수 있습니다.)<br/><br/>
                  ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다.<br/>
                  (색상 교환, 사이즈 교환 등 포함)
                </p>
              </div>
            </div>
          </div>
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
              {price}원
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
          {product?.color && product.color.length > 0 ? (
            // 컬러가 있을 경우: 컬러 선택 셀렉트 창만 보이고, 수량 증감 창은 보이지 않음
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
                {product.color.map((col, index) => (
                  <option key={index} value={col} className='select-color'>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className='product-select'>
              <h3>{name}</h3>
              <div className='de-increase'>
                <button onClick={decreaseQuantity}>-</button>
                <span className='quantity'>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>
          )}
          {/* 컬러 선택 후에만 수량 증감 창이 나옴 */}
          {selectedColor && (
            <div className='product-select'>
              <h3>{name}<span>- {selectedColor}</span></h3>
              <FontAwesomeIcon icon={faX} className='x-icon' onClick={resetSelection} />
              <div className='de-increase'>
                <button onClick={decreaseQuantity}>-</button>
                <span className='quantity'>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>
          )}
          {/* 총 가격 계산 */}
          {selectedColor && (
            <div className='total-price'>
              <h3><span>총 상품 금액 </span><span>{totalPrice.toLocaleString()}원</span></h3>
            </div>
          )}
          <div className="cart-buy-btns">
            <button className='add-to-cart'addToCart={addToCart}>ADD TO CART</button>
            <button className='buy-now' addToCart={addToCart}>BUY NOW</button>
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
