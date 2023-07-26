import React from 'react'

export default function AdminProfile(props) {
    return (
        <div>
            <div className="container" style={{ paddingTop: '100px' }}>
                <h1>Admin's Profile</h1>
                <div className="container my-5 profile card card-body">
                    <div className="row">
                        <div className="col-sm-10">
                            <div className="container">
                                <p><b>Admin ID: </b>{props.admin.id} </p>
                                <p><b>Name: </b>{props.admin.name} </p>
                                <p><b>Department: </b>{props.admin.department_name} </p>
                                <p><b>Phone No.: </b>{props.admin.phone} </p>
                                <p><b>Email Address: </b>{props.admin.email} </p>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmQjrF-hsZQm06rGDcKRFFRs2FYzwJ71KpLA&usqp=CAU' alt='/' height={200} />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}
