import React, { useState }  from 'react'
import certifications from '../data/Certifications.json'

const CertificationPage = () => {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };
  return (
    <div className='certification'>
      <div className="sub-visual">
        <h2>Certification</h2>
        <h3>인증서 및 수상</h3>
        <p>
          브람스의 전 제품은 다수의 수상과 인증을 받은, 믿고 사용할 수 있는 우수한 제품입니다.
        </p>
      </div>
      <div className="certification-inner inner">
        <h2>BRAMS Style Maintains Your Dignity.</h2>
        <div className="certifications">
          {certifications.slice(0, visibleCount).map((cer, index)=>(
            <div className='certification' key={index}>
              <img src={`/images/${cer.img}`} alt={cer.name} />
              <p>
                {cer.name}
                <span>{cer.from}</span>
              </p>
            </div>
          ))}
        </div>
        {visibleCount < certifications.length && (
          <div className="view-more">
            <button onClick={handleViewMore}>VIEW MORE</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificationPage