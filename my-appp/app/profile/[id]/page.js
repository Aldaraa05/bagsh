"use client";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import '../../../styles/profile.css'
import '../../../styles/global.css'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const params = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const addToBasket = () => {
        if (typeof window !== 'undefined') {
            // Get current basket from localStorage or create new one
            const currentBasket = JSON.parse(localStorage.getItem('basket')) || [];
            
            // Check if teacher is already in basket
            const alreadyInBasket = currentBasket.some(item => item.id === teacher.id);
            
            if (alreadyInBasket) {
            alert('Энэ багш аль хэдийн сагсанд нэмэгдсэн байна');
            return;
            }
            
            // Get the full teacher data from localStorage
            const fullTeacherData = JSON.parse(localStorage.getItem('currentTeacher')) || teacher;
            
            // Add teacher to basket with all details
            const teacherToAdd = {
            ...fullTeacherData,
            quantity: 1,
            selectedDay: 'Даваа',
            selectedTime: '09:00 - 12:00',
            // Add any additional basket-specific fields
            };
            
            // Update basket in localStorage
            localStorage.setItem('basket', JSON.stringify([...currentBasket, teacherToAdd]));
            alert(`${teacher.name} багш амжилттай сагсанд нэмэгдлээ!`);
        }
    };

    useEffect(() => {
        async function fetchTeacherData() {
            try {
                const res = await fetch('/api/teachers/search');
                const data = await res.json();
                
                // Find teacher by ID in the flat array
                const foundTeacher = data.find(t => 
                    t._id === params.id || 
                    (t.info && t.info.id && t.info.id.toString() === params.id)
                );
                
                if (foundTeacher) {
                    setTeacher({
                        id: foundTeacher._id,
                        name: `${foundTeacher.name} ${foundTeacher.surname}`,
                        subject: foundTeacher.info?.subjects?.[0] || "No subject",
                        experience: foundTeacher.info?.experience?.join(", ") || "No experience",
                        rating: foundTeacher.info?.rating || 4.0,
                        price: foundTeacher.info?.price || "₮25,000/цаг",
                        image: foundTeacher.picture?.url || "/zurag/pro.png",
                        // Add other fields as needed
                    });
                } else {
                    console.error("Teacher not found");
                }
            } catch (error) {
                console.error("Error fetching teacher:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeacherData();
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!teacher) {
        return <div>Teacher not found</div>;
    }
    return (
        <>
            <div className="teacher-profile-container">
                <div className="teacher-header">
                    <div className="teacher-avatar">
                        <Image src="/zurag/pro.png" alt="Teacher Avatar" width={150} height={150} />
                        <div className="rating-badge">
                            <span>{teacher.rating}</span>
                            <Image src="/zurag/star.webp" alt="Star Rating" width={20} height={20} />
                        </div>
                    </div>
                    <div className="teacher-info">
                        <h1>{teacher.name}</h1>
                        <p className="subject">{teacher.subject}</p>
                        <p className="experience">{teacher.experience}</p>
                        <div className="teacher-stats">
                            <div className="stat">
                                <h3>200+</h3>
                                <p>Сурагчид</p>
                            </div>
                            <div className="stat">
                                <h3>95%</h3>
                                <p>Амжилт</p>
                            </div>
                            <div className="stat">
                                <h3>10+</h3>
                                <p>Жил</p>
                            </div>
                        </div>
                        <div className="price-section">
                            <span className="price">{teacher.price}</span>
                            <button className="add-to-cart-btn" onClick={addToBasket}>Сагсанд нэмэх</button>
                            
                        </div>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="teacher-main-content">
                    {/* Left Column */}
                    <div className="teacher-left-column">
                        {/* Education Section */}
                        <section className="profile-section">
                            <h2><i className="fas fa-graduation-cap"></i> Боловсрол</h2>
                            <div className="education-item">
                                <h3>Монгол Улсын Их Сургууль</h3>
                                <p className="degree">Математикийн багшийн мэргэжлээр бакалавр</p>
                                <p className="duration">1995-1999</p>
                            </div>
                            <div className="education-item">
                                <h3>ШУТИС</h3>
                                <p className="degree">Математик, Магистр</p>
                                <p className="duration">2005-2007</p>
                            </div>
                            <div className="education-item">
                                <h3>ШУТИС</h3>
                                <p className="degree">Математик, Доктор (PhD)</p>
                                <p className="duration">2015-2018</p>
                            </div>
                        </section>

                        <section className="profile-section">
                            <h2><i className="fas fa-briefcase"></i> Ажлын туршлага</h2>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>2001 - 2008</h3>
                                        <p>Улаанбаатар хотын 45-р сургуульд математикийн багш</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>2008 - 2015</h3>
                                        <p>Монгол Улсын Их Сургууль ахлах багш</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>2015 - 2023</h3>
                                        <p>ШУТИС-д Докторын зэрэг хамгаалсан</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>2023 - одоо</h3>
                                        <p>Математикийн хичээлийн сургалт ордог</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Achievements*/}
                        <section className="profile-section">
                            <h2><i className="fas fa-trophy"></i> Амжилтууд</h2>
                            <ul className="achievements-list">
                                <li>Шилдэг багш (2012)</li>
                                <li>Олон улсын математикийн олимпиадын аварга сурагч бэлтгэсэн (2014, 2017)</li>
                                <li>"бла бла бла" ном зохиогч (2018)</li>
                            </ul>
                        </section>

                        {/* Certificates */}
                        <section className="profile-section">
                            <h2><i className="fas fa-certificate"></i> Гэрчилгээ</h2>
                            <div className="certificates-grid">
                                <div className="certificate-item">
                                    <Image src="/images/certificate1.jpg" alt="Certificate 1" width={150} height={100} />
                                    <p>Математикийн багшийн мэргэжил</p>
                                </div>
                                <div className="certificate-item">
                                    <Image src="/images/certificate2.jpg" alt="Certificate 2" width={150} height={100} />
                                    <p>Дээд математик</p>
                                </div>
                                <div className="certificate-item">
                                    <Image src="/images/certificate3.jpg" alt="Certificate 3" width={150} height={100} />
                                    <p>Цөмийн Физик</p>
                                </div>
                            </div>
                        </section>

                        {/* Reviews */}
                        <section className="profile-section">
                            <h2><i className="fas fa-comments"></i> Сэтгэгдлүүд</h2>
                            <div className="reviews-container">
                                {/* Review 1 */}
                                <div className="review-item">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <Image src="/images/student1.jpg" alt="Student 1" width={40} height={40} />
                                            <div>
                                                <h4>Б.Бат-Эрдэнэ</h4>
                                                <div className="review-rating">
                                                    <span className="stars">★★★★★</span>
                                                    <span>5.0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="review-date">2023-12-15</span>
                                    </div>
                                    <div className="review-content">
                                        <p>Манай багш бол зүгээрл ална үнэхээр ааш муутайч гэсэн хичээлийг бол тултал нь заана шүү басал янзтай багш шүү.</p>
                                    </div>
                                    <div className="review-actions">
                                        <button className="like-btn"><i className="far fa-thumbs-up"></i> 24</button>
                                        <button className="reply-btn">Хариулах</button>
                                    </div>
                                </div>

                                {/* Review 2 */}
                                <div className="review-item">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <Image src="/images/student2.jpg" alt="Student 2" width={40} height={40} />
                                            <div>
                                                <h4>Ц.Гэрэлмаа</h4>
                                                <div className="review-rating">
                                                    <span className="stars">★★★★☆</span>
                                                    <span>4.5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="review-date">2023-11-20</span>
                                    </div>
                                    <div className="review-content">
                                        <p>Багш нь хичээл бүртээ маш сайн бэлтгэлтэй ирдэг. Гэхдээ заримдаа хэтэрхий хурдан ярьдаг. Хэрэв та математикт суурь мэдлэгтэй бол энэ багшийн хичээл танд тохирох байхаа.</p>
                                    </div>
                                    <div className="review-actions">
                                        <button className="like-btn"><i className="far fa-thumbs-up"></i> 12</button>
                                        <button className="reply-btn">Хариулах</button>
                                    </div>
                                </div>

                                {/* Review 3 */}
                                <div className="review-item">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <Image src="/images/student3.jpg" alt="Student 3" width={40} height={40} />
                                            <div>
                                                <h4>Д.Энхтайван</h4>
                                                <div className="review-rating">
                                                    <span className="stars">★★★★★</span>
                                                    <span>5.0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="review-date">2023-10-05</span>
                                    </div>
                                    <div className="review-content">
                                        <p>Би математикийн хичээлээс маш их айдаг байсан. Гэхдээ энэ багшийн хичээлд орсоноор математик хийхэд амархан гэдгийг ойлгосон. Тэр маш олон жишээ тайлбарлаж, бодлого бодох арга замыг сайтар заадаг.</p>
                                    </div>
                                    <div className="review-actions">
                                        <button className="like-btn"><i className="far fa-thumbs-up"></i> 35</button>
                                        <button className="reply-btn">Хариулах</button>
                                    </div>
                                </div>
                            </div>

                            <div className="add-review">
                                <h3>Сэтгэгдэл үлдээх</h3>
                                <div className="rating-input">
                                    <span>Үнэлгээ:</span>
                                    <div className="stars">
                                        <i className="far fa-star" data-rating="1"></i>
                                        <i className="far fa-star" data-rating="2"></i>
                                        <i className="far fa-star" data-rating="3"></i>
                                        <i className="far fa-star" data-rating="4"></i>
                                        <i className="far fa-star" data-rating="5"></i>
                                    </div>
                                </div>
                                <textarea placeholder="Сэтгэгдлээ бичнэ үү..."></textarea>
                                <button className="submit-review-btn">Илгээх</button>
                            </div>
                        </section>
                    </div>

                    <div className="teacher-right-column">
                        <section className="profile-section">
                            <h2><i className="fas fa-user"></i> Тухай</h2>
                            <div className="about-content">
                                <p>Би 20 гаруй жил математикийн багшаар ажилласан туршлагатай. Миний сургалтын арга зүй нь сурагч бүрийн хэрэгцээнд нийцүүлэн зохион байгуулагддаг. Би математикийг зөвхөн хичээл биш, харин амьдралын хэрэгсэл гэдэгт итгэдэг.</p>
                                <p>Миний сургалтанд оролцсон 200 гаруй сурагчид өндөр оноо авч, сайн сургуульд орсон. Олон улсын математикийн олимпиадад оролцож, аваргалсан сурагчдыг бэлтгэсэн.</p>
                            </div>
                        </section>

                        <section className="profile-section">
                            <h2><i className="fas fa-chalkboard-teacher"></i> Заах арга</h2>
                            <ul className="teaching-style-list">
                                <li>Сурган хүмүүжүүлэх шинжлэх ухааны орчин үеийн аргууд</li>
                                <li>Давталт, дадлыг голчлон ашигладаг</li>
                                <li>Оюуны чадварыг хөгжүүлэхэд чиглэсэн</li>
                                <li>Хувь хүний суралцах хэв маягт тохируулсан</li>
                                <li>Бодит амьдралд хэрэглэх жишээнүүд</li>
                            </ul>
                        </section>

                        <section className="profile-section">
                            <h2><i className="far fa-calendar-alt"></i> Цагийн хуваарь</h2>
                            <div className="schedule-container">
                                <div className="schedule-day">
                                    <h3>Даваа</h3>
                                    <p>09:00 - 12:00</p>
                                    <p>14:00 - 18:00</p>
                                </div>
                                <div className="schedule-day">
                                    <h3>Мягмар</h3>
                                    <p>10:00 - 13:00</p>
                                    <p>15:00 - 19:00</p>
                                </div>
                                <div className="schedule-day">
                                    <h3>Лхагва</h3>
                                    <p>08:00 - 12:00</p>
                                    <p>14:00 - 17:00</p>
                                </div>
                                <div className="schedule-day">
                                    <h3>Пүрэв</h3>
                                    <p>09:00 - 13:00</p>
                                    <p>16:00 - 20:00</p>
                                </div>
                                <div className="schedule-day">
                                    <h3>Баасан</h3>
                                    <p>10:00 - 14:00</p>
                                </div>
                            </div>
                        </section>

                        <section className="profile-section">
                            <h2><i className="fas fa-map-marker-alt"></i> Байршил</h2>
                            <div className="location-content">
                                <p><strong>Хаяг:</strong> Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Их Сургуулийн гудамж</p>
                                <div className="map-container">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.123456789012!2d106.12345678901234!3d47.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA3JzI0LjQiTiAxMDbCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2smn!4v1234567890123!5m2!1sen!2smn" width="100%" height="200" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                                </div>
                                <div className="teaching-methods">
                                    <h3>Заах арга</h3>
                                    <div className="method-tags">
                                        <span className="method-tag active">Онлайн</span>
                                        <span className="method-tag">Орчин үеийн</span>
                                        <span className="method-tag">Гэрийн</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="profile-section">
                            <h2><i className="fas fa-book"></i> Заадаг хичээлүүд</h2>
                            <div className="subjects-container">
                                <div className="subject-tag">Математик</div>
                                <div className="subject-tag">Алгебр</div>
                                <div className="subject-tag">Геометр</div>
                                <div className="subject-tag">Тригонометр</div>
                                <div className="subject-tag">Математик анализ</div>
                                <div className="subject-tag">Олимпиадын математик</div>
                            </div>
                        </section>

                        {/* Contact */}
                        <button className="contact-teacher-btn">Багштай холбогдох</button>

                        <div className="sticky-cart-btn">
                            <Link href='/basket'><button className="add-to-cart-btn">Сагсанд нэмэх - ₮25,000/цаг</button></Link>
                            
                        </div>
                    </div>
                </div>
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
                    // Check if user is logged in when page loads
                    document.addEventListener('DOMContentLoaded', function() {
                        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                        const signLink = document.getElementById('nevtreh');
                        
                        if (currentUser) {
                            // Change "Get started" to user's name or "Profile"
                            if (signLink) {
                                signLink.textContent = currentUser.fullname.split(' ')[0]; // Show first name
                                signLink.href = '#';
                                signLink.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    // Show user dropdown or redirect to profile
                                    if (confirm('Системээс гарах уу?')) {
                                        sessionStorage.removeItem('currentUser');
                                        window.location.reload();
                                    }
                                });
                            }
                        } else {
                            // Ensure sign in link is correct
                            if (signLink) {
                                signLink.textContent = 'Нэвтрэх';
                                signLink.href = './SignIn.html';
                            }
                        }

                        // Star rating interaction
                        const stars = document.querySelectorAll('.stars i');
                        stars.forEach(star => {
                            star.addEventListener('click', function() {
                                const rating = this.getAttribute('data-rating');
                                stars.forEach((s, index) => {
                                    if (index < rating) {
                                        s.classList.remove('far');
                                        s.classList.add('fas');
                                    } else {
                                        s.classList.remove('fas');
                                        s.classList.add('far');
                                    }
                                });
                            });
                        });

                        // Like button functionality
                        const likeButtons = document.querySelectorAll('.like-btn');
                        likeButtons.forEach(button => {
                            button.addEventListener('click', function() {
                                const icon = this.querySelector('i');
                                if (icon.classList.contains('far')) {
                                    icon.classList.remove('far');
                                    icon.classList.add('fas');
                                    const count = parseInt(this.textContent.match(/\\d+/)[0]);
                                    this.innerHTML = \`<i class="fas fa-thumbs-up"></i> \${count + 1}\`;
                                } else {
                                    icon.classList.remove('fas');
                                    icon.classList.add('far');
                                    const count = parseInt(this.textContent.match(/\\d+/)[0]);
                                    this.innerHTML = \`<i class="far fa-thumbs-up"></i> \${count - 1}\`;
                                }
                            });
                        });

                        // Add to cart functionality
                        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
                        addToCartButtons.forEach(button => {
                            button.addEventListener('click', function() {
                                if (!currentUser) {
                                    alert('Сагсанд нэмэхийн тулд эхлээд нэвтэрнэ үү');
                                    window.location.href = './SignIn.html';
                                    return;
                                }
                                
                                // In a real app, you would add the teacher to the cart here
                                alert('Багш амжилттай сагсанд нэмэгдлээ!');
                                
                                // You would typically update cart count in the navbar here
                            });
                        });
                    });
                `
            }} />
        </>
    );
}