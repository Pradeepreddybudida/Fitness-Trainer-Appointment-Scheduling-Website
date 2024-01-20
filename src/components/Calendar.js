import React from 'react';
import { useLocation } from 'react-router-dom';
import './Calendar.css';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const location = useLocation();
  const { state } = location;
  let { appointments, clients } = state || {};

  // Group appointments by date
  const groupedAppointments = {};
  appointments.forEach((appointment) => {
    const date = appointment.date;
    if (!groupedAppointments[date]) {
      groupedAppointments[date] = [];
    }
    groupedAppointments[date].push(appointment);
  });

  const getTimeSlots = () => {
    return ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 23:59'];
  };

  const getFormattedTime = (time) => {
    const [hours, minutes] = time.split(':');
    return new Date(0, 0, 0, hours, minutes);
  };

  const renderAppointmentsForTimeSlot = (date, timeSlot) => {
    const [start, end] = timeSlot.split(' - ');
    const startTime = getFormattedTime(start);
    const endTime = getFormattedTime(end);

    const appointmentsForTimeSlot = groupedAppointments[date] || [];

    const filteredAppointments = appointmentsForTimeSlot.filter(
      (appointment) => getFormattedTime(appointment.time) >= startTime && getFormattedTime(appointment.time) < endTime
    );

    return filteredAppointments.map((appointment, index) => (
      
      <div key={index} className="appointment-info">
        <div>{clients.find((client) => client.id === appointment.clientId)?.firstName }</div>
       
        <div>{appointment.time}</div>
      </div>
    ));
  };

  return (
    <div className="calendar-container">
      <h1>Trainer's Calendar</h1>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button style={{ margin: '10px', backgroundColor:"#d3d3d3" , color :"black", fontWeight:'bold'}}>Back to Home</button>
    </Link>
      <table className="calendar-table">
        <thead>
          <tr>
            <th className="calendar-header">Dates</th>
            {getTimeSlots().map((timeSlot, index) => (
              <th key={index} className="calendar-header">
                {timeSlot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedAppointments).map((date, index) => (
            <tr key={index}>
              <td className="calendar-cell">{date}</td>
              {getTimeSlots().map((timeSlot, index) => (
                <td key={index} className="calendar-cell">
                  {renderAppointmentsForTimeSlot(date, timeSlot)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
