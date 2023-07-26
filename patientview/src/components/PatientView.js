import Navbar from './Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GetAppointment from './GetAppointment';

export default function PatientView() {

  const { patient_id } = useParams()

  const [patient, setPatient] = useState([])
  const [appointments, setAppointments] = useState([])
  const [showForm, setShowForm] = useState(false);


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
    axios.get(`http://localhost:8000/api/patients/${patient_id}/`)
      .then((response) => {
        setPatient(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios.get(`http://localhost:8000/api/patients/${patient_id}/appointments/`)
      .then((response) => {
        setAppointments(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [patient_id]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddAppointment = (formData) => {
    console.log('New appointment data:', formData);
    setShowForm(false);
  };

  const updateAppointments = () => {
    axios.get(`http://localhost:8000/api/patients/${patient_id}/appointments/`)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar userType='patient' id={patient_id} />
      <div className="container" style={{ paddingTop: '100px' }}>
        <h1 className='App'>Patient's Profile</h1>
        <div className="container App my-5 profile card card-body">
          <div className="row">
            <div className="col-sm-10">
              <div className="container">
                <p><b>Patient ID: </b>{patient.id} </p>
                <p><b>Name: </b>{patient.name} </p>
                <p><b>Age: </b>{patient.age} </p>
                <p><b>Phone No.: </b>{patient.phone} </p>
                <p><b>Email Address: </b>{patient.email} </p>
                <p><b>Address: </b>{patient.address} </p>
              </div>
            </div>

            <div className="col-sm-2">
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnkAkDkyXCzErdPKvQbrwYySzZ_k9I4f1HfQ&usqp=CAU' alt='/' height={225} />
            </div>
          </div>
        </div>
        <hr />
        <h2 className='App'>Appointment List</h2>
        <div className="container my-5 card card-body">
          <button type="button" className="btn btn-info" onClick={handleShowForm} onSubmit={handleAddAppointment}>Get Appointment</button>
          {showForm && (
            <div className="modal-background">
              <GetAppointment patient_id={patient_id} onClose={handleCloseForm} onUpdateAppointments={updateAppointments} />
            </div>
          )}
          <table className='table table-striped App'>
            <thead>
              <tr>
                <th scope="col">Appointment ID</th>
                <th scope="col">Doctor's Name</th>
                <th scope="col">Department</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Status</th>
                <th scope='col'>

                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((element) => {
                return <tr key={element.id}>
                  <th scope='row'>{element.id}</th>
                  <td className='appointments'>{element.doctor_name}</td>
                  <td>{element.department_name}</td>
                  <td>{element.date}</td>
                  <td>{element.status}</td>
                  <td>
                    <button type="button" className="btn btn-primary">
                      <Link className="nav-link active" aria-current="page" to={`/patient/${patient.id}/appointmentdoctor/${element.Doctor}`}>View Doctor's Details</Link>
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
