import React, { useState } from "react";
import ClientList from "./ClientList";
import AppointmentForm from "./AppointmentForm";
import "../App.css";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: "Nick",
      lastName: "Thomas",
      location: "Delhi",
      appointments: ["2024-01-18 10:00", "2024-01-20 02:30 "],
    },
    {
      id: 2,
      firstName: "Elon",
      lastName: "Musk",
      location: "Mumbai",
      appointments: ["2024-01-24 14:00"],
    },
    {
      id: 3,
      firstName: "stephen",
      lastName: "Hawking",
      location: "Chennai",
      appointments: ["2024-02-03 01:00", "2024-01-28 02:30 "],
    },
  ]);
  const [appointments, setAppointments] = useState([
    { clientId: 1, date: "2024-01-18", time: "10:00" },
    { clientId: 1, date: "2024-01-18", time: "02:30" },
    { clientId: 2, date: "2024-01-24", time: "14:00" },
    { clientId: 3, date: "2024-02-03", time: "01:00" },
    { clientId: 3, date: "2024-01-28", time: "02:30" },
  ]);
  const handleShowCalendar = () => {
    navigate("/calendar", { state: { appointments, clients } });
  };

  const handleAddAppointment = (clientInfo, date, time) => {
    if (clientInfo.id) {
      const updatedClients = clients.map((client) =>
        client.id === clientInfo.id
          ? {
              ...client,
              appointments: [...client.appointments, `${date} ${time}`],
            }
          : client
      );
      setClients(updatedClients);
      setAppointments([
        ...appointments,
        { clientId: clientInfo.id, date, time, index: appointments.length },
      ]);
    } else {
      const newClient = {
        id: clients.length + 1,
        ...clientInfo,
        appointments: [`${date} ${time}`],
      };
      setClients([...clients, newClient]);
      setAppointments([
        ...appointments,
        { clientId: newClient.id, date, time, index: appointments.length },
      ]);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toISOString().split("T")[1].slice(0, 5);

    return `${formattedDate} ${formattedTime}`;
  };

  const handleEditAppointment = (clientId, appointmentIndex, newDateTime) => {
    const formattedDateTime = formatDateTime(newDateTime);

    const updatedClients = clients.map((client) =>
      client.id === clientId
        ? {
            ...client,
            appointments: client.appointments.map((appointment, index) =>
              index === appointmentIndex ? formattedDateTime : appointment
            ),
          }
        : client
    );
    setClients(updatedClients);

    const updatedAppointments = appointments.map((appointment, index) =>
      appointment.clientId === clientId && index === appointmentIndex
        ? {
            ...appointment,
            date: formattedDateTime.split(" ")[0],
            time: formattedDateTime.split(" ")[1],
          }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleRemoveAppointment = (clientId, appointmentIndex) => {
    const updatedClients = clients.map((client) =>
      client.id === clientId
        ? {
            ...client,
            appointments: client.appointments.filter(
              (_, index) => index !== appointmentIndex
            ),
          }
        : client
    );
    setClients(updatedClients);
    console.log(clientId);

    console.log(appointmentIndex);

    const updatedAppointments = appointments.filter(
      (appointment) =>
        !(
          appointment.clientId === clientId &&
          appointment.index === appointmentIndex
        )
    );
    console.log("upatinf appointments by delete");
    console.log(updatedAppointments);
    setAppointments(updatedAppointments);
  };

  const onDeleteClient = (clientId) => {
    // Implement your logic for deleting a client
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.clientId !== clientId
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          paddingTop: "30px",
          paddingBottom: "5px",
        }}
      >
        <h1 style={{ marginTop: "4%", fontSize:'40px' }}>
          Fitness Trainer Appointment Schedule
        </h1>
        <h3 style={{ textAlign: 'center', fontStyle: 'italic', color: '#555' }}>
        Hey, trainer! Let's jump into your fitness training appointments.
      </h3>
      </div>
      <button
        onClick={handleShowCalendar}
        style={{
          marginLeft: "45%",
          marginTop: "3%",
          backgroundColor: "#4CAF50",
        }}
      >
        Show Calendar
      </button>
      <AppointmentForm
        clients={clients}
        onAddAppointment={handleAddAppointment}
      />
      <ClientList
        clients={clients}
        onUpdateFirstName={(id, firstName) => {}}
        onUpdateLastName={(id, lastName) => {}}
        onUpdateLocation={(id, location) => {}}
        onDeleteClient={onDeleteClient}
        onEditAppointment={handleEditAppointment}
        onRemoveAppointment={handleRemoveAppointment}
        setClients={setClients}
      />

      <Outlet />
    </div>
  );
};

export default Home;
