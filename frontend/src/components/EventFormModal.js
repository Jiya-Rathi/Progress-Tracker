// EventFormModal.js
import React from 'react';
import '../App.css';

const EventFormModal = ({ onClose, onSave, eventForm, setEventForm }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (field, value) => {
    setEventForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!eventForm.title || !eventForm.date) {
      alert('Please provide at least a title and date.');
      return;
    }
    if (new Date(eventForm.date) < new Date(today)) {
      alert('🚫 Cannot create events in the past.');
      return;
    }
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: '500px', width: '95%' }}>
        <h2 style={{ marginBottom: '1rem', color: '#e67300' }}>Add Event</h2>

        <label>Event Title:
          <input value={eventForm.title || ''} onChange={e => handleChange('title', e.target.value)} />
        </label>

        <label>Date:
          <input type="date" value={eventForm.date || ''} onChange={e => handleChange('date', e.target.value)} min={today} />
        </label>

        <label>Type:
          <select value={eventForm.type || ''} onChange={e => handleChange('type', e.target.value)}>
            <option value="">Select</option>
            <option value="flight">✈️ Flight</option>
            <option value="rent">🏠 Rent Payment</option>
            <option value="submission">📄 Submission</option>
            <option value="outing">🎉 Outing</option>
            <option value="call"> 📞 Call</option>
            <option value="other">📝 Other</option>
          </select>
        </label>

        <label>Notes:
          <textarea rows="3" value={eventForm.notes || ''} onChange={e => handleChange('notes', e.target.value)} />
        </label>

        <div className="modal-actions" style={{ justifyContent: 'space-between', flexDirection: 'row-reverse', marginTop: '1.5rem' }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
