import Navbar from './Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsCalendarCheckFill } from 'react-icons/bs';
import EditDoctorProfile from './EditDoctorProfile';

export default function DcotorView() {

  const { doctor_id } = useParams()

  const [doctor, setDoctor] = useState([])
  const [appointments, setAppointments] = useState([])
  const [showEditProfileForm, setShowEditProfileForm] = useState(false)

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

  const handleCompleteAppointment = (appointmentId) => {
    axios.put(`http://localhost:8000/api/appointments/${appointmentId}/complete/`)
      .then((response) => {
        console.log('Appointment status updated:', response.data);
        axios.get(`http://localhost:8000/api/doctors/${doctor.id}/appointments/`)
          .then((response) => {
            setAppointments(response.data);
            console.log('Updated appointments:', response.data);
          })
          .catch((error) => {
            console.error('Error fetching updated appointments:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating appointment status:', error);
      });
  };

  const handleShowForm = () => {
    setShowEditProfileForm(true);
  };

  const handleCloseForm = () => {
    setShowEditProfileForm(false);
    axios.get(`http://localhost:8000/api/doctors/${doctor_id}/`)
      .then((response) => {
        setDoctor(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditProfile = (formData) => {
    console.log('New Doctor data:', formData);
    setShowEditProfileForm(false);
  };

  return (
    <div className='App'>
      <Navbar userType='doctor' id={doctor_id} />
      <div className="container" style={{ paddingTop: '100px' }}>
        <h1>Doctor's Profile</h1>
        <div className="container my-5 profile card card-body">
          <div className="row">
            <div className="col-sm-10">
              <div className="container">
                <p><b>Doctor ID: </b>{doctor.id} </p>
                <p><b>Name: </b>{doctor.name} </p>
                <p><b>Department: </b>{doctor.department_name} </p>
                <p><b>Phone No.: </b>{doctor.phone} </p>
                <p><b>Email Address: </b>{doctor.email} </p>
              </div>
            </div>
            <div className="col-sm-2">
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyrBSyYXA389y5lA1B4YgrOULYKy-sihIloQ&usqp=CAU' alt='/' height={200} />
            </div>
          </div>
          <div className="mx-3 my-1">
            <button className='btn btn-info md-3' onClick={handleShowForm} onSubmit={handleEditProfile}>Edit Profile</button>
            {showEditProfileForm && (
              <div className="modal-background">
                <EditDoctorProfile doctor={doctor} onClose={handleCloseForm} />
              </div>
            )}
          </div>
        </div>
        <hr />
        <h2>Appointment List</h2>
        <div className="container my-5 card card-body">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope="col">Appointment ID</th>
                <th scope="col">Patient's Name</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Status</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((element) => {
                if (element.status === 'Scheduled') {
                  return <tr key={element.id}>
                    <th scope='row'>{element.id}</th>
                    <td>{element.patient_name}</td>
                    <td>{element.date}</td>
                    <td>{element.status}</td>
                    <td><button className='btn btn-success' onClick={() => handleCompleteAppointment(element.id)}> <BsCalendarCheckFill /> </button></td>
                    <td><button type="button" className="btn btn-primary">
                      <Link className="nav-link active" aria-current="page" to={`/doctor/${doctor.id}/appointmentpatient/${element.Patient}/`}>View Details</Link>
                    </button>
                    </td>
                  </tr>
                } else {
                  return null
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
