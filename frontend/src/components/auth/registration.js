import React, { useState, useEffect } from 'react'
import './../css/registration.css'

import Registerimg from './../../img/register.svg'
import axios from 'axios';
import { useAlert } from "react-alert";
import { Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HomeButton } from '../homepage/pages/homeButton';
export default function Registration() {

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        state: "",
        city: "",
        street: "",
        pincode: ""
    });
    /**
     * Regex to verify the names contains alphabets only
     */
    const nameRegex = /^[a-zA-Z]+$/
    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
        'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh',
        'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu',
        'Delhi', 'Lakshadweep', 'Puducherry']

    const save = () => {

        const promise = axios.post(process.env.REACT_APP_AUTH_SIGNUP_URL, userDetails);
        promise.then(response => {
            console.log(response);
            alert.show(response.data)
            setUserDetails({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                password: "",
                state: "",
                city: "",
                street: "",
                pincode: ""
            });
            
            console.log('saved');
        });
        promise.catch(error => {
            console.log(error.response.data);
            alert.show(error.response.data);
        });

    };
    useEffect(() => {
        axios.get("https://api.postalpincode.in/pincode/" + userDetails.pincode)
        .then(response => {

            setPincodeDetails(response);
            console.log(pincodeDetails)   
        })
        .catch(error => 
            {})
    },[userDetails])

    /**
     * 
     * @param  event 
     * Handler change for user details
     */
    const handleChange = (event) =>  {
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
        console.log(userDetails);
       
    };
    
    const alert = useAlert();
    const validateEmail = (content) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(content).toLowerCase());
    }

    const validateFirstName = (content) => {

        if (content.length < 2 || content.length > 30 || !nameRegex.test(String(content))) {
            return false;
        }
        return true
    }
    const validateLastName = (content) => {
        if (content.length > 30 || !nameRegex.test(String(content))) {
            return false;
        }
        return true
    }
    const validateMobile = (content) => {

        if (content.length !== 10) {
            return false;
        }
        return true
    }
    const validatePassword = (content) => {
        if (content.length < 8) {
            return false;
        }
        else {
            const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(String(content));
        }
    }
    const validateConfirmPassword = (password, confirmPassword) => {
        if (String(password) === String(confirmPassword))
            return true;
        else
            return false;
    }
    const validateState = (addressState, city, street) => {
        if (!addressState || !city || !street )
            return false;
        else
            return true;
    }
    const [pincodeDetails, setPincodeDetails] = useState({})
    const validatePincode = (pincode) => { 
        console.log(pincodeDetails)  
        console.log(pincodeDetails.data[0].Status)     
       if(pincodeDetails.data[0].Status === "Success"){
           console.log(pincodeDetails.data[0].PostOffice[0].State);
            if(pincodeDetails.data[0].PostOffice[0].State === userDetails.state){
               return true;
            }
            else
            return false;
       }
       else
       return false;

    }
    
    const validations = () => {
        console.log(userDetails.pincode);
        var confirmPassword = document.getElementById('confirmPassword');
        if (!validateFirstName(userDetails.firstName.trim())) {
            alert.show('First name must be between 2 and 30 characters and should contains alphabets only');
        }
        else if (!validateLastName(userDetails.lastName.trim())) {
            alert.show('Last name must be 30 characters at most and should contains alphabets only');
        }
        else if (!validateEmail(userDetails.email)) {
            alert.show('Invalid email');
        }
        else if (!validateMobile(userDetails.mobile)) {
            alert.show('Invalid phone number');
        }
        else if (!validatePassword(userDetails.password)) {
            alert.show('Password must be 8 characteres with atleast 1 uppercase character atleast 1 lowercase character atleast 1 Number and 1 special character');
        }
        else if (!validateConfirmPassword(userDetails.password, confirmPassword.value)) {
            alert.show('confirm password does not match');
        }
        else if (!validateState(userDetails.state, userDetails.city, userDetails.street)) {
            alert.show('Address Field cannot be empty')
        }
        else if(!validatePincode(userDetails.pincode)){
            alert.show("Invalid Pincode")
                   }
        else {
            save()
        }
    }

    return (
        <div>
        <div className="container1">
            <div id="logoBlock" className="box">        
            <img src={Registerimg} className="registerimg" alt="register img" />
            </div>
            <div id="registrationBlock" className="box">
                <div className="heading1 mb-3">Register to PS Portal</div>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        First Name<span className="red">*</span>
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control value={userDetails.firstName} onChange={handleChange} name="firstName" placeholder="Enter first name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        Last Name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control value={userDetails.lastName} onChange={handleChange} name="lastName" placeholder="Enter last name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        Email<span className="red">*</span>
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control value={userDetails.email} onChange={handleChange} name="email" placeholder="Enter email" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        Phone no
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="number" value={userDetails.mobile} onChange={handleChange} name="mobile" placeholder="Enter phone number" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        Password<span className="red">*</span>
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" value={userDetails.password} onChange={handleChange} name="password" placeholder="Enter password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        Confirm Password<span className="red">*</span>
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" id="confirmPassword" placeholder="Re-enter password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                        Address<span className="red">*</span>
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control value={userDetails.street} onChange={handleChange} name="street" placeholder="Enter street" />
                    </Col>
                    <Col sm="5">
                        <Form.Control value={userDetails.city} onChange={handleChange} name="city" placeholder="Enter city" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                    </Form.Label>
                    <Col sm="4">
                        <Form.Control type="number" id="pincode" value={userDetails.pincode} onChange={handleChange} name="pincode" placeholder="Enter pin code" />
                    </Col>
                    <Col sm="5">
                        <select className="form-select form-select mb-4" aria-label=".form-select example" value={userDetails.state} onChange={handleChange} name='state'>
                            <option selected className="selected-option">Select state</option>
                            {
                                states.map((state) => {
                                    return (<option value={state}>{state}</option>)
                                })
                            }
                        </select>
                    </Col>
                </Form.Group>
                <div className='center'>
             
            <Link to='/login' className="btn-link">
              <HomeButton buttonStyle='btn--outline'  onClick={validations} >Sign Up</HomeButton>
            </Link>
            
                    <p className="mb-3">
                        <b>Already Registered? Login
                            <Link to='/login'> here</Link></b></p>
                </div>
            </div>
        </div>
        </div>
    )
}
