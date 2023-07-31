import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function EditDoctorProfile({ doctor, onClose }) {

    const [formData, setFormData] = useState({
        name: doctor.name,
        phone: doctor.phone,
        email: doctor.email
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.put(`http://localhost:8000/api/update/doctors/${doctor.id}/`, formData)
            .then((response) => {
                console.log('Doctor updated:', response.data);
                onClose();
            })
            .catch((error) => {
                console.error('Error updating doctor:', error);
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
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
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
    )
}
