"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '../../../styles/profile.css';
import '../../../styles/global.css';

export default function Profile() {
    const params = useParams();
    const router = useRouter();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({
        comment: '',
        rating: 0
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [likedReviews, setLikedReviews] = useState({});
    const [authLinkText, setAuthLinkText] = useState('Нэвтрэх');
    const [authLinkHref, setAuthLinkHref] = useState('/SignIn.html');

    useEffect(() => {
        const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userData')) : null;
        setCurrentUser(user);
        fetchReviews();
    }, [params.id]);

    useEffect(() => {
        if (currentUser) {
            setAuthLinkText(currentUser.name || currentUser.fullname?.split(' ')[0] || 'Хэрэглэгч');
            setAuthLinkHref('#');
        } else {
            setAuthLinkText('Нэвтрэх');
            setAuthLinkHref('/SignIn.html');
        }
    }, [currentUser]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?teacherId=${params.id}`);
            const data = await res.json();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleLogout = () => {
        if (confirm('Системээс гарах уу?')) {
            localStorage.removeItem('userData');
            setCurrentUser(null);
            router.refresh();
        }
    };

    const handleRatingSelect = (rating) => {
        setNewReview(prev => ({ ...prev, rating }));
    };

    const handleLikeReview = (reviewId) => {
        setLikedReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Та энэ сэтгэгдлийг устгахдаа итгэлтэй байна уу?')) {
            return;
        }

        try {
            const response = await fetch(`/api/reviews?_id=${reviewId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete review');
            }

            setReviews(reviews.filter(review => review._id !== reviewId));
            alert('Сэтгэгдэл устгагдлаа');
        } catch (error) {
            console.error('Error deleting review:', error);
            alert(`Сэтгэгдэл устгахэд алдаа гарлаа: ${error.message}`);
        }
    };

    const handleSubmitReview = async () => {
        if (!currentUser) {
            alert('Сэтгэгдэл үлдээхийн тулд эхлээд нэвтэрнэ үү');
            return;
        }

        if (!newReview.comment.trim()) {
            alert('Сэтгэгдэл бичнэ үү');
            return;
        }

        if (newReview.rating < 1 || newReview.rating > 5) {
            alert('1-5 хооронд үнэлгээ өгнө үү');
            return;
        }

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacherId: params.id,
                    studentId: currentUser._id || currentUser.id,
                    studentName: currentUser.name || currentUser.fullname || 'Хэрэглэгч',
                    comment: newReview.comment,
                    rating: newReview.rating
                })
            });

            if (response.ok) {
                const result = await response.json();
                setReviews([result, ...reviews]);
                setNewReview({ comment: '', rating: 0 });
                alert('Сэтгэгдэл амжилттай илгээгдлээ!');
            } else {
                throw new Error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Сэтгэгдэл илгээхэд алдаа гарлаа');
        }
    };

    const addToBasket = () => {
        if (!currentUser) {
            alert('Сагсанд нэмэхийн тулд эхлээд нэвтэрнэ үү');
            router.push('/SignIn.html');
            return;
        }

        const currentBasket = JSON.parse(localStorage.getItem('basket')) || [];
        const alreadyInBasket = currentBasket.some(item => item.id === teacher.id);
        
        if (alreadyInBasket) {
            alert('Энэ багш аль хэдийн сагсанд нэмэгдсэн байна');
            return;
        }
        
        const teacherToAdd = {
            ...teacher,
            quantity: 1,
            selectedDay: 'Даваа',
            selectedTime: '09:00 - 12:00',
        };
        
        localStorage.setItem('basket', JSON.stringify([...currentBasket, teacherToAdd]));
        alert(`${teacher.name} багш амжилттай сагсанд нэмэгдлээ!`);
    };

    useEffect(() => {
        async function fetchTeacherData() {
            try {
                const res = await fetch('/api/teachers/search');
                const data = await res.json();
                const foundTeacher = data.find(t => 
                    t._id === params.id || 
                    (t.info && t.info.id && t.info.id.toString() === params.id)
                );
                
                if (foundTeacher) {
                    setTeacher({
                        id: foundTeacher._id,
                        name: `${foundTeacher.name} ${foundTeacher.surname}`,
                        subject: foundTeacher.info?.subjects?.[0] || "No subject",
                        subjectPath: foundTeacher.info?.subjectPath || "",
                        experience: foundTeacher.info?.experience?.join(", ") || "No experience",
                        rating: foundTeacher.info?.rating || 4.0,
                        price: foundTeacher.info?.price || "₮25,000/цаг",
                        image: foundTeacher.picture?.url || "/zurag/pro.png",
                        certificates: foundTeacher.info?.certificates || [],
                        achievements: foundTeacher.info?.achievements || [],
                        schedule: foundTeacher.info?.schedule || [],
                        teachingMethods: foundTeacher.info?.teachingMethods || "Not specified",
                        history: foundTeacher.info?.history || "No history provided",
                        location: foundTeacher.info?.location || "Location not specified",
                        teamsLink: foundTeacher.info?.teamsLink || "",
                        contact: {
                            email: foundTeacher.gmail || "",
                            phone: foundTeacher.number || ""
                        },
                        role: foundTeacher.role || "teacher",
                        createdAt: foundTeacher.createdAt || ""
                    });
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
        <div className="teacher-profile-container">
            {/* Auth Link */}
            <a 
                id="nevtreh"
                href={authLinkHref}
                onClick={(e) => {
                    if (currentUser) {
                        e.preventDefault();
                        handleLogout();
                    }
                }}
                style={{ position: 'absolute', top: '20px', right: '20px' }}
            >
                {authLinkText}
            </a>

            {/* Teacher Header */}
            <div className="teacher-header">
                <div className="teacher-avatar">
                    <Image src={teacher.image} alt="Teacher Avatar" width={150} height={150} />
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
                            <h3>{teacher.experience?.split(',').length || 0}+</h3>
                            <p>Жил</p>
                        </div>
                    </div>
                    <div className="price-section">
                        <span className="price">{teacher.price}</span>
                        <button className="add-to-cart-btn" onClick={addToBasket}>
                            Сагсанд нэмэх
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="teacher-main-content">
                {/* Left Column */}
                <div className="teacher-left-column">
                    {/* Education Section */}
                    <section className="profile-section">
                        <h2><i className="fas fa-graduation-cap"></i> Боловсрол</h2>
                        {teacher.history ? (
                            <div className="education-item">
                                <p>{teacher.history}</p>
                            </div>
                        ) : (
                            <p>Боловсролын мэдээлэл оруулаагүй байна</p>
                        )}
                    </section>

                    {/* Work Experience */}
                    <section className="profile-section">
                        <h2><i className="fas fa-briefcase"></i> Ажлын туршлага</h2>
                        {teacher.experience ? (
                            <div className="timeline">
                                {teacher.experience.split(',').map((exp, index) => (
                                    <div className="timeline-item" key={index}>
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <p>{exp.trim()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Ажлын туршлагын мэдээлэл оруулаагүй байна</p>
                        )}
                    </section>

                    {/* Achievements */}
                    <section className="profile-section">
                        <h2><i className="fas fa-trophy"></i> Амжилтууд</h2>
                        {teacher.achievements?.length > 0 ? (
                            <ul className="achievements-list">
                                {teacher.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Амжилтуудын мэдээлэл оруулаагүй байна</p>
                        )}
                    </section>

                    {/* Certificates */}
                    <section className="profile-section">
                        <h2><i className="fas fa-certificate"></i> Гэрчилгээ</h2>
                        {teacher.certificates?.length > 0 ? (
                            <div className="certificates-grid">
                                {teacher.certificates.map((certificate, index) => (
                                    <div className="certificate-item" key={index}>
                                        <Image 
                                            src={certificate.url || "/images/default-certificate.jpg"} 
                                            alt={`Certificate ${index + 1}`} 
                                            width={150} 
                                            height={100} 
                                        />
                                        <p>{certificate.name || `Гэрчилгээ ${index + 1}`}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Гэрчилгээний мэдээлэл оруулаагүй байна</p>
                        )}
                    </section>

                    {/* Reviews Section */}
                    <section className="profile-section">
                        <h2><i className="fas fa-comments"></i> Сэтгэгдлүүд</h2>
                        <div className="reviews-container">
                            {reviews.map((review) => (
                                <div key={review._id} className="review-item">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <Image src="/images/student1.jpg" alt="Student" width={40} height={40} />
                                            <div>
                                                <h4>{review.studentName}</h4>
                                                <div className="review-rating">
                                                    <span className="stars">
                                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                    </span>
                                                    <span>{review.rating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="review-date">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="review-content">
                                        <p>{review.comment}</p>
                                    </div>
                                    <div className="review-actions">
                                        <button 
                                            className="like-btn" 
                                            onClick={() => handleLikeReview(review._id)}
                                        >
                                            <i className={likedReviews[review._id] ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i> 
                                            {likedReviews[review._id] ? (review.likes || 0) + 1 : review.likes || 0}
                                        </button>
                                        {currentUser?._id === review.studentId && (
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => handleDeleteReview(review._id)}
                                            >
                                                Устгах
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Review Form */}
                        <div className="add-review">
                            <h3>Сэтгэгдэл үлдээх</h3>
                            <div className="rating-input">
                                <span>Үнэлгээ:</span>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i 
                                            key={star}
                                            className={star <= newReview.rating ? "fas fa-star" : "far fa-star"}
                                            onClick={() => handleRatingSelect(star)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <textarea 
                                placeholder="Сэтгэгдлээ бичнэ үү..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                            />
                            <button 
                                className="submit-review-btn"
                                onClick={handleSubmitReview}
                            >
                                Илгээх
                            </button>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="teacher-right-column">
                    {/* About Section */}
                    <section className="profile-section">
                        <h2><i className="fas fa-user"></i> Тухай</h2>
                        <div className="about-content">
                            {teacher.history ? (
                                <p>{teacher.history}</p>
                            ) : (
                                <p>Тухай мэдээлэл оруулаагүй байна</p>
                            )}
                        </div>
                    </section>

                    {/* Teaching Methods */}
                    <section className="profile-section">
                        <h2><i className="fas fa-chalkboard-teacher"></i> Заах арга</h2>
                        {teacher.teachingMethods ? (
                            <ul className="teaching-style-list">
                                {teacher.teachingMethods.split(',').map((method, index) => (
                                    <li key={index}>{method.trim()}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Заах аргын мэдээлэл оруулаагүй байна</p>
                        )}
                    </section>

                    {/* Schedule */}
                    <section className="profile-section">
                        <h2><i className="far fa-calendar-alt"></i> Цагийн хуваарь</h2>
                        {teacher.schedule?.length > 0 ? (
                            <div className="schedule-container">
                                {teacher.schedule.map((daySchedule, index) => (
                                    <div className="schedule-day" key={index}>
                                        <p>{daySchedule}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Цагийн хуваарийн мэдээлэл оруулаагүй байна</p>
                        )}
                    </section>

                    {/* Location */}
                    <section className="profile-section">
                        <h2><i className="fas fa-map-marker-alt"></i> Байршил</h2>
                        <div className="location-content">
                            <p><strong>Хаяг:</strong> {teacher.location || "Байршил оруулаагүй байна"}</p>
                            <div className="map-container">
                                <iframe 
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.123456789012!2d106.12345678901234!3d47.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA3JzI0LjQiTiAxMDbCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2smn!4v1234567890123!5m2!1sen!2smn`} 
                                    width="100%" 
                                    height="200" 
                                    style={{border:0}} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="teaching-methods">
                                <h3>Заах арга</h3>
                                <div className="method-tags">
                                    {teacher.teachingMethods?.includes('Онлайн') && (
                                        <span className="method-tag active">Онлайн</span>
                                    )}
                                    {teacher.teachingMethods?.includes('Орчин үеийн') && (
                                        <span className="method-tag">Орчин үеийн</span>
                                    )}
                                    {teacher.teachingMethods?.includes('Гэрийн') && (
                                        <span className="method-tag">Гэрийн</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Subjects */}
                    <section className="profile-section">
                        <h2><i className="fas fa-book"></i> Заадаг хичээлүүд</h2>
                        <div className="subjects-container">
                            {teacher.subjects?.map((subject, index) => (
                                <div className="subject-tag" key={index}>{subject}</div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Button */}
                    <button className="contact-teacher-btn">
                        Багштай холбогдох: {teacher.contact?.phone || teacher.number}
                    </button>
                </div>
            </div>
        </div>
    );
}