import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ clients, onAddAppointment }) => {
  const [selectedClient, setSelectedClient] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleAddAppointment = () => {
    console.log(selectedClient)
    if ((selectedClient || (firstName && lastName && location)) && date && time) {
      onAddAppointment(
        selectedClient
          ? JSON.parse(selectedClient)
          : { firstName, lastName, location },
        date,
        time
      );
      setSelectedClient('');
      setFirstName('');
      setLastName('');
      setLocation('');
      setDate('');
      setTime('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="appointment-form" style={{marginTop: '20px'}}>
    
      <form className="form-grid">
        <div className="row">
          <select value={selectedClient} onChange={handleClientChange}>
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={JSON.stringify(client)}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>
            </div>
       
        <div className="row">
          <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
          <input type="text" placeholder="Location" value={location} onChange={handleLocationChange} />
          <input type="date" value={date} onChange={handleDateChange} />
          <input type="time" value={time} onChange={handleTimeChange} />
          <button type="button" onClick={handleAddAppointment}>
            Add Appointment
          </button>
        </div>
        {/*<div className="row">
          
          </div>*/}
       {/* <div className="row">
          <button type="button" onClick={handleAddAppointment}>
            Add Appointment
            </button> 
            </div>*/}
      </form>
    </div>
  );
};

export default AppointmentForm;