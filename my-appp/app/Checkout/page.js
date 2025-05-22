'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/checkout.css';

export default function CheckoutPage() {
  const [balance, setBalance] = useState(0);
  const [chargeAmount, setChargeAmount] = useState('');
  const [basket, setBasket] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const basketData = JSON.parse(localStorage.getItem('basket')) || [];

    if (!userData) {
      router.push('/login');
      return;
    }

    setUser(userData);
    setBasket(basketData);
    fetchBalance(userData._id);
  }, []);

  const fetchBalance = async (userId) => {
    try {
      const response = await fetch(`/api/user/balance/${userId}`);
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch balance');
      const data = await response.json();
      setBalance(data.balance);
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChargeBalance = async (e) => {
    e.preventDefault();
    if (!chargeAmount || isNaN(chargeAmount) || Number(chargeAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const response = await fetch(`/api/user/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user._id, 
          amount: Number(chargeAmount) 
        }),
      });
      console.log(response);
      console.log(user);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Charge failed');
      
      setBalance(data.newBalance);
      setChargeAmount('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePurchase = async () => {
    if (!basket.length) {
      setError('Your basket is empty');
      return;
    }

    const totalPrice = basket.reduce((sum, item) => {
      const price = Number(item.price.replace(/[^0-9]/g, ''));
      return sum + price;
    }, 0);

    try {
      const deductResponse = await fetch('/api/user/deduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          amount: totalPrice
        }),
      });

      if (!deductResponse.ok) {
        throw new Error(await deductResponse.text());
      }

      const orderResponse = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          items: basket,
          totalPrice,
          status: 'completed'
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const newBalance = balance - totalPrice;
      setBalance(newBalance);
      
      localStorage.removeItem('basket');
      router.push('/Checkout/success');
      
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err.message || 'Payment failed');
    }
  };

  if (loading) return <div className="checkout-loading">Loading...</div>;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Хэтэвч</h1>
      
      <div className="checkout-card">
        <h2>Таны хэтэвч</h2>
        <div className="checkout-balance-container">
          <p>Одоогын баланс: <span className="checkout-balance">₮{balance.toLocaleString()}</span></p>
        </div>
        
        <form onSubmit={handleChargeBalance} className="checkout-charge-form">
          <h3>Баланс аа өөрчлөх</h3>
          <div className="checkout-charge-input-group">
            <input
              type="number"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value)}
              placeholder="Enter amount"
              className="checkout-charge-input"
            />
            <button type="submit" className="checkout-charge-button">
              цэнэглэх
            </button>
          </div>
        </form>
      </div>

      <div className="checkout-card">
        <h2>Захиалгын мэдээлэл</h2>
        {basket.map((item, index) => (
          <div key={index} className="checkout-order-item">
            <p className="checkout-item-title">{item.name} - {item.subject}</p>
            <p>Цаг: {item.selectedDay}, {item.selectedTime}</p>
            <p>Үнэ: {item.price}</p>
          </div>
        ))}
        
        <div className="checkout-total-container">
          <p className="checkout-total-text">
            Нийт: ₮{basket.reduce((sum, item) => {
              const price = Number(item.price.replace(/[^0-9]/g, ''));
              return sum + price;
            }, 0).toLocaleString()}
          </p>
        </div>
        
        <button
          onClick={handlePurchase}
          disabled={!basket.length}
          className={`checkout-purchase-button ${!basket.length ? 'checkout-disabled-button' : ''}`}
        >
          Худалдаж авах
        </button>
      </div>

      {error && <div className="checkout-error-message">{error}</div>}
    </div>
  );
}