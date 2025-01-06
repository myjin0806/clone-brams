import React from 'react'
import { Link } from 'react-router-dom';

const Recommend = () => {
  return (
    <section className='recommend'>
      <div className="recommend-title">
        <p>
          Discover Your Ideal Match with Our Chair Finder !
        </p>
        <h2>
          우리 집에 어울리는 안마의자<br/>
          고민되세요?
        </h2>
        <Link to="">START NOW</Link>
      </div>
    </section>
  )
}

export default Recommend