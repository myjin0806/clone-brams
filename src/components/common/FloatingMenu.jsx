import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FloatingMenu = () => {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowIcon(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="floating-menu">
      <ul className={`menu-items ${showIcon ? 'visible' : ''}`}>
        <li>
          <Link to="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/btn_flt_01.svg" alt="kakao-talk" />
          </Link>
        </li>
        <li>
          <button className="to-top-button" onClick={handleScrollToTop}>
            <img src="/images/btn_flt_02.svg" alt="to-top-icon" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FloatingMenu;
