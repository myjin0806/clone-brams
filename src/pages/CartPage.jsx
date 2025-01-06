import React, { useContext, useState } from 'react'
import Title from '../components/common/Title'
import { CartContext } from '../components/sub/CartContext';
import { Link } from 'react-router-dom'


const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext); 
  // 수량 상태 관리
  const [quantities, setQuantities] = useState(cart.map(() => 1)); 

  const handleQuantityChange = (index, amount) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(1, newQuantities[index] + amount); // 최소 수량 1
      return newQuantities;
    });
  };

  const handleOrder = () => {
    alert('주문이 완료되었습니다.');
  };

  const totalPrice = cart.reduce((sum, item, index) => sum + item.price * quantities[index], 0);
  const shippingFee = 0;
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className='cart-page'>
      <div className="cart-inner inner">
        <Title title="Cart" showLink={false}/>
        <div className="order-wrap">
          <ul className="order-menu">
            <li className="active">
              <a href="#none">국내배송상품()</a>
            </li>
            <li>
              <a href="#none">해외배송상품(0)</a>
            </li>
          </ul>
          <table className="order-table">
            <colgroup>
              <col style={{ width: '30px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: 'auto' }} />
              <col style={{ width: '90px' }} />
              <col style={{ width: '120px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '130px' }} />
            </colgroup>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>이미지</th>
                <th>상품정보</th>
                <th>수량</th>
                <th>상품구매금액</th>
                <th>적립금</th>
                <th>배송구분</th>
                <th>배송비</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td><input type="checkbox" /></td>
                  <td className="thumb"><img src={item.image} alt={item.name} /></td>
                  <td className="name">{item.name}</td>
                  <td className="amount">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <input type="text" value={quantities[index]} readOnly />
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </td>
                  <td className="price">{item.price}</td>
                  <td className="mileage">-</td>
                  <td className="delivery">기본배송</td>
                  <td className="delivery-fee">무료</td>
                  <td className="select-btn">
                    <button onClick={() => handleOrder()}>주문하기</button>
                    <button>관심상품등록</button>
                    <button onClick={() => removeFromCart(index)}>X 삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="10" className="delivery">[기본배송]</td>
              </tr>
            </tfoot>
          </table>
          <div className="oreder-guide">
            <p>할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.</p>
          </div>
          <div className="order-selecter">
            <p>선택상품을</p>
            <div className="order-selecter-btns">
              <button >X 삭제하기</button>
              <button>해외배송상품 장바구니로 이동</button>
            </div>
          </div>
          <div className="order-totalsummary">
            <ul>
              <li>
              총 상품금액: {totalPrice.toLocaleString()}원
              </li>
              <li>+</li>
              <li>배송비: {shippingFee.toLocaleString()}원</li>
              <li></li>
              <li>합계: {finalPrice.toLocaleString()}</li>
            </ul>
          </div>
          <div className="order-total">
            <div className="btns">
            <button onClick={handleOrder}>선택상품 주문</button>
            <button onClick={handleOrder}>전체상품 주문</button>
            </div>
            <button className='continue-shopping'><Link to="/products">쇼핑계속하기</Link></button>
          </div>
        </div>
        <div className="basketguide">
          <h3>이용안내</h3>
          <div className="guide-inner">
            <h4>장바구니 이용안내</h4>
            <ul>
              <li>선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
              <li>[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
              <li>장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
              <li>파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
              <li>해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
              <li>해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
            </ul>
            <h4>무이자할부 이용안내</h4>
            <ul>
              <li>상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
              <li>[전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
              <li>단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
              <li>무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에 표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다.<br/>실제 배송비는 함께 주문하는 상품에 따라 적용되오니 주문서 하단의 배송비 정보를 참고해주시기 바랍니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage