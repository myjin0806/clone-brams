import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/common/Title'


const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className="login-wrap">
        <Title title="login" showLink={false} />
        <div className="login">
          <input type="text" placeholder='아이디' />
          <input type="password" placeholder='비밀번호' />
          <button className='login-btn'>로그인</button>
          <div className="login-menu">
            <Link>회원가입</Link>
            <Link>아이디 찾기</Link>
            <Link>비밀번호 찾기</Link>
          </div>
        </div>
        <div className="not-user-order">
          <button>비회원 주문조회</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage