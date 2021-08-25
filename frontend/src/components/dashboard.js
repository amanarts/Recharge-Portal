import React, { useState } from 'react'
import AuthService from './services/auth.service'
import ChangePassword from './user-management/change-password'
import Footer from './footer'
import './css/dashboard.css'
import Sidebar from './sidebar'
import UpdateProfileDetails from './user-management/update-profiledetails'
import { Button } from 'bootstrap'
import ProfileContent from './user-management/profile-content'
export default function Dashboard() {
    const logout = () => { AuthService.logout() }
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [toggle, setToggle] = useState(false) ;

    if (!user)
        window.location.href = "/"

   
    return (
        <div className="gridbox" >
            <Sidebar></Sidebar>
            <ProfileContent toggle={toggle}></ProfileContent>
            <UpdateProfileDetails toggle={toggle} setToggle={setToggle}></UpdateProfileDetails>
            <ChangePassword></ChangePassword>
        </div>
    )
}