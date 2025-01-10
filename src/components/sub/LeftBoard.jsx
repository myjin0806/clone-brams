import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftBoard = () => {
  return (
    <div className="left-board">
      <h2>Customer Care</h2>
      <ul>
        <li>
          <NavLink to="/announcements" activeClassName="active">
            공지사항
          </NavLink>
        </li>
        <li>
          <NavLink to="/manual" activeClassName="active">
            매뉴얼다운로드
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" activeClassName="active">
            보도자료
          </NavLink>
        </li>
        <li>
          <NavLink to="/withbrams" activeClassName="active">
            WITH 브람스
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default LeftBoard
