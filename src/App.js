import React, { useState } from 'react';
import './App.css';
import lofiBanner from './assets/lofi-girl.gif';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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
  const [formData, setFormData] = useState({
    coding: '',
    thesis: '',
    studies: '',
    project: '',
  });

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
    setFormData(entries[dateKey] || { coding: '', thesis: '', studies: '', project: '' });
    setModalOpen(true);
  };

  const saveEntry = () => {
    setEntries({ ...entries, [selectedDate]: formData });
    setModalOpen(false);
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

    dayCells.push(
      <div className={dayClass} key={d} onClick={() => openModal(d)}>
        <div className="day-number">{d}</div>
        {entry && (
          <div className="entry-preview">
            <div>Coding: {entry.coding}</div>
            <div>Thesis: {entry.thesis}</div>
            <div>Studies: {entry.studies}</div>
            <div>Project: {entry.project}</div>
          </div>
        )}
      </div>
    );
  }

  const totalDisplayed = dayCells.length;
  const remaining = 42 - totalDisplayed;
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
          {/* Sidebar content can be added later */}
        </div>
      </div>
    <div style={{ height: '400px', backgroundColor: '#123c5b', marginTop: '2rem' }}>
  <h2 style={{ color: 'white', textAlign: 'center' }}>Coming Soon: Events & To-Do</h2>
</div>


      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Entry for {selectedDate}</h2>
            <label>
              Coding Questions Done:
              <input value={formData.coding} onChange={(e) => setFormData({ ...formData, coding: e.target.value })} />
            </label>
            <label>
              Thesis Contribution:
              <input value={formData.thesis} onChange={(e) => setFormData({ ...formData, thesis: e.target.value })} />
            </label>
            <label>
              Studies:
              <input value={formData.studies} onChange={(e) => setFormData({ ...formData, studies: e.target.value })} />
            </label>
            <label>
              Project Work:
              <input value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} />
            </label>
            <div className="modal-actions" style={{ justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
              <button onClick={saveEntry}>Save</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <button className="add-event-button" onClick={() => alert("Open event creation modal here")}>
  +
</button>

    </div>
  );
}

export default App;
