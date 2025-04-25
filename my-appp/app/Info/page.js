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

    const teacherInfo = {
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

    const res = await fetch('/api/teacherinfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherInfo),
    });

    const result = await res.json();
    alert(result.message || result.error);
    router.push('/'); // Go to main page after saving
  };

  return (
    <form onSubmit={handleSubmit} className="info-form">
      <h2>Complete Your Teaching Profile</h2>

      {['experience', 'certificates', 'subjects', 'achievements', 'schedule'].map((field) => (
        <div key={field} className="dynamic-field-container">
          <label className="field-label">{field}</label>
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
          <button type="button" onClick={() => addArrayField(field)} className="add-button">
            + Add {field}
          </button>
        </div>
      ))}

      <textarea
        name="teachingMethods"
        placeholder="Teaching Methods"
        onChange={handleChange}
        className="textarea"
      />
      <textarea
        name="history"
        placeholder="History"
        onChange={handleChange}
        className="textarea"
      />
      <input
        name="location"
        placeholder="Location (optional)"
        onChange={handleChange}
        className="input"
      />
      <input
        name="teamsLink"
        placeholder="Microsoft Teams Link (optional)"
        onChange={handleChange}
        className="input"
      />

      <button type="submit" className="submit-button">Save Info</button>

      <Link href="/" className="skip-link">
        Skip for now
      </Link>
    </form>
  );
}
