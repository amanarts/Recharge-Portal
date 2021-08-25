import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Imgavatar from '../../img/img_avatar.png'
import authHeader from '../services/auth-header';

export default function ProfileContent(props) {
    const [profileUpdateRequest, setProfileUpdateRequest] = useState({ firstName: '', lastName: '', mobile: '', state: '', city: '', street: '', pincode: ''});
    
    const updateprofile = () => {
       
        document.getElementsByClassName("buttonrow")[0].style.visibility = "visible";
        document.getElementsByClassName("updateprofile")[0].style.visibility="visible";
        document.getElementsByClassName("changePasswordForm")[0].style.visibility="hidden";        
        var inputGroup = document.getElementsByClassName("fields");
        var i;
        for (i = 0; i < inputGroup.length; i++) {
            inputGroup[i].disabled = false;
        }
         document.getElementById("emailfield").style.backgroundColor="rgb(165, 164, 164)";
    }
    const showChangePassword =()=>{
        document.getElementsByClassName("updateprofile")[0].style.visibility="hidden";
        document.getElementsByClassName("buttonrow")[0].style.visibility = "hidden";
        document.getElementsByClassName("changePasswordForm")[0].style.visibility="visible";
        console.log(props.toggle)
    }
    useEffect(() => {
        const promise = axios.get(process.env.REACT_APP_SERVER_USER_URL, { headers: authHeader()})
        promise.then((response) => {
            console.log(JSON.stringify(response) )
           
            setProfileUpdateRequest( response.data);
           
        })
            .catch(error => console.log(error))
    },[ props.toggle])
    return (
        <div className="content">
                <div className="imagegrid">
                <img src={Imgavatar} alt="avatar" className="imgavatar" height="130px"/>
                <h1 className="userName">{profileUpdateRequest.firstName} {profileUpdateRequest.lastName}</h1>
                 <div className="updateBtn">
                <Button  variant="light" onClick={updateprofile}><b>Update Profile</b></Button>
                <Button  variant="light" onClick={showChangePassword}><b>Change Password</b></Button>
                </div>
                </div>
            </div>
    )
}


