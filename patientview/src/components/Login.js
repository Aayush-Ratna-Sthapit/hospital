import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      });
  
      localStorage.setItem('token', response.data.token);
  
      const userResponse = await axios.get('http://localhost:8000/api/user/details/', {
        headers: {
          Authorization: `Token ${response.data.token}`,
        },
      });

      console.log(userResponse);
  
      const userGroup = userResponse.data.user_groups; 
      const userId = userResponse.data.user_id;
  
      switch (userGroup) {
        case 'admin':
          navigate(`/admin/${userId}/profile/`);
          break;
        case 'patient':
          navigate(`/patient/${userId}/profile/`);
          break;
        case 'doctor':
          navigate(`/doctor/${userId}/profile/`);
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='login'>
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="card" style={{ width: '500px', height: '450px' }}>
          <div className="card-body my-3 mx-3">
            <h3 className="card-title text-center mb-4"><b>Sign In</b></h3>
            {error && 
              <div className="container login-error mb-3">
                <p>{error}</p>
              </div>} 
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label"><b>Username</b></label>
                <input type="text" className="form-control" id="username" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label"><b>Password</b></label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-info">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
