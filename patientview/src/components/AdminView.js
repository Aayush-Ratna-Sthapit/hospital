import Navbar from './Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminProfile from './AdminProfile'

export default function AdminView() {

    const { admin_id } = useParams()

    const [admin, setAdmin] = useState([])

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
        axios.get(`http://localhost:8000/api/admins/${admin_id}/`)
            .then((response) => {
                setAdmin(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [admin_id]);

    return (
        <div className='App'>
            <Navbar userType='admin' id={admin_id} />
            <AdminProfile admin={admin} />
        </div>
    )
}
