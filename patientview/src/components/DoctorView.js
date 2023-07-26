import Navbar from './Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DoctorProfile from './DoctorProfile';

export default function DcotorView() {

  const { doctor_id } = useParams()

  const [doctor, setDoctor] = useState([])
  const [appointments, setAppointments] = useState([])

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

  useEffect(() => {
    axios.get(`http://localhost:8000/api/doctors/${doctor_id}/`)
      .then((response) => {
        setDoctor(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get(`http://localhost:8000/api/doctors/${doctor_id}/appointments/`)
      .then((response) => {
        setAppointments(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [doctor_id]);

  return (
    <div className='App'>
      <Navbar userType='doctor' id={doctor_id} />
      <DoctorProfile doctor={doctor} appointments={appointments} setAppointments={setAppointments} />
    </div>
  )
}
