import { useState } from 'react';
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

  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const goToPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const days = [];

  for (let i = 0; i < startingDay; i++) {
    days.push(<div className="day empty" key={`empty-${i}`}></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(
      <div className="day" key={d}>
        <div className="day-number">{d}</div>
        {/* You can show tags, icons here later */}
      </div>
    );
  }

  return (
    <div className="page">
      <header>
        <div className="nav">
          <button onClick={goToPrevMonth}>←</button>
          <h1 className="calendar-title">{monthNames[month]} {year}</h1>
          <button onClick={goToNextMonth}>→</button>
        </div>
        <p className="calendar-subtitle">Progress Tracker</p>
      </header>

      <div className="calendar">
        {weekdays.map((day) => (
          <div className="weekday" key={day}>{day}</div>
        ))}
        {days}
      </div>
    </div>
  );
}

export default App;
