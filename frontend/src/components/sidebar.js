import React from 'react'
import { Nav } from 'react-bootstrap'
import AuthService from './services/auth.service'
import {CgProfile, CgLogOut} from "react-icons/cg"
export default function Sidebar() {
    const logout = () => { AuthService.logout() }
    return (
        <div className="sidenav">
        <a href='/'><CgProfile /> Profile</a>
        <a href='/'>My Subscriptions</a>
        <a href='/'>Plans</a>
        <a href='/'>Report</a>
        <button onClick={logout} className="logout-button"><CgLogOut />Logout</button>
        </div>
    )
}