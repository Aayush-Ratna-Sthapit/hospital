import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import axios from 'axios';
import PatientView from './components/PatientView';
import AppointmentDoctor from './components/AppointmentDoctor';
import DoctorView from './components/DoctorView';
import AppointmentPatient from './components/AppointmentPatient';
import AdminView from './components/AdminView';
import AdminUsersList from './components/AdminUsersList';
import AdminAppointments from './components/AdminAppointments';
import Login from './components/Login';
import HomePage from './components/HomePage';
import RegisterPatient from './components/RegisterPatient';

export default function App() {

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login/' element={<Login />} />
          <Route path='/register/' element={<RegisterPatient />} />
          <Route path='/patient/:patient_id/profile/' element={<PatientView />} />
          <Route path='/:user/:id/appointmentdoctor/:doctor_id/' element={<AppointmentDoctor />} />
          <Route path='/doctor/:doctor_id/profile/' element={<DoctorView />} />
          <Route path='/:user/:id/appointmentpatient/:patient_id/' element={<AppointmentPatient />} />
          <Route path='/admin/:admin_id/profile/' element={<AdminView />} />
          <Route path='/admin/:admin_id/appointments/' element={<AdminAppointments />} />
          <Route path='/:user/:id/dashboard/doctorprofile/:doctor_id/' element={<AppointmentDoctor />} />
          <Route path='/:user/:id/dashboard/patientprofile/:patient_id/' element={<AppointmentPatient />} />
          <Route path='/admin/:admin_id/users/' element={<AdminUsersList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


/*
const doc = [{
    doc_id: 101,
    doc_name: 'John Doe',
    department: 'Gastroenterology'
  }]

  const appointments = [
    {
      app_id: 301,
      p_id: 201,
      p_name: 'Jack',
      doc_id: 101,
      doc_name: 'John Doe',
      app_date: '2023-07-05',
      completion_status: 'Pending'
    }
  ]

  const patients = {
    p_id: 201,
    p_name: 'Jack',
    age: 20,
    mobile: 9843747284,
    address: 'A Street'
  }
  */