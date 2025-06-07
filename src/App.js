import React, { useState, useEffect } from 'react';
import './App.css';
import lofiBanner from './assets/lofi-girl.gif';
import CalendarEntryModal from './components/CalendarEntryModal';
import EventFormModal from './components/EventFormModal';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const emojiMap = {
  flight: '✈️',
  rent: '🏠',
  submission: '📄',
  outing: '🎉',
  call: '📞',
  other: '📝'
};

function App() {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);
  const [entries, setEntries] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({});

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    type: '',
    notes: ''
  });

  const [events, setEvents] = useState({});
  const [hoveredEvent, setHoveredEvent] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setHoveredEvent(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const firstDayOfMonth = new Date(year, month, 1);
  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const goToPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const openModal = (day, type = 'current') => {
    const dateKey = type === 'prev'
      ? new Date(year, month - 1, day).toDateString()
      : type === 'next'
        ? new Date(year, month + 1, day).toDateString()
        : new Date(year, month, day).toDateString();
    setSelectedDate(dateKey);
    setFormData(entries[dateKey] || {});
    setModalOpen(true);
  };

  const saveEntry = () => {
    setEntries({ ...entries, [selectedDate]: formData });
    setModalOpen(false);
  };

  const saveEvent = () => {
    const { date, type, title, notes } = eventForm;
    if (!date || !type) return;

    const [inputYear, inputMonth, inputDay] = date.split('-').map(Number);
    const localDate = new Date(inputYear, inputMonth - 1, inputDay);
    const dateKey = localDate.toDateString();

    setEvents(prev => {
      const updated = [...(prev[dateKey] || []), { title, type, notes }];
      return { ...prev, [dateKey]: updated };
    });

    setEventModalOpen(false);
    setEventForm({ title: '', date: '', type: '', notes: '' });
  };

  const dayCells = [];

  for (let i = startingDay - 1; i >= 0; i--) {
    const prevDay = daysInPrevMonth - i;
    dayCells.push(
      <div className="day empty" key={`prev-${prevDay}`} onClick={() => openModal(prevDay, 'prev')}>
        <div className="day-number">{prevDay}</div>
      </div>
    );
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (startingDay + d - 1) % 7;
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;
    const isToday = d === todayDate && month === todayMonth && year === todayYear;
    const dayClass = `day${isSunday ? ' sunday' : ''}${isSaturday ? ' saturday' : ''}${isToday ? ' today' : ''}`;
    const dateKey = new Date(year, month, d).toDateString();
    const entry = entries[dateKey];
    const dayEvents = events[dateKey] || [];

    dayCells.push(
      <div className={dayClass} key={d} onClick={() => openModal(d)}>
        <div className="day-number">{d}</div>

        <div className="event-emojis">
          {dayEvents.map((event, idx) => (
            <span
              key={idx}
              className="event-emoji"
              onClick={(e) => {
                e.stopPropagation();
                setHoveredEvent({
                  dateKey,
                  eventIndex: idx,
                  ...event
                });
              }}
            >
              {emojiMap[event.type] || '🗓️'}
            </span>
          ))}
        </div>

        {hoveredEvent?.dateKey === dateKey && (
          <div className="event-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-title">{hoveredEvent.title}</div>
            {hoveredEvent.notes && <div className="popup-notes">{hoveredEvent.notes}</div>}
            <button className="popup-close" onClick={() => setHoveredEvent(null)}>×</button>
          </div>
        )}

        {entry && (
          <div className="entry-preview">
            <div>Coding: {entry.coding?.questions_solved ?? '-'}</div>
            <div>Thesis: {entry.thesis?.contribution_score ?? '-'}</div>
            <div>Studies: {entry.studies?.study_score ?? '-'}</div>
            <div>Project: {entry.projects?.contribution_score ?? '-'}</div>
          </div>
        )}
      </div>
    );
  }

  const remaining = 42 - dayCells.length;
  for (let i = 1; i <= remaining; i++) {
    dayCells.push(
      <div className="day empty" key={`next-${i}`} onClick={() => openModal(i, 'next')}>
        <div className="day-number">{i}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="banner-strip">
        <img src={lofiBanner} alt="Lofi Banner" className="banner-gif" />
      </div>

      <div className="calendar-layout">
        <div className="calendar-column">
          <div className="calendar-header">
            <button onClick={goToPrevMonth} className="nav-button">❮</button>
            <h1 className="calendar-title">{monthNames[month]} {year}</h1>
            <button onClick={goToNextMonth} className="nav-button">❯</button>
          </div>

          <div className="weekday-row">
            {weekdays.map((day, index) => (
              <div className="weekday" key={index}>{day}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {dayCells}
          </div>
        </div>

        <div className="sidebar-column">
          {/* Reserved for Sidebar Content */}
        </div>
      </div>

      <div style={{ height: '400px', backgroundColor: '#123c5b', marginTop: '2rem' }}>
        <h2 style={{ color: 'white', textAlign: 'center' }}>Coming Soon: Events & To-Do</h2>
      </div>

      {modalOpen && (
        <CalendarEntryModal
          selectedDate={selectedDate}
          formData={formData}
          setFormData={setFormData}
          onSave={saveEntry}
          onClose={() => setModalOpen(false)}
        />
      )}

      {eventModalOpen && (
        <EventFormModal
          eventForm={eventForm}
          setEventForm={setEventForm}
          onSave={saveEvent}
          onClose={() => setEventModalOpen(false)}
        />
      )}

      <button
        type="button"
        className="add-event-button"
        onClick={() => setEventModalOpen(true)}
      >
        +
      </button>
    </div>
  );
}

export default App;
