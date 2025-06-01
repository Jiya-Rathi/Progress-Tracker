import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styling

function App() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log('Selected date:', selectedDate);
    // You will open a modal form here later
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Progress Tracker</h1>
      <p>Click a date to add your progress</p>

      <Calendar
        onChange={handleDateChange}
        value={date}
      />

      <p>Selected Date: {date.toDateString()}</p>
    </div>
  );
}

export default App;
