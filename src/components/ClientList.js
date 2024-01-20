import React, { useState}  from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ClientList.css';
 
import Notification from './Notification';

const ClientList = ({
  clients,
  onUpdateFirstName,
  onUpdateLastName,
  onUpdateLocation,
  onDeleteClient,
  onEditAppointment,
  onRemoveAppointment,
  setClients,  // Add this prop
}) => {
  // State to track editing status
  const [editingClientId, setEditingClientId] = useState(null);
  const [editingAppointmentIndex, setEditingAppointmentIndex] = useState(null);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDateTime, setNewDateTime] = useState('');
  const [notification, setNotification] = useState('');


  const handleEditClick = (clientId, appointmentIndex, currentDateTime) => {
    setEditingClientId(clientId);
    setEditingAppointmentIndex(appointmentIndex);
    setNewDateTime(currentDateTime);
    setNotification('');
  };


  const handleSaveClick = () => {
  
    if (editingClientId !== null && editingAppointmentIndex !== null) {
      onEditAppointment(editingClientId, editingAppointmentIndex, newDateTime);
      setEditingClientId(null);
      setEditingAppointmentIndex(null);
      setNewDateTime('');
      setNotification("Appointment edited successfully.");
    } 
  };

  const handleSaveClient = () => {
   
    if (editingClientId !== null ) {
    
      console.log("updating client info")
      const updatedClients = clients.map((client) =>
        client.id === editingClientId
          ? {
              ...client,
              firstName: newFirstName || client.firstName,
              lastName: newLastName || client.lastName,
              location: newLocation || client.location,
            }
          : client
      );

      setClients(updatedClients);  // Update the state in the Home component
      setEditingClientId(null);
      setEditingAppointmentIndex(null);
      setNewFirstName('');
      setNewLastName('');
      setNewLocation('');
      setNotification('Client information edited successfully.');
    }
  };


  const handleRemoveClick = (clientId, appointmentIndex) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
    if (confirmDelete) {
      onRemoveAppointment(clientId, appointmentIndex);
      setNotification('Appointment deleted successfully.');
    }
  };

  const handleRemoveClient = (clientId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (confirmDelete) {
      onDeleteClient(clientId);
      setNotification('Client deleted successfully.');
    }
  };


  
  return (
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <h2 style={{textAlign:'center', padding:'5px'}}>Upcoming Appointments</h2>
    
      {notification && (
        <Notification
          message={notification}
          duration={3000} 
          onClose={() => setNotification('')} 
        />
      )}
      <table style={{ border: '10px black' }}>
        <thead>
          <tr style={{ border: '3px solid gray', padding: '10px' }}>
          <th style={{ border: '3px solid gray', padding: '10px' }}>ID</th>
            <th style={{ border: '3px solid gray', padding: '10px' }}>First Name</th>
            <th style={{ border: '3px solid gray', padding: '10px' }}>Last Name</th>
            <th style={{ border: '3px solid gray', padding: '10px' }}>Location</th>
            <th style={{ border: '3px solid gray', padding: '10px' }}>Appointments</th>
            <th style={{ border: '3px solid gray', padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} style={{ border: '3px solid gray', padding: '10px' }}>
              <td style={{ border: '3px solid gray', padding: '10px' }}>
                {client.id}
              </td>
              <td style={{ border: '3px solid gray', padding: '10px' }}>
                {editingClientId === client.id ? (
                  <input
                    type="text"
                    value={newFirstName || client.firstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                ) : (
                  client.firstName
                )}
              </td>
              <td style={{ border: '3px solid gray', padding: '10px' }}>
                {editingClientId === client.id ? (
                  <input
                    type="text"
                    value={newLastName || client.lastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                ) : (
                  client.lastName
                )}
              </td>
              <td style={{ border: '3px solid gray', padding: '10px' }}>
                {editingClientId === client.id ? (
                  <input
                    type="text"
                    value={newLocation || client.location}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                ) : (
                  client.location
                )}
              </td>
              <td style={{ border: '3px solid gray', padding: '10px' }}>
                <ul>
                  {client.appointments.map((appointment, index) => (
                    <li key={index}>
                      {index === editingAppointmentIndex && editingClientId === client.id ? (
                        <input
                          type="datetime-local"
                          value={newDateTime}
                          onChange={(e) => setNewDateTime(e.target.value)}
                        />
                      ) : (
                        appointment
                      )}
                      <span>
                       
                        {index === editingAppointmentIndex && editingClientId === client.id ? (
                          <button onClick={handleSaveClick} style={{ background: 'transparent', border: 'none' }}>
                            <i className="fas fa-save" style={{ marginLeft: '5px', marginRight: '5px', cursor: 'pointer', color: 'green' }}></i>
                          </button>
                        ) : (
                          <button onClick={() => handleEditClick(client.id, index, appointment)} style={{ background: 'transparent', border: 'none' }}>
                            <i className="fas fa-edit" style={{ marginLeft: '5px', marginRight: '5px', cursor: 'pointer', color: 'blue' }}></i>
                          </button>
                        )}
                        <button onClick={() => handleRemoveClick(client.id, index)} style={{ background: 'transparent', border: 'none' }}>
                          <i className="fas fa-trash-alt" style={{ marginLeft: '5px', marginRight: '5px', cursor: 'pointer', color: 'red' }}></i>
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ border: '3px solid gray', padding: '10px' }}>
                {editingClientId === client.id ? (
                  <button onClick={() => handleSaveClient(client.id)} style={{backgroundColor:'green'}}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(client.id)}>Edit</button>
                )}
                <button onClick={() => handleRemoveClient(client.id)} style={{backgroundColor:"#d84c4c"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;