import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AddNewDoctor from './AddNewDoctor'

export default function AdminUsersList() {

    const { admin_id } = useParams()

    const [departments, setDepartments] = useState([])
    const [departmentDoctors, setDepartmentDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [selectedOption, setSelectedOption] = useState('doctor')
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/patients/`)
            .then((response) => {
                setPatients(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios.get(`http://localhost:8000/api/departments/`)
            .then((response) => {
                setDepartments(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    useEffect(() => {
        if (selectedDepartment !== '') {
            axios.get(`http://localhost:8000/api/departments/${selectedDepartment}/`)
                .then((response) => {
                    setDepartmentDoctors(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            axios.get(`http://localhost:8000/api/doctors/`)
                .then((response) => {
                    setDepartmentDoctors(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedDepartment])

    const handleOnClick = (option) => {
        setSelectedOption(option);
    };

    const handleSelectDepartment = (event) => {
        setSelectedDepartment(event.target.value)
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleAddDoctor = (formData) => {
        console.log('New appointment data:', formData);
        setShowForm(false);
    };

    const updateDoctors = () => {
        if (selectedDepartment !== '') {
            axios.get(`http://localhost:8000/api/departments/${selectedDepartment}/`)
                .then((response) => {
                    setDepartmentDoctors(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            axios.get(`http://localhost:8000/api/doctors/`)
                .then((response) => {
                    setDepartmentDoctors(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
      };

    return (
        <div>
            <Navbar userType='admin' id={admin_id} />
            <div className="container my-5 App" style={{ paddingTop: '60px' }}>
                <h1>User Management</h1>
            </div>
            <div className="container my-3">
                <div className="row justify-content-center">
                    <div className="d-grid col-6 mx-auto">
                        <input type="radio"
                            className="btn-check btn-lg"
                            name="select-options"
                            id="Doctors-Appointment"
                            autoComplete="off"
                            checked={selectedOption === 'doctor'}
                            onChange={() => handleOnClick('doctor')}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="Doctors-Appointment">Doctors List</label>
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
                        <label className="btn btn-outline-secondary" htmlFor="Patients-Appointment">Patients List</label>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                {selectedOption === 'doctor'
                    ? (
                        <div className="container">
                            <div className='row justify-content-center '>
                                <div className="col-md-3">
                                    <h3><u>Select Department:</u></h3>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" aria-label="Doctor Selecter" value={selectedDepartment || ''} onChange={handleSelectDepartment}>
                                        <option value=''>All</option>
                                        {departments.map((element) => {
                                            return (
                                                <option key={element.id} value={`${element.id}`}>{element.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="container my-3 card card-body">
                                <button type="button" className="btn btn-info my-1" onClick={handleShowForm} onSubmit={handleAddDoctor}>Add New Doctor</button>
                                {showForm && (
                                    <div className="modal-background">
                                        <AddNewDoctor onClose={handleCloseForm} onUpdateAppointments={updateDoctors} />
                                    </div>
                                )}
                                <table className='table table-striped my-2'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Doctor ID</th>
                                            <th scope="col">Doctor's Name</th>
                                            <th scope="col">Department</th>
                                            <th scope="col">Phone</th>
                                            <th scope='col'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departmentDoctors.map((element) => {
                                            return <tr key={element.id}>
                                                <th scope='row'>{element.id}</th>
                                                <td>{element.name}</td>
                                                <td>{element.department_name}</td>
                                                <td>{element.phone}</td>
                                                <td>{element.email}</td>
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
                                <div className="container my-3 card card-body">
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Patient ID</th>
                                                <th scope="col">Patient's Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Email</th>
                                                <th scope='col'>Age</th>
                                                <th scope='col'>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map((element) => {
                                                return <tr key={element.id}>
                                                    <th scope='row'>{element.id}</th>
                                                    <td>{element.name}</td>
                                                    <td>{element.phone}</td>
                                                    <td>{element.email}</td>
                                                    <td>{element.age}</td>
                                                    <td>{element.address}</td>
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
