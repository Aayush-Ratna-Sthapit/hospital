import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios';
import Navbar from './Navbar';

export default function AppointmentPatient() {

    const { user, id, patient_id } = useParams()

    const [patient, setPatient] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/patients/${patient_id}/`)
            .then((response) => {
                setPatient(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [patient_id])

    return (
        <div>
            <Navbar userType={user} id={id} />
            <div className="container" style={{ paddingTop: '100px' }}>
                <h1>Patient's Profile</h1>
                <div className="container my-5 profile card card-body">
                    <div className="container">
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
                </div>
            </div>
        </div>
    )
}
