'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/TeacherInfoUpdater.css'
export default function TeacherInfoUpdater() {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [activeField, setActiveField] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    
    if (!user) {
      router.push('/signin');
      return;
    }
    console.log(user)
    if (user.role !== 'teacher') {
      router.push('/');
      return;
    }

    fetchTeacherInfo(user._id);
  }, []);

  const fetchTeacherInfo = async (teacherId) => {
    try {
      const res = await fetch(`/api/infoUp/${teacherId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch teacher info');
      }
      const data = await res.json();
      setTeacherInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    const updateInfo = async (field, value, action = 'add') => {
    try {
        const res = await fetch(`/api/infoUp/${teacherInfo._id}`, {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            field,   
            value,
            action
        }),
        });

        if (!res.ok) {
        throw new Error('Failed to update info');
        }

        fetchTeacherInfo(teacherInfo._id);
        setActiveField(null);
        setNewItem('');
    } catch (err) {
        setError(err.message);
    }
    };

  const handleAddItem = (field) => {
    if (!newItem.trim()) return;
    updateInfo(field, newItem.trim());
  };

  const handleRemoveItem = (field, item) => {
    updateInfo(field, item, 'remove');
  };

  const handleUpdateField = (field, value) => {
    updateInfo(field, value);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Алдаа: {error}</div>;
  if (!teacherInfo) return <div className="text-center py-8">Багш олдсонгүй</div>;

  const arrayFields = [
    { name: 'experience', label: 'Experience' },
    { name: 'certificates', label: 'Certificates' },
    { name: 'achievements', label: 'Achievements' },
    { name: 'schedule', label: 'Schedule' },
  ];

  const singleFields = [
    { name: 'teachingMethods', label: 'Teaching Methods' },
    { name: 'history', label: 'History' },
    { name: 'location', label: 'Location' },
    { name: 'teamsLink', label: 'Teams Link' },
  ];
return (
    <div className="teacher-profile-updater">
      <h1>Мэдээллээ өөрчлөх</h1>
      
      <div className="profile-sections-container">
        {arrayFields.map(({ name, label }) => (
          <div key={name} className="profile-section">
            <h2>{label}</h2>
            <ul className="items-list">
              {teacherInfo.info[name]?.map((item, index) => (
                <li key={index} className="item-card">
                  <span>{item}</span>
                  <button 
                    onClick={() => handleRemoveItem(name, item)}
                    className="btn-remove"
                  >
                    Устгах
                  </button>
                </li>
              ))}
            </ul>
            
            {activeField === name ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={`Add new ${label.toLowerCase()}`}
                  className="form-input"
                />
                <button
                  onClick={() => handleAddItem(name)}
                  className="btn btn-update"
                >
                  нэмэх
                </button>
                <button
                  onClick={() => setActiveField(null)}
                  className="btn btn-cancel"
                >
                  цуцлах
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveField(name)}
                className="btn btn-add"
              >
                нэмэх {label}
              </button>
            )}
          </div>
        ))}

        {singleFields.map(({ name, label }) => (
          <div key={name} className="profile-section">
            <h2>{label}</h2>
            {activeField === name ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="form-input"
                  defaultValue={teacherInfo.info[name] || ''}
                />
                <button
                  onClick={() => {
                    handleUpdateField(name, newItem);
                    setNewItem('');
                  }}
                  className="btn btn-update"
                >
                  Засах
                </button>
                <button
                  onClick={() => setActiveField(null)}
                  className="btn btn-cancel"
                >
                  цуцлах
                </button>
              </div>
            ) : (
              <div className="item-card">
                <p>{teacherInfo.info[name] || 'Not specified'}</p>
                <button
                  onClick={() => {
                    setActiveField(name);
                    setNewItem(teacherInfo.info[name] || '');
                  }}
                  className="btn btn-add"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}