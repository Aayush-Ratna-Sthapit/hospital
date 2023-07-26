import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'

export default function AdminAppointments(props) {

    const { admin_id } = useParams()

    const [patientsAppointments, setPatientsAppointments] = useState([])
    const [doctorsAppointments, setDoctorsAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [selectedOption, setSelectedOption] = useState('doctor');
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [selectedPatient, setSelectedPatient] = useState('')


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
        axios.get(`http://localhost:8000/api/doctors/`)
            .then((response) => {
                setDoctors(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios.get(`http://localhost:8000/api/patients/`)
            .then((response) => {
                setPatients(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);


    const handleOnClick = (option) => {
        setSelectedOption(option);

    };

    const handleSelectChangeDoctor = (event) => {
        setSelectedDoctor(event.target.value)

    };

    const handleSelectChangePatient = (event) => {
        setSelectedPatient(event.target.value)

    };

    useEffect(() => {
        if (selectedDoctor !== '') {
            axios.get(`http://localhost:8000/api/doctors/${selectedDoctor}/appointments/`)
                .then((response) => {
                    setDoctorsAppointments(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedDoctor])

    useEffect(() => {
        if (selectedPatient !== '') {
            axios.get(`http://localhost:8000/api/patients/${selectedPatient}/appointments/`)
                .then((response) => {
                    setPatientsAppointments(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedPatient])

    return (
        <div className=''>
            <Navbar userType='admin' id={admin_id} />
            <div className="container my-5 App" style={{ paddingTop: '60px' }}>
                <h1>Appointments Management</h1>
            </div>
            <div className="container my-3">
                <div className="row justify-content-center">
                    <div className="d-grid col-6 mx-auto">
                        <input
                            type="radio"
                            className="btn-check btn-lg"
                            name="select-options"
                            id="Doctors-Appointment"
                            autoComplete="off"
                            checked={selectedOption === 'doctor'}
                            onChange={() => handleOnClick('doctor')}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="Doctors-Appointment">Doctors Appointments</label>
                    </div>
                    <div className="d-grid col-6 mx-auto">
                        <input
                            type="radio"
                            className="btn-check btn-lg"
                            name="select-options"
                            id="Patients-Appointment"
                            autoComplete="off"
                            checked={selectedOption === 'patient'}
                            onChange={() => handleOnClick('patient')}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="Patients-Appointment">Patients Appointments</label>
                    </div>
                </div>
                <hr />
            </div>

            <div className="container">
                {selectedOption === 'doctor'
                    ? (
                        <div className="container">
                            <div className='row justify-content-center '>
                                <div className="col-md-2">
                                    <h3><u>Select Doctor:</u></h3>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" aria-label="Doctor Selecter" value={selectedDoctor || ''} onChange={handleSelectChangeDoctor}>
                                        <option value='' disabled>Select a Doctor</option>
                                        {doctors.map((element) => {
                                            return (
                                                <option key={element.id} value={`${element.id}`}>{element.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="container my-3 card card-body">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Appointment ID</th>
                                            <th scope="col">Patient's Name</th>
                                            <th scope="col">Appointment Date</th>
                                            <th scope="col">Status</th>
                                            <th scope='col'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctorsAppointments.map((element) => {
                                            return <tr key={element.id}>
                                                <th scope='row'>{element.id}</th>
                                                <td>{element.patient_name}</td>
                                                <td>{element.date}</td>
                                                <td>{element.status}</td>
                                                <td><button type="button" className="btn btn-primary btn-sm">
                                                    <Link className="nav-link active" aria-current="page" to={`/admin/${admin_id}/dashboard/patientprofile/${element.Patient}/`}>View Patient's Details</Link>
                                                </button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) :
                    selectedOption === 'patient'
                        ? (
                            <div className="container">
                                <div className='row justify-content-center '>
                                    <div className="col-md-2">
                                        <h3><u>Select Patient:</u></h3>
                                    </div>
                                    <div className="col-md-4">
                                        <select className="form-select" aria-label="Patient Selector" value={selectedPatient || ''} onChange={handleSelectChangePatient}>
                                            <option value='' disabled>Select a Patient</option>
                                            {patients.map((element) => {
                                                return (
                                                    <option key={element.id} value={`${element.id}`}>{element.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="container my-3 card card-body">
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Appointment ID</th>
                                                <th scope="col">Doctor's Name</th>
                                                <th scope="col">Department</th>
                                                <th scope="col">Appointment Date</th>
                                                <th scope="col">Status</th>
                                                <th scope='col'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patientsAppointments.map((element) => {
                                                return <tr key={element.id}>
                                                    <th scope='row'>{element.id}</th>
                                                    <td>{element.doctor_name}</td>
                                                    <td>{element.department_name}</td>
                                                    <td>{element.date}</td>
                                                    <td>{element.status}</td>
                                                    <td><button type="button" className="btn btn-info btn-sm">
                                                        <Link className="nav-link active" aria-current="page" to={`/admin/${admin_id}/dashboard/doctorprofile/${element.Doctor}/`}>View Doctor's Details</Link>
                                                    </button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) :
                        (
                            <div className="container"></div>
                        )
                }
            </div>
        </div>
    )
}
