import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddNewDoctor({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        department_id: '',  // Changed from department_name to department_id
        phone: '',
        email: '',
        password: 'hospitaluser',  // Default password value
    });

    const [showPassword, setShowPassword] = useState(false);

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments/')
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/doctors/add/', formData)
            .then((response) => {
                console.log('New doctor added:', response.data);
                onClose();
            })
            .catch((error) => {
                console.error('Error adding doctor:', error);
            });
    };

    const handleCancel = () => {
        onClose();
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="modal modal-shape show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header App bg-success text-white">
                            <h5 className="modal-title dark text-dark">Add New Doctor</h5>
                            <button type="button" className="btn-close" onClick={handleCancel}></button>
                        </div>
                        <div className="modal-body bg-success-subtle text-emphasis-success">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name">Doctor Name</label>
                                    <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="department_id">Department</label>
                                    <select className="form-select" aria-label="Department Selector" name="department_id" value={formData.department_id} onChange={handleChange} required>
                                        <option value=''>Select Department</option>
                                        {departments.map((department) => (
                                            <option key={department.id} value={department.id}>{department.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
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