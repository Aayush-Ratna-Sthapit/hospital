import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios';
import Navbar from './Navbar';

export default function AppointmentDoctor() {

    const { user, id, doctor_id } = useParams()

    const [doctor, setDoctor] = useState({})

    useEffect(() => {
        console.log(doctor_id);
        axios.get(`http://localhost:8000/api/doctors/${doctor_id}/`)
            .then((response) => {
                setDoctor(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [doctor_id])

    return (
        <div>
            <Navbar userType={user} id={id} />
            <div className="container" style={{ paddingTop: '100px' }}>
                <h1>Doctor's Profile</h1>
                <div className="container my-5 profile card card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="container">
                                    <p><b>Doctor ID: </b>{doctor.id} </p>
                                    <p><b>Name: </b>{doctor.name} </p>
                                    <p><b>Department: </b>{doctor.department_name} </p>
                                    <p><b>Email: </b>{doctor.email} </p>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyrBSyYXA389y5lA1B4YgrOULYKy-sihIloQ&usqp=CAU' alt='/' height={160} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
