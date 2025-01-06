import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/common/Title';
import { CartContext } from '../components/sub/CartContext';
import { Link } from 'react-router-dom';
import BasketGuide from '../components/sub/BasketGuide';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useContext(CartContext);
  const [selectAll, setSelectAll] = useState(false);   // 전체 선택 여부
  const [selectedItems, setSelectedItems] = useState(cart.map(() => false));  // 개별 상품 선택 여부 (인덱스별)
  const [quantities, setQuantities] = useState(cart.map((item) => item.quantity || 1));  // 수량 상태 관리 (인덱스별)

  // 전체 선택/해제 핸들러
  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    setSelectedItems(cart.map(() => event.target.checked)); // 모든 개별 상품 선택 여부를 전체 선택 여부와 동일하게 설정
  };

  // 개별 상품 선택 핸들러
  const handleSelectItem = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      newSelectedItems[index] = !newSelectedItems[index];
      setSelectAll(newSelectedItems.every(item => item)); // 모든 상품이 선택되었는지 확인하여 selectAll 상태 업데이트
      return newSelectedItems;
    });
  };

  // 선택 상품 삭제 핸들러
  const handleRemoveSelected = () => {
    selectedItems.forEach((isSelected, index) => {
      if (isSelected) {
        removeFromCart(index); // 선택된 상품 장바구니에서 제거
      }
    });
    setSelectedItems(cart.map(() => false)); // 선택 여부 초기화
    setSelectAll(false); // 전체 선택 해제
  };

  // 장바구니 비우기 핸들러
  const handleClearCart = () => {
    if (window.confirm("장바구니를 비우시겠습니까?")) {
      clearCart(); // CartContext의 clearCart 함수 호출
      setSelectedItems(cart.map(() => false)); // 선택 여부 초기화
      setSelectAll(false); // 전체 선택 해제
    }
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (index, amount) => {
    const newQuantity = Math.max(1, quantities[index] + amount);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
    updateCartItemQuantity(index, newQuantity); // CartContext에 수량 업데이트
  };

  const handleOrder = () => {
    alert('주문이 완료되었습니다.');
  };

  // 총 상품 가격, 배송비, 최종 가격 계산
  const totalPrice = cart.reduce((sum, item, index) => sum + item.price * quantities[index], 0);
  const shippingFee = 0;
  const finalPrice = totalPrice + shippingFee;

  // cart 상태가 변경될 때 quantities 상태 동기화
  useEffect(() => {
    setQuantities(cart.map((item) => item.quantity || 1));
  }, [cart]);

  // 해외배송 장바구니 관련 로컬 스토리지 키
  const internationalCartKey = 'internationalCart';

  // 해외배송 장바구니 상태
  const [internationalCart] = useState(() => {
    const storedCart = localStorage.getItem(internationalCartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 해외배송 장바구니 개수
  const internationalCartCount = internationalCart.length;

  // 해외배송 장바구니 상태가 변경될 때 로컬 스토리지 업데이트
  useEffect(() => {
    localStorage.setItem(internationalCartKey, JSON.stringify(internationalCart));
  }, [internationalCart]);

  // 선택 상품 이동 핸들러 (해외배송) - 수정
  const handleMoveToInternationalCart = () => {
    const selectedItemsData = cart.filter((_, index) => selectedItems[index]);
    const selectedCount = selectedItemsData.length;

    if (selectedCount === 0) {
      alert('상품을 선택해주세요.');
    } else {
      alert('국내배송상품은 해외배송이 불가능합니다.');
    }
  };

  return (
    <div className='cart-page'>
      <div className="cart-inner inner">
        <Title title="Cart" showLink={false} />
        <div className="order-wrap">
          <ul className="order-menu">
            <li className="active">
              <a href="#none">국내배송상품({cart.length})</a>
            </li>
            <li>
              <a href="#none">해외배송상품({internationalCartCount})</a>
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
                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
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
              {cart.length === 0 &&(
                <tr>
                  <td colSpan={9} className='empty-cart'>
                    장바구니가 비었습니다.
                  </td>
                </tr>
              )}
              {cart.length > 0 && cart.map((item, index) => (
                <tr key={index}>
                  <td><input type="checkbox" checked={selectedItems[index]} onChange={() => handleSelectItem(index)} /></td>
                  <td className="thumb"><Link to={`/product/${item.id}`}><img className='item-thumb' src={`/images/${item.images[0]}`} alt={item.name} /></Link>
                  </td>
                  <td className="name">
                    <Link to={`/product/${item.id}`}>
                      {item.name}
                      <div className="badges">
                        {item.isBest ? (<img src="/images/custom_best.png" alt="베스트 아이콘" />) : ''}
                        {item.isSale ? (<img src="/images/custom_sale.png" alt="세일 아이콘" />) : ''}
                        {item.isNew ? (<img src="/images/custom_best.png" alt="신제품 아이콘" />) : ''}
                      </div>
                    </Link>
                  </td>
                  <td className="amount">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <input type="text" value={quantities[index]} readOnly />
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </td>
                  <td className="price">{(item.price * quantities[index]).toLocaleString()}원</td>
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
              <div className="left">
                <button onClick={handleRemoveSelected}>X 삭제하기</button>
                <button onClick={handleMoveToInternationalCart}>해외배송상품 장바구니로 이동</button>
              </div>
              {cart.length > 0 &&(
                <div className="right">
                  <button onClick={handleClearCart}>장바구니 비우기</button>
                  <button>견적서 출력</button>
                </div>
              )}
            </div>
          </div>
          <div className="order-totalsummary">
            <ul>
              <li>
                총 상품금액<span>{totalPrice.toLocaleString()}원</span>
              </li>
              <li className='fee'>+</li>
              <li>총 배송비<span>{shippingFee.toLocaleString()}원</span></li>
              <li className='fee'>=</li>
              <li>합계<span>{finalPrice.toLocaleString()}원</span></li>
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
        <BasketGuide />
      </div>
    </div>
  );
};

export default CartPage;