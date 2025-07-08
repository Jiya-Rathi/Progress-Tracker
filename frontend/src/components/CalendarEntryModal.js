// CalendarEntryModal.js
import React from 'react';
import '../App.css';

const CalendarEntryModal = ({ selectedDate, formData, setFormData, onSave, onClose }) => {
  const today = new Date().toISOString().split('T')[0];
  const selectedISO = new Date(selectedDate).toISOString().split('T')[0];
  const isToday = selectedISO === today;
  const isFutureDate = new Date(selectedISO) > new Date(today);

  if (isFutureDate) {
    alert("🚫 You cannot create entries for future dates.");
    onClose();
    return null;
  }

  const handleChange = (section, field, value) => {
    if (!isToday) return;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal two-column scrollable" style={{ maxWidth: '800px', width: '95%' }}>
        <h2 style={{ marginBottom: '1rem', color: '#e67300' }}>{isToday ? 'Edit' : 'View'} Entry for {selectedDate}</h2>

        <div className="form-grid" style={{ gap: '1.5rem' }}>
          {/* Coding */}
          <div className="form-section" style={{ gridColumn: '1 / -1' }}>
            <h3>🧠 Coding</h3>
          </div>
          <label>Coding Description:
            <input disabled={!isToday} value={formData.coding?.description || ''} onChange={e => handleChange('coding', 'description', e.target.value)} />
          </label>
          <label>Questions Solved:
            <input type="number" min="0" disabled={!isToday} value={formData.coding?.questions_solved || ''} onChange={e => handleChange('coding', 'questions_solved', Math.min(10, parseInt(e.target.value)))} />
          </label>
          <label style={{ gridColumn: '1 / -1' }}>Tags:
            <input disabled={!isToday} value={formData.coding?.tags?.join(', ') || ''} onChange={e => handleChange('coding', 'tags', e.target.value.split(',').map(tag => tag.trim()))} />
          </label>

          {/* Thesis */}
          <div className="form-section" style={{ gridColumn: '1 / -1' }}>
            <h3>📘 Thesis</h3>
          </div>
          <label>Thesis Description:
            <input disabled={!isToday} value={formData.thesis?.description || ''} onChange={e => handleChange('thesis', 'description', e.target.value)} />
          </label>
          <label>Contribution Score:
            <input type="number" min="0" max="10" disabled={!isToday} value={formData.thesis?.contribution_score || ''} onChange={e => handleChange('thesis', 'contribution_score', Math.min(10, parseInt(e.target.value)))} />
          </label>

          {/* Studies */}
          <div className="form-section" style={{ gridColumn: '1 / -1' }}>
            <h3>📚 Studies</h3>
          </div>
          <label>Studies Description:
            <input disabled={!isToday} value={formData.studies?.description || ''} onChange={e => handleChange('studies', 'description', e.target.value)} />
          </label>
          <label>Study Score:
            <input type="number" min="0" max="10" disabled={!isToday} value={formData.studies?.study_score || ''} onChange={e => handleChange('studies', 'study_score', Math.min(10, parseInt(e.target.value)))} />
          </label>

          {/* Applications */}
          <div className="form-section" style={{ gridColumn: '1 / -1' }}>
            <h3>📩 Applications</h3>
          </div>
          <label style={{ gridColumn: '1 / -1' }}>Applications Description:
            <input disabled={!isToday} value={formData.applications?.description || ''} onChange={e => handleChange('applications', 'description', e.target.value)} />
          </label>

          {/* Projects */}
          <div className="form-section" style={{ gridColumn: '1 / -1' }}>
            <h3>🔧 Projects</h3>
          </div>
          <label>Project Description:
            <input disabled={!isToday} value={formData.projects?.description || ''} onChange={e => handleChange('projects', 'description', e.target.value)} />
          </label>
          <label>Project Contribution Score:
            <input type="number" min="0" max="10" disabled={!isToday} value={formData.projects?.contribution_score || ''} onChange={e => handleChange('projects', 'contribution_score', Math.min(10, parseInt(e.target.value)))} />
          </label>

          {/* Notes */}
          <div className="form-section" style={{ gridColumn: '1 / -1' }}>
            <h3>📝 Notes</h3>
          </div>
          <label style={{ gridColumn: '1 / -1' }}>Notes:
            <textarea rows="3" disabled={!isToday} value={formData.notes || ''} onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))} />
          </label>
        </div>

        <div className="modal-actions" style={{ justifyContent: 'space-between', flexDirection: 'row-reverse', marginTop: '1.5rem' }}>
          {isToday && <button onClick={onSave}>Save</button>}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarEntryModal;
