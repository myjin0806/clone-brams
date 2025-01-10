import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../sub/CartContext';

const Header = () => {
  const { getCartCount } = useContext(CartContext); // 장바구니 총 개수 가져오기
  const location = useLocation();

  const [scrollingDown, setScrollingDown] = useState(false); // 스크롤 방향 상태
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 중 상태 (scroll 클래스 추가)
  const [isHover, setIsHover] = useState(false);

  // 메인 페이지 여부 확인
  const mainPaths = ['/', '/brandstory', '/certification'];
  const isMainPage = mainPaths.includes(location.pathname);
  const [isWhiteHeader, setIsWhiteHeader] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null); // 현재 호버 중인 메뉴
  const [isHoveringSubMenu, setIsHoveringSubMenu] = useState(false); // 서브메뉴 호버 여부 상태 추가

  const cartCount = getCartCount(); // 장바구니 개수 계산

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // 스크롤을 내릴 때
        setScrollingDown(true);
      } else {
        // 스크롤을 올릴 때
        setScrollingDown(false);
      }

      // 스크롤 위치가 1px 이상일 때 white 클래스를 추가
      if (!isMainPage && window.scrollY > 1) {
        setIsWhiteHeader(true);
      } else {
        setIsWhiteHeader(false);
      }

      // 스크롤 중 상태 관리 (scroll 클래스 추가/제거)
      setIsScrolling(true);
      setLastScrollY(window.scrollY); // 현재 스크롤 위치를 업데이트
    };

    const handleScrollEnd = () => {
      setIsScrolling(false); // 스크롤이 끝난 후 'scroll' 클래스 제거
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollEnd);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollEnd); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, [lastScrollY, isMainPage]);

  //호버
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleMenuMouseEnter = (menu) => {
    setHoveredMenu(menu);
    setIsHoveringSubMenu(true);
  };
  const handleMenuMouseLeave = () => {
    setHoveredMenu(null);
    setIsHoveringSubMenu(false);
  };

  //서브메뉴 데이터
  const submenuData = {
    '전체상품': [
      { name: '안마의자', link: '/products?category=안마의자' },
      { name: '등마사지기', link: '/products?category=등마사지기' },
      { name: '다리마사지기', link: '/products?category=다리마사지기' },
      { name: '발마사지기', link: '/products?category=발마사지기' },
      { name: '소형마사지기', link: '/products?category=소형마사지기' },
      { name: 'EMS마사지기', link: '/products?category=EMS마사지기' },
      { name: '기타제품', link: '/products?category=기타제품' },
      { name: '소모품', link: '/products?category=소모품' },
    ],
    '브랜드': [
      { name: '회사소개', link: '/about' },
      { name: '브람스 스토리', link: '/brandstory' },
      { name: '인증서 및 수상', link: '/certification' },
    ],
    '고객서비스': [
      { name: '공지사항', link: '/announcements' },
      { name: '매뉴얼다운로드', link: '/manual' },
      { name: '보도자료', link: '/news' },
      { name: 'WITH 브람스', link: '/withbrams' },
      { name: '고객리뷰', link: '/reviews' }
    ],
  };

  return (
    <div className='header-wrap'>
      {isMainPage ? (
        <header className={`${isScrolling || isWhiteHeader || window.scrollY > 1 || isHover || isHoveringSubMenu ? 'white' : ''} ${scrollingDown ? 'hidden' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="header-inner inner">
            <div className="flex">
              <div className="header-logo">
                <h1>
                  <Link to="/">
                    <img src={isScrolling || isHover || window.scrollY > 1 ? "/images/logo.png" : "/images/logo_w.png"} alt="메인 로고" />
                  </Link>
                </h1>
              </div>
              <nav className="header-nav">
                <ul>
                  <li onMouseEnter={() => handleMenuMouseEnter('전체상품')}
                    onMouseLeave={handleMenuMouseLeave}>
                    <Link to="/products">전체상품</Link>
                  </li>
                  <li>
                    <Link to="/rental">렌탈</Link>
                  </li>
                  <li>
                    <Link to="/experiencestores">체험매장</Link>
                  </li>
                  <li
                    onMouseEnter={() => handleMenuMouseEnter('브랜드')}
                    onMouseLeave={handleMenuMouseLeave}
                  >
                    <Link to="/about">브랜드</Link>
                  </li>
                  <li
                    onMouseEnter={() => handleMenuMouseEnter('고객서비스')}
                    onMouseLeave={handleMenuMouseLeave}
                  >
                    <Link to="/announcements">고객서비스</Link>
                  </li>
                  <li>
                    <Link to="/product/999">클린케어서비스</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <ul className="header-icons">
              <li>
                <Link to="">
                  <img
                    src={isScrolling || isHover || window.scrollY > 1 ? "/images/ic_hd_search.png" : "/images/ic_hd_search_w.png"}
                    alt="search icon"
                    className={isScrolling || isHover || window.scrollY > 1 ? "ico_b" : "ico_w"}
                  />
                  <img
                    src={isScrolling || isHover || window.scrollY > 1 ? "/images/ic_hd_close.png" : "/images/ic_hd_close.png"}
                    alt="close icon"
                    className="close_icon"
                  />
                </Link>
              </li>
              <li>
                {/* 장바구니 아이콘 및 수량 표시 */}
                <Link to="/cart" className="icon cart">
                  <img
                    src={isScrolling || isHover || window.scrollY > 1 ? "/images/ic_hd_cart.png" : "/images/ic_hd_cart_w.png"}
                    alt="cart icon"
                    className={isScrolling || isHover || window.scrollY > 1 ? "ico_b" : "ico_w"}
                  />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <img
                    src={isScrolling || isHover || window.scrollY > 1 ? "/images/ic_hd_user.png" : "/images/ic_hd_user_w.png"}
                    alt="user icon"
                    className={isScrolling || isHover || window.scrollY > 1 ? "ico_b" : "ico_w"}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </header>
      ) : (
        <header className={`white ${scrollingDown ? 'hidden' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="header-inner inner white">
            <div className="flex">
              <div className="header-logo">
                <h1>
                  <Link to="/">
                    <img src="/images/logo.png" alt="메인 로고" />
                  </Link>
                </h1>
              </div>
              <nav className="header-nav">
                <ul>
                  <li onMouseEnter={() => handleMenuMouseEnter('전체상품')}
                    onMouseLeave={handleMenuMouseLeave}>
                    <Link to="/products">전체상품</Link>
                  </li>
                  <li>
                    <Link to="/rental">렌탈</Link>
                  </li>
                  <li>
                    <Link to="/experiencestores">체험매장</Link>
                  </li>
                  <li onMouseEnter={() => handleMenuMouseEnter('브랜드')}
                    onMouseLeave={handleMenuMouseLeave}>
                    <Link to="/about">브랜드</Link>
                  </li>
                  <li onMouseEnter={() => handleMenuMouseEnter('고객서비스')}
                    onMouseLeave={handleMenuMouseLeave}>
                    <Link to="/announcements">고객서비스</Link>
                  </li>
                  <li>
                    <Link to="/product/999">클린케어서비스</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <ul className="header-icons">
              <li>
                <Link to="">
                  <img
                    src="/images/ic_hd_search.png"
                    alt="search icon"
                    className="ico_b"
                  />
                  <img
                    src="/images/ic_hd_close.png"
                    alt="close icon"
                    className="close_icon"
                  />
                </Link>
              </li>
              <li>
                {/* 장바구니 아이콘 및 수량 표시 */}
                <Link to="/cart" className="icon cart">
                  <img
                    src="/images/ic_hd_cart.png"
                    alt="cart icon"
                    className="ico_b"
                  />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <img
                    src="/images/ic_hd_user.png"
                    alt="user icon"
                    className="ico_b"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </header>
      )
      }
      {/* 서브메뉴 */}
      {hoveredMenu && (
        <div
          className={`submenu ${hoveredMenu ? 'active' : ''}`}
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div className="submenu-inner inner">
            <ul>
              {submenuData[hoveredMenu]?.map((item, index) => (
                <li key={index}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;