import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function RegisterPatient() {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        address: '',
        username: '',
        password: 'hospitaluser',
    });

    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:8000/api/register/', patientData)
            .then((response) => {
                console.log('New patient added:', response.data);
                navigate(`/`);
            })
            .catch((error) => {
                console.error('Error adding doctor:', error);
            });
        } catch (error) {
            setError('Error registering patient. Please try again.');
        }
    };

    // Generate an array of numbers from 1 to 100 for age dropdown
    const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);

    const handleToggleShowPassword = () => {
        setPatientData(prevData => ({ ...prevData, showPassword: !prevData.showPassword }));
    };    

    return (
        <div className="register-patient login">
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <div className="card" style={{ width: '500px' }}>
                    <div className="card-body my-3 mx-3">
                        <h3 className="card-title text-center mb-4"><b>Register</b></h3>
                        {error &&
                            <div className="container login-error mb-3">
                                <p>{error}</p>
                            </div>}
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label"><b>Name <font>*</font></b></label>
                                <input type="text" className="form-control" id="name" placeholder="Enter patient's name" value={patientData.name} onChange={(e) => setPatientData({ ...patientData, name: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label"><b>Email <font>*</font></b></label>
                                <input type="email" className="form-control" id="email" placeholder="Enter patient's email" value={patientData.email} onChange={(e) => setPatientData({ ...patientData, email: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label"><b>Username <font>*</font></b></label>
                                <input type="text" className="form-control" id="username" placeholder="Enter username for the user" value={patientData.username} onChange={(e) => setPatientData({ ...patientData, username: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label"><b>Password <font>*</font></b></label>
                                <div className="input-group">
                                    <input type={patientData.showPassword ? 'text' : 'password'} className="form-control" id="password" placeholder="Enter password for the user" value={patientData.password} onChange={(e) => setPatientData({ ...patientData, password: e.target.value })} required />
                                    <button className="btn btn-outline-secondary" type="button" onClick={handleToggleShowPassword}  >
                                        {patientData.showPassword ? (
                                            <BsFillEyeSlashFill />
                                        ) : (
                                            <BsFillEyeFill />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label"><b>Age <font>*</font></b></label>
                                <select className="form-select" aria-label="Age Selector" name="age" value={patientData.age} onChange={(e) => setPatientData({ ...patientData, age: e.target.value })} required>
                                    <option value=''>Select Age</option>
                                    {ageOptions.map((age) => (
                                        <option key={age} value={age}>{age}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label"><b>Phone <font>*</font></b></label>
                                <input type="text" className="form-control" id="phone" placeholder="Enter patient's phone number" value={patientData.phone} onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label"><b>Address</b></label>
                                <input type="text" className="form-control" id="address" placeholder="Enter patient's address" value={patientData.address} onChange={(e) => setPatientData({ ...patientData, address: e.target.value })} />
                            </div>
                            <div className="d-grid mt-4">
                                <button type="submit" className="btn btn-info">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
