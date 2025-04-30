"use client";

import { useState } from 'react';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3)); // April 2025
  const [selectedDate, setSelectedDate] = useState(29); // Current day highlighted in the image

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  let dayCounter = 1;

  for (let i = 0; i < 6; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayCounter++);
      }
    }
    calendarDays.push(week);
    if (dayCounter > daysInMonth) break;
  }

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendar</h2>
      
      <div className="calendar-header">
        <select className="calendar-select">
          <option>All Courses</option>
          <option>Digital Marketing</option>
          <option>Web Design</option>
          <option>Programming</option>
        </select>
        
        <div className="calendar-navigation">
          <button onClick={goToPreviousMonth} className="calendar-nav-button">
            <svg className="calendar-nav-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="calendar-month">
            {monthNames[month]} {year}
          </span>
          <button onClick={goToNextMonth} className="calendar-nav-button">
            <svg className="calendar-nav-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="calendar-table-container">
        <table className="calendar-table">
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index} className="calendar-day-header">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarDays.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex} className="calendar-day-cell">
                    {day !== null && (
                      <div 
                        className={`calendar-day ${day === selectedDate ? 'calendar-day-selected' : 'calendar-day-hover'}`}
                        onClick={() => setSelectedDate(day)}
                      >
                        {day}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}