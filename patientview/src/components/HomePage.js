import React from 'react'
import Navbar from './Navbar'

export default function HomePage() {
  return (
    <div>
        <Navbar />
        <div className='container my-5' style={{paddingTop: '100px'}}><h1 className='welcome'>Welcome to A Hospital</h1></div>
    </div>
  )
}
