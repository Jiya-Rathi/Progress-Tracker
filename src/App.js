import React, { useState } from 'react';
import './App.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function App() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

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

  const dayCells = [];

  // Previous month days
  for (let i = startingDay - 1; i >= 0; i--) {
    const prevDay = daysInPrevMonth - i;
    dayCells.push(
      <div className="day empty" key={`prev-${prevDay}`}>
        <div className="day-number">{prevDay}</div>
      </div>
    );
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = (startingDay + d - 1) % 7;
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;
    const dayClass = `day${isSunday ? ' sunday' : ''}${isSaturday ? ' saturday' : ''}`;

    dayCells.push(
      <div className={dayClass} key={d}>
        <div className="day-number">{d}</div>
      </div>
    );
  }

  // Next month filler days
  const totalDisplayed = dayCells.length;
  const remaining = 42 - totalDisplayed;
  for (let i = 1; i <= remaining; i++) {
    dayCells.push(
      <div className="day empty" key={`next-${i}`}>
        <div className="day-number">{i}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="calendar-layout">
        <div className="calendar-column">
          <div className="calendar-header">
            <button onClick={goToPrevMonth} className="nav-button">❮</button>
            <h1 className="calendar-title">{monthNames[month]} {year}</h1>
            <button onClick={goToNextMonth} className="nav-button">❯</button>
          </div>

          {/* Weekday row */}
          <div className="weekday-row">
            {weekdays.map((day, index) => (
              <div className="weekday" key={index}>{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="calendar-grid">
            {dayCells}
          </div>
        </div>

        <div className="sidebar-column">
          {/* Sidebar content can be added later */}
        </div>
      </div>
    </div>
  );
}

export default App;
