import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddAppointmentForm(props) {

    const { onClose, onUpdateAppointments, patient_id } = props;

    const [formData, setFormData] = useState({
        'Doctor': '',
        'Patient': patient_id,
        'Department': '',
        'date': '',
        'status': 'Pending',
    });
    const [doctors, setDoctors] = useState([])
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        setFormData({
            'Doctor': '',
            'Patient': patient_id,
            'Department': '',
            'date': '',
            'status': 'Pending',
        });
    }, [patient_id]);

    useEffect(() => {
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
        if (formData.Department)
            axios.get(`http://localhost:8000/api/departments/${formData.Department}/`)
                .then((response) => {
                    setDoctors(response.data)
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

    }, [formData.Department]);

    const handleChangeDate = (event) => {
        setFormData({
            ...formData,
            'date': event.target.value
        });
    };

    const handleSelectChangeDepartment = (event) => {
        setFormData({
            ...formData,
            'Department': event.target.value,
        })

    };

    const handleSelectChangeDoctor = (event) => {
        setFormData({
            ...formData,
            'Doctor': event.target.value,
        })

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New appointment data:', formData);
        axios.post('http://localhost:8000/api/appointments/add/', formData)
            .then((response) => {
                console.log('Appointment added:', response.data);
                onClose();
                onUpdateAppointments();
            })
            .catch((error) => {
                console.error('Error adding appointment:', error);
            });
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div>
            <div className="modal modal-shape show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header App bg-success text-white">
                            <h5 className="modal-title dark text-dark">Request New Appointment</h5>
                            <button type="button" className="btn-close" onClick={handleCancel}></button>
                        </div>
                        <div className="modal-body bg-success-subtle text-emphasis-success">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="department">Select Department</label>
                                    <select className="form-select" aria-label="Department Selector" value={formData.Department || 0} onChange={handleSelectChangeDepartment}>
                                        <option value=''>-</option>
                                        {departments.map((element) => {
                                            return (
                                                <option key={element.id} value={element.id}>{element.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="department">Select Doctor</label>
                                    <select className="form-select" aria-label="Department Selector" value={formData.Doctor || 0} onChange={handleSelectChangeDoctor}>
                                        <option value=''>-</option>
                                        {doctors.map((element) => {
                                            return (
                                                <option key={element.id} value={element.id}>{element.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="patient">Date</label>
                                    <input type="date" id="patient" name="patient" className="form-control" value={formData.date} onChange={handleChangeDate} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
