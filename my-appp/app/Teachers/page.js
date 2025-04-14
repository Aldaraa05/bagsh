"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '../../styles/Teachers.css'
import '../../styles/global.css'
import Teacher from '@/components/Teacher'
import { teachers } from '../data/teachers'

export default function Teachers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('Бүгд');
    const [visibleTeachers, setVisibleTeachers] = useState(6);
    // bagshiig filter hiine 
    const filteredTeachers = teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'Бүгд' || teacher.subject === activeFilter;
      return matchesSearch && matchesFilter;
    });
    
    return (
        <div>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Монголын шилдэг багш нартай танилцах</h1>
                    <p>Танд тохирох чанартай боловсролыг бидэнтэй хамт бүтээцгээе</p>
                    <div className="hero-buttons">
                        <Link href="/Signup/page.js" className="primary-btn">Багш болох</Link>
                        <button className="secondary-btn">Сурагч болох</button>
                    </div>
                </div>
                <div className="hero-image">
                    <Image 
                        src="/zurag/teacher.png" 
                        alt="Featured Teacher" 
                        width={500} 
                        height={500}
                    />
                </div>
            </div>

            <div className="featured-teacher">
                <div className="teacher-card">
                    <div className="teacher-profile">
                        <Image 
                            src="/zurag/pro.png" 
                            alt="Teacher Profile" 
                            width={200} 
                            height={200}
                        />
                        <div className="teacher-rating">
                            <span>4.9</span>
                            <Image 
                                src="/zurag/star.webp" 
                                alt="Star Rating" 
                                width={20} 
                                height={20}
                            />
                        </div>
                    </div>
                    <div className="teacher-info">
                        <h2>А.Балданпүрэв</h2>
                        <p className="subject">Математикийн багш</p>
                        <p className="bio">10+ жилийн туршлагатай математикийн мэргэжилтэн</p>
                        
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
                        
                        <button className="view-profile-btn">
                            <Link href="#" style={{textDecoration: 'none', color: 'white'}}>
                                Профайл харах
                            </Link>
                        </button>
                    </div>
                </div>
                
                <div className="teacher-experience">
                    <h2>Ажилласан байдал</h2>
                    <div className="experience-timeline">
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
                                <p>Монгол Улсын Их Сургууль, Боловсролын сургуульд ахлах багш</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>2015 - 2023</h3>
                                <p>ШУТИС-д Докторын зэрэг хамгаалж, профессор</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>2023 - одоо</h3>
                                <p>Математикийн хичээлийн сургалтын контент хөгжүүлэх судлаач</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="search-section">
                <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Хайх... (жишээ нь: Математик, Физик)" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <svg viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
                </div>
                
                <div className="filter-section">
                <h3>Ангилалаар хайх</h3>
                <div className="filter-tags">
                    {['Бүгд', 'Математик', 'Физик', 'Хими', 'Англи хэл', 'Програмчлал'].map((subject) => (
                    <button 
                        key={subject}
                        className={`filter-tag ${activeFilter === subject ? 'active' : ''}`}
                        onClick={() => setActiveFilter(subject)}
                    >
                        {subject}
                    </button>
                    ))}
                </div>
                </div>
            </div>


            <div className="teachers-grid">
                <div className="grid-container">
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.slice(0, visibleTeachers).map(teacher => (
                    <Teacher key={teacher.id} teacher={teacher} />
                    ))
                ) : (
                    <p className="no-results">Илэрц олдсонгүй</p>
                )}
                </div>
                
                {filteredTeachers.length > visibleTeachers && (
                <button 
                    className="load-more-btn"
                    onClick={() => setVisibleTeachers(umnuh => umnuh + 6)}>Цааш үзэх</button>
                )}
            </div>

            <div className="cta-section">
                <div className="cta-content">
                    <h2>Багш болох хүсэлт илгээх</h2>
                    <p>Та багш болж бүртгүүлмээр байвал энд дарна уу</p>
                    <button className="cta-btn">Бүртгүүлэх</button>
                </div>
            </div>
        </div>
    )
}