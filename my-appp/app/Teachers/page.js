"use client";

import Teacher from "@/components/Teacher";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../../styles/Teachers.css";
import "../../styles/global.css";

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTeachers, setVisibleTeachers] = useState(6);
  const [activeMainCateg, setMainCat] = useState(null);
  const [activeSubCateg, setSubCat] = useState(null);
  const [activeSubjectGroup, setActiveSubjectGroup] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('/api/teachers/search');
        const data = await response.json();
        setTeachers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

const extractCategories = () => {
  const categories = {
    main: new Set(),
    sub: {},
    subjectGroups: {}
  };

  teachers.forEach(teacher => {
    if (teacher.info?.subjectPath) {
      const pathParts = teacher.info.subjectPath.split('.');
      if (pathParts.length > 0) {
        categories.main.add(pathParts[0]);
        
        // Initialize subcategory object for this main category if not exists
        if (!categories.sub[pathParts[0]]) {
          categories.sub[pathParts[0]] = new Set();
        }
        
        if (pathParts.length > 1) {
          categories.sub[pathParts[0]].add(pathParts[1]);
          
          // Initialize subject group object for this subcategory if not exists
          const subKey = `${pathParts[0]}.${pathParts[1]}`;
          if (!categories.subjectGroups[subKey]) {
            categories.subjectGroups[subKey] = new Set();
          }
          
          if (pathParts.length > 2) {
            categories.subjectGroups[subKey].add(pathParts[2]);
          }
        }
      }
    }
  });

    return {
      mainCategories: Array.from(categories.main),
      subCategories: categories.sub, 
      subjectGroups: categories.subjectGroups 
    };
};

  const { mainCategories, subCategories, subjectGroups } = extractCategories();
  const currentSubCategories = activeMainCateg 
    ? Array.from(subCategories[activeMainCateg] || []) 
    : [];

  const currentSubjectGroups = activeMainCateg && activeSubCateg
    ? Array.from(subjectGroups[`${activeMainCateg}.${activeSubCateg}`] || [])
  : [];

  const getfilteredTeachers = () => {
    let filtered = teachers.filter(teacher => {
      // Filter by search term
      const matchesSearch = searchTerm 
        ? teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          (teacher.info?.subjects?.join(' ') || '').toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Filter by category
      const matchesCategory = !activeMainCateg || 
        (teacher.info?.subjectPath?.startsWith(activeMainCateg) ?? false);
      
      // Filter by subcategory
      const matchesSubCategory = !activeSubCateg || 
        (teacher.info?.subjectPath?.includes(`${activeMainCateg}.${activeSubCateg}`) ?? false);
      
      // Filter by subject group
      const matchesSubjectGroup = !activeSubjectGroup || 
        (teacher.info?.subjectPath?.endsWith(activeSubjectGroup) ?? false);

      return matchesSearch && matchesCategory && matchesSubCategory && matchesSubjectGroup;
    });

    return filtered;
  };

  const filteredTeachers = getfilteredTeachers();

  if (loading) {
    return <div className="loading">Loading teachers...</div>;
  }

  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Монголын шилдэг багш нартай танилцах</h1>
          <p>Танд тохирох чанартай боловсролыг бидэнтэй хамт бүтээцгээе</p>
          <div className="hero-buttons">
            {/* <Link href="/Signup/page.js" className="primary-btn">Багш болох</Link> */}
            {/* <button className="secondary-btn">Сурагч болох</button> */}
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
            <p className="bio">
              10+ жилийн туршлагатай математикийн мэргэжилтэн
            </p>

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
              <Link
                href="/profile"
                style={{ textDecoration: "none", color: "white" }}
              >
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
                <p>
                  Монгол Улсын Их Сургууль, Боловсролын сургуульд ахлах багш
                </p>
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
                <p>
                  Математикийн хичээлийн сургалтын контент хөгжүүлэх судлаач
                </p>
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
            <button
              className={`filter-tag ${!activeMainCateg ? "active" : ""}`}
              onClick={() => {
                setMainCat(null);
                setSubCat(null);
                setActiveSubjectGroup(null);
              }}
            >
              Бүгд
            </button>
            {mainCategories.map((category) => (
              <button
                key={category}
                className={`filter-tag ${
                  activeMainCateg === category ? "active" : ""
                }`}
                onClick={() => {
                  setMainCat(category);
                  setSubCat(null);
                  setActiveSubjectGroup(null);
                }}
              >
                {category.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          {activeMainCateg && (
            <div className="filter-section">
              <h4>Дэд ангилал</h4>
              <div className="filter-tags">
                <button
                  className={`filter-tag ${!activeSubCateg ? "active" : ""}`}
                  onClick={() => {
                    setSubCat(null);
                    setActiveSubjectGroup(null);
                  }}
                >
                  Бүгд
                </button>
                {currentSubCategories.map((subCategory) => (
                  <button
                    key={subCategory}
                    className={`filter-tag ${
                      activeSubCateg === subCategory ? "active" : ""
                    }`}
                    onClick={() => {
                      setSubCat(subCategory);
                      setActiveSubjectGroup(null);
                    }}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSubCateg && (
            <div className="filter-section">
              <h4>Сэдвүүд</h4>
              <div className="filter-tags">
                <button
                  className={`filter-tag ${
                    !activeSubjectGroup ? "active" : ""
                  }`}
                  onClick={() => setActiveSubjectGroup(null)}
                >
                  Бүгд
                </button>
                {currentSubjectGroups.map((subject) => (
                  <button
                    key={subject}
                    className={`filter-tag ${
                      activeSubjectGroup === subject ? "active" : ""
                    }`}
                    onClick={() => setActiveSubjectGroup(subject)}
                  >
                    {subject.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="teachers-grid">
        <div className="grid-container">
          {filteredTeachers.length > 0 ? (
            filteredTeachers
              .slice(0, visibleTeachers)
              .map((teacher) => (
                <Teacher 
                  key={teacher._id} 
                  teacher={{
                    real_id: teacher._id,
                    id: teacher.info?.id,
                    name: `${teacher.name} ${teacher.surname}`,
                    subject: teacher.info?.subjects?.[0] || "No subject",
                    experience: teacher.info?.experience?.join(", ") || "No experience",
                    rating: teacher.info?.rating || 4.0,
                    price: teacher.info?.price || "₮25,000/цаг",
                    image: teacher.picture?.url || "/zurag/pro.png"
                  }} 
                />
              ))
          ) : (
            <p className="no-results">Илэрц олдсонгүй</p>
          )}
        </div>

        {filteredTeachers.length > visibleTeachers && (
          <button
            className="load-more-btn"
            onClick={() => setVisibleTeachers((prev) => prev + 6)}
          >
            Цааш үзэх
          </button>
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
  );
}
