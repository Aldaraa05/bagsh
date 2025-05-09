'use client';
import { useState } from 'react';
import '../../styles/info.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TeacherInfoPage() {
  const [form, setForm] = useState({
    experience: [''],
    certificates: [''],
    subjects: [''],
    achievements: [''],
    schedule: [''],
    teachingMethods: '',
    history: '',
    location: '',
    teamsLink: '',
    mainCategory: '',
    subcategory: '',
    specificSubject: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.mainCategory || !form.subcategory || !form.specificSubject) {
      alert('Please select your subject area completely');
      return;
    }

    const subjectPath = `${form.mainCategory}.${form.subcategory}.${form.specificSubject}`;
    const teacherGmail = ''; // Replace with actual user's email from session

    const teacherInfo = {
      gmail: teacherGmail,
      subjectPath,
      experience: form.experience.filter(Boolean),
      certificates: form.certificates.filter(Boolean),
      subjects: form.subjects.filter(Boolean),
      achievements: form.achievements.filter(Boolean),
      schedule: form.schedule.filter(Boolean),
      teachingMethods: form.teachingMethods,
      history: form.history,
      location: form.location,
      teamsLink: form.teamsLink,
    };

    try {
      const res = await fetch('/api/infos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherInfo),
      });

      const result = await res.json();
      if (res.ok) {
        alert(`Profile saved successfully! Your teacher ID: ${result.teacherId}`);
        router.push('/');
      } else {
        alert(result.error || 'Failed to save profile');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server');
    }
  };

  // Available options for subject selection
  const mainCategories = [
    { value: 'Baigaliin_uhaan', label: 'Байгалийн ухаан' },
    { value: 'IT', label: 'IT' },
    { value: 'Sport', label: 'Спорт' },
    // Add other categories
  ];

  const subcategories = {
    'Baigaliin_uhaan': [
      { value: 'fizik', label: 'Физик' },
      { value: 'Himi', label: 'Хими' },
      { value: 'Biology', label: 'Биологи' },
      // Add other subcategories
    ],
    'IT': [
      { value: 'Programchlal', label: 'Програмчлал' },
      { value: 'UgugdliinSan', label: 'Өгөгдлийн сан' },
      // Add other subcategories
    ],
    // Add other categories
  };

  const specificSubjects = {
    'fizik': [
      { value: 'klassik_fizik', label: 'Классик Физик' },
      { value: 'kvant_fizik', label: 'Квант Физик' },
      // Add other subjects
    ],
    'Himi': [
      { value: 'organik_himi', label: 'Органик Хими' },
      { value: 'analitik_himi', label: 'Аналитик Хими' },
      // Add other subjects
    ],
    // Add other subcategories
  };

  return (
    <form onSubmit={handleSubmit} className="info-form">
      <h2>Багшийн мэдээлэл бөглөх</h2>

      {/* Subject Selection */}
      <div className="form-group">
        <label>Үндсэн ангилал</label>
        <select
          name="mainCategory"
          value={form.mainCategory}
          onChange={handleChange}
          required
        >
          <option value="">Сонгох</option>
          {mainCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {form.mainCategory && (
        <div className="form-group">
          <label>Дэд ангилал</label>
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            required
          >
            <option value="">Сонгох</option>
            {subcategories[form.mainCategory]?.map((sub) => (
              <option key={sub.value} value={sub.value}>{sub.label}</option>
            ))}
          </select>
        </div>
      )}

      {form.subcategory && (
        <div className="form-group">
          <label>Хичээлийн нэр</label>
          <select
            name="specificSubject"
            value={form.specificSubject}
            onChange={handleChange}
            required
          >
            <option value="">Сонгох</option>
            {specificSubjects[form.subcategory]?.map((subj) => (
              <option key={subj.value} value={subj.value}>{subj.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Dynamic Array Fields */}
      {['experience', 'certificates', 'achievements', 'schedule'].map((field) => (
        <div key={field} className="dynamic-field-container">
          <label className="field-label">
            {field === 'experience' ? 'Туршлага' : 
             field === 'certificates' ? 'Сертификат' : 
             field === 'achievements' ? 'Амжилтууд' : 'Хуваарь'}
          </label>
          {form[field].map((item, idx) => (
            <div key={idx} className="dynamic-field">
              <input
                value={item}
                placeholder={`${field} ${idx + 1}`}
                onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                className="dynamic-input"
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addArrayField(field)} 
            className="add-button"
          >
            + Нэмэх
          </button>
        </div>
      ))}

      {/* Other Fields */}
      <div className="form-group">
        <label>Заах арга</label>
        <textarea
          name="teachingMethods"
          placeholder="Заах арга барил"
          value={form.teachingMethods}
          onChange={handleChange}
          className="textarea"
        />
      </div>

      <div className="form-group">
        <label>Түүх</label>
        <textarea
          name="history"
          placeholder="Боловсрол, ажлын туршлага"
          value={form.history}
          onChange={handleChange}
          className="textarea"
        />
      </div>

      <div className="form-group">
        <label>Байршил (заавал биш)</label>
        <input
          name="location"
          placeholder="Хаанаас хичээл заадаг вэ?"
          value={form.location}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Teams холбоос (заавал биш)</label>
        <input
          name="teamsLink"
          placeholder="Microsoft Teams холбоос"
          value={form.teamsLink}
          onChange={handleChange}
          className="input"
        />
      </div>

      <button type="submit" className="submit-button">Хадгалах</button>

      <Link href="/" className="skip-link">
        Дараа бөглөх
      </Link>
    </form>
  );
}