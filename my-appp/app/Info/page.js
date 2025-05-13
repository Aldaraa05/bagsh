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
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? value : item
      )
    }));
  };

    const addArrayField = (field) => {
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

    const removeArrayField = (field, index) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user data directly from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!form.mainCategory || !form.subcategory || !form.specificSubject) {
      alert('Бүх шаардлагатай талбарыг бөглөнө үү');
      return;
    }

    const subjectPath = `${form.mainCategory}.${form.subcategory}.${form.specificSubject}`;

    try {
      const res = await fetch('/api/infos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gmail: userData.gmail, // From localStorage
          subjectPath,
          experience: form.experience.filter(Boolean),
          certificates: form.certificates.filter(Boolean),
          achievements: form.achievements.filter(Boolean),
          schedule: form.schedule.filter(Boolean),
          teachingMethods: form.teachingMethods,
          history: form.history,
          location: form.location,
          teamsLink: form.teamsLink,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        // Update local storage with new teacher info
        const updatedUser = { ...userData, info: result.info };
        localStorage.setItem('userData', JSON.stringify(updatedUser));

        alert(`Амжилттай хадгалагдлаа! Багшийн дугаар: ${result.teacherId}`);
        router.push('/');
      } else {
        alert(result.error || 'Хадгалахад алдаа гарлаа');
      }
    } catch (err) {
      console.error(err);
      alert('Сервертэй холбогдоход алдаа гарлаа');
    }
  };


  // Available options for subject selection
const mainCategories = [
  { value: 'Baigaliin_uhaan', label: 'Байгалийн ухаан' },
  { value: 'IT', label: 'IT' },
  { value: 'Sport', label: 'Спорт' },
  { value: 'Niigmiin_uhaan', label: 'Нийгмийн ухаан' },
  { value: 'Humuunlegiin_uhaan', label: 'Хүмүүнлэгийн ухаан' },
  { value: 'Business', label: 'Бизнес' }
];

const subcategories = {
  'Baigaliin_uhaan': [
    { value: 'fizik', label: 'Физик' },
    { value: 'Himi', label: 'Хими' },
    { value: 'Biology', label: 'Биологи' },
    { value: 'Math', label: 'Математик' },
    { value: 'Astronomi', label: 'Астрономи' }
  ],
  'IT': [
    { value: 'Programchlal', label: 'Програмчлал' },
    { value: 'UgugdliinSan', label: 'Өгөгдлийн сан' },
    { value: 'Cybersecurity', label: 'Кибер аюулгүй байдал' }
  ],
  'Sport': [
    { value: 'fitness', label: 'Фитнес' },
    { value: 'bumbug', label: 'Бөмбөгний спорт' },
    { value: 'hooliin_sport', label: 'Хөлний спорт' }
  ],
  'Niigmiin_uhaan': [
    { value: 'Tuuh', label: 'Түүх' },
    { value: 'Ediin_zasag', label: 'Эдийн засаг' }
  ],
  'Humuunlegiin_uhaan': [
    { value: 'Philosopy', label: 'Философи' }
  ],
  'Business': [
    { value: 'Marketing', label: 'Маркетинг' },
    { value: 'Management', label: 'Менежмент' }
  ]
};

const specificSubjects = {
  // Physics subjects
  'fizik': [
    { value: 'klassik_fizik', label: 'Классик Физик' },
    { value: 'kvant_fizik', label: 'Квант Физик' },
    { value: 'atom_fizik', label: 'Атомын Физик' },
    { value: 'elektronik', label: 'Электроник' }
  ],
  
  'Himi': [
    { value: 'organik_himi', label: 'Органик Хими' },
    { value: 'analitik_himi', label: 'Аналитик Хими' },
    { value: 'biokhimi', label: 'Биохими' }
  ],
  
  'Biology': [
    { value: 'amid_biology', label: 'Амьд Биологи' },
    { value: 'genetik', label: 'Генетик' },
    { value: 'ekologi', label: 'Экологи' }
  ],
  
  'Math': [
    { value: 'yoronhii_math', label: 'Ерөнхий Математик' },
    { value: 'discret_math', label: 'Дискрет Математик' },
    { value: 'matrix_analiz', label: 'Матриц Анализ' },
    { value: 'tootsoolol', label: 'Тооцоолол' }
  ],
  'Astronomi': [
    { value: 'gurvan_biyet', label: 'Гурван Биет' },
    { value: 'odiin_astronomi', label: 'Оддын Астрономи' }
  ],
  'Programchlal': [
    { value: 'web_dev', label: 'Веб Хөгжүүлэлт' },
    { value: 'mobile_dev', label: 'Мобайл Хөгжүүлэлт' },
    { value: 'ai_programming', label: 'Хиймэл Оюун' }
  ],
  'UgugdliinSan': [
    { value: 'database_design', label: 'Өгөгдлийн сангийн дизайн' },
    { value: 'sql_mongo', label: 'SQL & MongoDB' }
  ],
  'Cybersecurity': [
    { value: 'ethical_hacking', label: 'Этик Хакерчлал' },
    { value: 'network_security', label: 'Сүлжээний Аюулгүй Байдал' }
  ],
  'fitness': [
    { value: 'powerlift', label: 'Пауэрлифтинг' },
    { value: 'yoga', label: 'Йога' },
    { value: 'crossfit', label: 'Кроссфит' }
  ],
  'bumbug': [
    { value: 'sagsan_bumbug', label: 'Сагсан Бөмбөг' },
    { value: 'hulbumbug', label: 'Хөлбөмбөг' }
  ],
  'hooliin_sport': [
    { value: 'volleyball', label: 'Волейбол' },
    { value: 'tennis', label: 'Теннис' }
  ],
  'Tuuh': [
    { value: 'mongol_tuuh', label: 'Монголын Түүх' },
    { value: 'deed_tuuh', label: 'Дэлхийн Түүх' }
  ],
  'Ediin_zasag': [
    { value: 'mikro_ediin', label: 'Микро Эдийн Засаг' },
    { value: 'makro_ediin', label: 'Макро Эдийн Засаг' }
  ],
  'Philosopy': [
    { value: 'uran_zohiol', label: 'Уран Зохиол' },
    { value: 'filosofi', label: 'Философи' }
  ],
  'Marketing': [
    { value: 'digital_marketing', label: 'Цахим Маркетинг' }
  ],
  'Management': [
    { value: 'project_management', label: 'Төслийн Удирдлага' }
  ]
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