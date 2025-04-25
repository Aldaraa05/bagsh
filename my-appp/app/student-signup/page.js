
import Link from "next/link";
import '../../styles/signup.css';
import '../../styles/global.css'
export default function Signup() {
  return (  
    <div>
      <Link className="back" href="/">
      <img src="/backicon.png" alt="Back" />
      </Link>

      <div className="container">
        <div className="header">
          <h2>Багш бүртгүүлэх</h2>
          <p>Та мэдээллээ үнэн зөв оруулна уу</p>
        </div>

        <form id="signup-form">
          <div className="form-group">
            <label htmlFor="fullname">Овог </label>
            <div className="input-with-icon">
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Овог оруулна уу"
                required
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="error" id="fullname-error">Овог нэрээ оруулна уу</div>
          </div>
          <div className="form-group">
            <label htmlFor="fullname">нэр</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Нэрээ оруулна уу"
                required
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="error" id="fullname-error">Овог нэрээ оруулна уу</div>
          </div>

          <div className="form-group">
            <label htmlFor="email">И-мэйл</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="И-мэйл хаягаа оруулна уу"
                required
              />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="error" id="email-error">Зөв и-мэйл хаяг оруулна уу</div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Утасны дугаар</label>
            <div className="input-with-icon">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Утасны дугаараа оруулна уу"
                required
              />
              <i className="fas fa-phone"></i>
            </div>
            <div className="error" id="phone-error">Зөв утасны дугаар оруулна уу</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Нууц үг</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Нууц үгээ оруулна уу"
                required
              />
              <i className="fas fa-lock"></i>
            </div>
            <div className="error" id="password-error">Нууц үг доод тал нь 8 тэмдэгт байх ёстой</div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Нууц үг баталгаажуулах</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Нууц үгээ дахин оруулна уу"
                required
              />
              <i className="fas fa-lock"></i>
            </div>
            <div className="error" id="confirm-password-error">Нууц үг таарахгүй байна</div>
          </div>

          <div className="form-group">
            <div className="checkbox-container">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">Үйлчилгээний нөхцөл зөвшөөрөх</label>
            </div>
            <div className="error" id="terms-error">Үйлчилгээний нөхцөлийг зөвшөөрнө үү</div>
          </div>

          <button type="submit" className="btn">Бүртгүүлэх</button>
        </form>

        <div className="login-link">
          Бүртгэлтэй юу? <Link href="../Signin">Нэвтрэх</Link>
        </div>
      </div>
    </div>
  );
}
