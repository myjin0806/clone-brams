import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner inner">
        <div className="footer-left">
          <div className="flex">
            <div className="cs-info">
              <h3>Customer Care</h3>
              <b>010-1234-5678</b>
              <p>
                평일 09:00 - 17:30 (Lunch 12:00 - 13:00)<br />
                주말 및 공휴일 휴무
              </p>
            </div>
            <div className="bank-info">
              <h3>Account</h3>
              <b>123-01-123456</b>
              <p>
                입금은행 : 농협은행 <br />
                예금주 : (주) 브람스생활건강
              </p>
            </div>
            <div className="return-info">
              <h3>Shipping & Return Center</h3>
              <p>
                본사/공장 : 경기도 광주시 오포읍 오포로 498번길 21<br />
                고객센터/사무실 : 경기도 용인시 처인구 모현읍 곡현로 752
              </p>
            </div>
          </div>
          <div className="address">
            <ul>
              <li><Link to="">이용약관</Link></li>
              <li className='under'><Link to="">개인정보처리방침</Link></li>
            </ul>
            <p>
              <span>(주)브람스생활건강</span>
              <span>대표 : 장채민</span>
              <span>사업자등록번호 : 126-86-17199 <Link to="">[사업자정보확인]</Link></span>
            </p>
            <p>
              <span>주소 : 경기도 광주시 오포읍 오포로498번길 21</span>
              <span>개인정보보호책임자 : 김석영(brams02@naver.com)</span>
            </p>
            <p>
              <span>통신판매업 신고번호 : 제2014-경기광주-0130호</span>
              <span>TEL : 031-766-3993</span>
              <span>FAX : 031-629-5295</span>
            </p>
            <div className="copyright">
              COPYRIGHT © 브람스생활건강 ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
        <div className="footer-right">
          <ul className="util-menu">
            <li>
              <Link to="/about">회사소개</Link>
            </li>
            <li>
              <Link to="">공지사항</Link>
            </li>
            <li>
              <Link to="">FAQ</Link>
            </li>
            <li>
              <Link to="">배송A/S문의</Link>
            </li>
            <li>
              <Link to="">B2B문의</Link>
            </li>
            <li>
              <Link to="">클린케어 서비스</Link>
            </li>
          </ul>
          <ul className="sns-wrap">
            <li>
              <Link to=""><img src="images/ic_ft_sns_01.svg" alt="인스타그램 아이콘" /></Link>
            </li>
            <li>
            <Link to=""><img src="images/ic_ft_sns_02.svg" alt="유튜브 아이콘" /></Link>
            </li>
            <li>
            <Link to=""><img src="images/ic_ft_sns_03.svg" alt="블로그 아이콘" /></Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer