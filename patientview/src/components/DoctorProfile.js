import React from 'react'
import { Link } from 'react-router-dom'
import { BsCalendarCheckFill } from 'react-icons/bs';
import axios from 'axios';

export default function DoctorProfile(props) {

    const handleCompleteAppointment = (appointmentId) => {
        axios.put(`http://localhost:8000/api/appointments/${appointmentId}/complete/`)
            .then((response) => {
                console.log('Appointment status updated:', response.data);
                axios.get(`http://localhost:8000/api/doctors/${props.doctor.id}/appointments/`)
                    .then((response) => {
                        props.setAppointments(response.data);
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

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <h1>Doctor's Profile</h1>
            <div className="container my-5 profile card card-body">
                <div className="row">
                    <div className="col-sm-10">
                        <div className="container">
                            <p><b>Doctor ID: </b>{props.doctor.id} </p>
                            <p><b>Name: </b>{props.doctor.name} </p>
                            <p><b>Department: </b>{props.doctor.department_name} </p>
                            <p><b>Phone No.: </b>{props.doctor.phone} </p>
                            <p><b>Email Address: </b>{props.doctor.email} </p>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyrBSyYXA389y5lA1B4YgrOULYKy-sihIloQ&usqp=CAU' alt='/' height={200} />
                    </div>
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
                        {props.appointments.map((element) => {
                            if (element.status === 'Scheduled') {
                                return <tr key={element.id}>
                                    <th scope='row'>{element.id}</th>
                                    <td>{element.patient_name}</td>
                                    <td>{element.date}</td>
                                    <td>{element.status}</td>
                                    <td><button className='btn btn-success' onClick={() => handleCompleteAppointment(element.id)}> <BsCalendarCheckFill /> </button></td>
                                    <td><button type="button" className="btn btn-primary">
                                        <Link className="nav-link active" aria-current="page" to={`/doctor/${props.doctor.id}/appointmentpatient/${element.Patient}/`}>View Details</Link>
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

    )
}