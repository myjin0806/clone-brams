import React from 'react'

const BrandStoryPage = () => {
  return (
    <div className='brand-story'>
      <div className="sub-visual">
        <h2>Brand Story</h2>
        <p>
          따뜻한 엄마의 품에서 자장가를 들으며 잠자는 아기의 모습을 연상하며 브람스가 탄생했습니다.<br/>
          브람스는 아름다운 휴식을 통해 건강한 삶을 추구하는 인공 지능 과학이라는 뜻을 지니고 있습니다.</p>
      </div>
      <div className='brand-story-inner'>
        <div className="mission inner">
          <div className="text-area">
            <h2>Mission</h2>
            <p>
              지친 나를 안아주는 브람스<br/>
              브람스안마의자는 아름다운 휴식을 통한 건강한 삶을 실현합니다.<br/>
              브람스안마의자는 한결같은 열정으로 사용자 맞춤형 휴식 솔루션을 제공하며,<br/>
              홈 웰빙 시장의 선두주자로 자리매김해왔습니다.<br/>
              앞으로도 지속적인 기술 혁신과 탁월한 제품 개발을 통해<br/>
              고객들에게 최상의 휴식 경험을 선사할 것입니다.<br/>
            </p>
          </div>
          <div className="img-area">
            <img src="/images/img_brand_01.jpg" alt="브랜드 소개 이미지1" />
          </div>
        </div>
        <div className="promise">
          <div className="promise-imgs inner">
            <img src="/images/img_brand_02.jpg" alt="01.브람스안마의자는 품질을 최우선으로 합니다." />
            <img src="/images/img_brand_03.jpg" alt="02. 브람스안마의자는 오로지 품질에 집중하여 고객에게 진정한 편안함을 선사합니다." />
            <img src="/images/img_brand_04.jpg" alt="03. 브람스 안마의자는 마케팅 비용을 최소화하고, 고객의 기대를 뛰어넘는 혁신적인 제품 개발에 모든 노력을 기울이며 품질 향상에 주력하고 있습니다." />
          </div>
        </div>
        <div className="youtube inner">
          <iframe width="1600" height="900" src="https://www.youtube.com/embed/CtTloo0U-1U" title="&quot;망설이지마, 풀 건 풀고 살자&quot; - 브람스안마의자 TV-CF with 홍진영" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default BrandStoryPage