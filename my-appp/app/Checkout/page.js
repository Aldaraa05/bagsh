"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "../../styles/checkout.css";
import "../../styles/global.css";

export default function Checkout() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("qpay");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Get basket items from localStorage
  const basketItems = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('basket')) || []
    : [];

  // Calculate total price
  const totalPrice = basketItems.reduce((sum, item) => {
    const price = parseInt(item.price?.replace(/[^\d]/g, '')) || 25000;
    return sum + (price * (item.hours || 1));
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would send this to your backend
      const orderData = {
        items: basketItems,
        paymentMethod,
        phoneNumber,
        email,
        total: totalPrice,
        date: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear basket after successful order
      localStorage.removeItem('basket');
      
      // Redirect to success page
      router.push('/order-success');
    } catch (error) {
      console.error("Order failed:", error);
      alert("Захиалга амжилтгүй боллоо. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  if (basketItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Таны сагс хоосон байна</h2>
        <p>Захиалга хийхээс өмнө сагсанд багш нэмнэ үү</p>
        <Link href="/Teachers">
          <button className="primary-btn">Багш хайх</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1><i className="fas fa-credit-card"></i> Төлбөрийн хэрэгсэл</h1>
        
        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Захиалгын дэлгэрэнгүй</h2>
            
            <div className="order-items">
              {basketItems.map((teacher) => (
                <div key={teacher.id} className="order-item">
                  <div className="teacher-info">
                    <Image
                      src={teacher.image || "/pro.png"}
                      alt={teacher.name}
                      width={60}
                      height={60}
                    />
                    <div>
                      <h4>{teacher.name}</h4>
                      <p>{teacher.subject}</p>
                      <p>{teacher.selectedDay}, {teacher.selectedTime}</p>
                    </div>
                  </div>
                  <div className="item-price">
                    <span>{teacher.hours || 1} цаг × {teacher.price || '₮25,000'}</span>
                    <span>₮{(parseInt(teacher.price?.replace(/[^\d]/g, '') || 25000) * (teacher.hours || 1))}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <div className="total-row">
                <span>Нийт төлөх дүн:</span>
                <span>₮{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="payment-form">
            <h2>Хэрэглэгчийн мэдээлэл</h2>
            
            <div className="form-group">
              <label>Утасны дугаар*</label>
              <input
                type="tel"
                placeholder="99000000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>И-мэйл (заавал биш)</label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <h2>Төлбөрийн хэрэгсэл сонгох</h2>
            
            <div className="payment-methods">
              {/* QPay */}
              <div 
                className={`payment-method ${paymentMethod === 'qpay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('qpay')}
              >
                <div className="method-radio">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'qpay'}
                    onChange={() => setPaymentMethod('qpay')}
                  />
                </div>
                <div className="method-logo">
                  <Image src="/payment/qpay.png" alt="QPay" width={60} height={40} />
                </div>
                <div className="method-info">
                  <h4>QPay</h4>
                  <p>QR код эсвэл утасны дугаараар төлбөр төлөх</p>
                </div>
              </div>
              
              {/* Bank Transfer */}
              <div 
                className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <div className="method-radio">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                  />
                </div>
                <div className="method-logo">
                  <Image src="/payment/bank.png" alt="Bank Transfer" width={60} height={40} />
                </div>
                <div className="method-info">
                  <h4>Банкны шилжүүлэг</h4>
                  <p>Дансны дугаар руу шилжүүлэх</p>
                </div>
              </div>
              
              {/* MonPay */}
              <div 
                className={`payment-method ${paymentMethod === 'monpay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('monpay')}
              >
                <div className="method-radio">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'monpay'}
                    onChange={() => setPaymentMethod('monpay')}
                  />
                </div>
                <div className="method-logo">
                  <Image src="/payment/monpay.png" alt="MonPay" width={60} height={40} />
                </div>
                <div className="method-info">
                  <h4>MonPay</h4>
                  <p>MonPay апп ашиглан төлбөр төлөх</p>
                </div>
              </div>
              
              {/* Other Payment Methods */}
              <div 
                className={`payment-method ${paymentMethod === 'other' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('other')}
              >
                <div className="method-radio">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'other'}
                    onChange={() => setPaymentMethod('other')}
                  />
                </div>
                <div className="method-logo">
                  <i className="fas fa-ellipsis-h"></i>
                </div>
                <div className="method-info">
                  <h4>Бусад</h4>
                  <p>Бусад төлбөрийн хэрэгсэл</p>
                </div>
              </div>
            </div>
            
            <div className="payment-instructions">
              {paymentMethod === 'qpay' && (
                <div className="qpay-instructions">
                  <p>1. QPay апп-аа нээнэ үү</p>
                  <p>2. "QR уншуулах" дээр дарна уу</p>
                  <p>3. Доорх QR кодыг уншуулна уу</p>
                  <div className="qpay-qr">
                    <Image src="/payment/qr-code.png" alt="QPay QR" width={150} height={150} />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'bank' && (
                <div className="bank-instructions">
                  <p>Бидний дансны мэдээлэл:</p>
                  <div className="bank-details">
                    <div className="bank-row">
                      <span>Банк:</span>
                      <span>Хаан Банк</span>
                    </div>
                    <div className="bank-row">
                      <span>Данс:</span>
                      <span>1234567890</span>
                    </div>
                    <div className="bank-row">
                      <span>Хүлээн авагч:</span>
                      <span>BAGSH LLC</span>
                    </div>
                    <div className="bank-row">
                      <span>Гүйлгээний утга:</span>
                      <span>Захиалгын дугаар #123</span>
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'monpay' && (
                <div className="monpay-instructions">
                  <p>1. MonPay апп-аа нээнэ үү</p>
                  <p>2. "Төлбөр төлөх" дээр дарна уу</p>
                  <p>3. Доорх дугаар руу төлбөрөө хийнэ үү</p>
                  <div className="monpay-number">
                    <span>99112233</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                Би <Link href="/terms">Үйлчилгээний нөхцөл</Link> болон <Link href="/privacy">Нууцлалын бодлого</Link>-ыг уншиж, зөвшөөрч байна.
              </label>
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Төлбөр төлөх...
                </>
              ) : (
                `Төлбөр төлөх - ₮${totalPrice.toLocaleString()}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}