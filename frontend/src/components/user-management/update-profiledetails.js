import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import { useAlert } from 'react-alert'
import '../css/changepassword.css'
import '../css/updateprofiledetails.css'
import authHeader from '../services/auth-header'
import jwt_decode from "jwt-decode"
export default function UpdateProfileDetails(props) {
    const alert = useAlert();
    const [profileUpdateRequest, setProfileUpdateRequest] = useState({ firstName: '', lastName: '', mobile: '', state: '', city: '', street: '', pincode: '' });
    const user = JSON.parse(sessionStorage.getItem("user"));
    const states = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa',
        'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Lakshadweep',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Punjab', 'Rajasthan', 'Puducherry', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh',
        'West Bengal'
    ]
    const [pincodeDetails, setPincodeDetails] = useState({})
    var token = user.token;
    var decodeToken = jwt_decode(token)
    const email = decodeToken.sub;
    useEffect(() => {
        axios.get("https://api.postalpincode.in/pincode/" + profileUpdateRequest.pincode)
            .then(response => {

                setPincodeDetails(response);
                console.log(pincodeDetails)
            })
            .catch(error => { })
    }, [profileUpdateRequest])


    
    const save = () => {
        const promise = axios.put(process.env.REACT_APP_SERVER_UPD_URL, profileUpdateRequest, { headers: authHeader()})
        promise.then((response) => {
            console.log(response.data)
            alert.show(response.data)
            props.setToggle(!props.toggle);
        })
            .catch(error => console.log(error))


    }
    const closeupdateprofile = () => {
        document.getElementsByClassName("buttonrow")[0].style.visibility = "hidden";
        var inputGroup = document.getElementsByClassName("fields");
        var i;
        for (i = 0; i < inputGroup.length; i++) {
            inputGroup[i].disabled = true;
        }
    }

    useEffect(() => {
        const promise = axios.get(process.env.REACT_APP_SERVER_USER_URL, { headers: authHeader()})
        promise.then((response) => {
            console.log(JSON.stringify(response) )
            setProfileUpdateRequest( response.data);
            console.log(profileUpdateRequest);
        })
            .catch(error => console.log(error))
    },[])
    const validateMobile = (content) => {

        if (content.length !== 10) {
            return false;
        }
        return true
    }
    const validateState = (addressState, city, street) => {
        if (!addressState || !city || !street)
            return false;
        else
            return true;
    }
   
    const validatePincode = (pincode) => {
        console.log(pincodeDetails)
        console.log(pincodeDetails.data[0].Status)
        if (pincodeDetails.data[0].Status === "Success") {
            console.log(pincodeDetails.data[0].PostOffice[0].State);
            if (pincodeDetails.data[0].PostOffice[0].State === profileUpdateRequest.state) {
                return true;
            }
            else
                return false;
        }
        else
            return false;

    }
    const validations = () => {
        if (profileUpdateRequest.firstName.trim().length <= 0) {
            alert.show('FirstName cannnot be empty');
        }
       else if (!validateMobile(profileUpdateRequest.mobile)) {
            alert.show('Invalid phone number');
        }
        else if (!validateState(profileUpdateRequest.state, profileUpdateRequest.city, profileUpdateRequest.street)) {
            alert.show('Address Field cannot be empty')
        }
        else if (!validatePincode(profileUpdateRequest.pincode)) {
            alert.show("Invalid Pincode")
        }
        else {
            save()
        }

    }
    const handleChange = (event) => {
        setProfileUpdateRequest({ ...profileUpdateRequest, [event.target.name]: event.target.value });
    }

    return (
    
        <div className="updateprofile">
            <Form >
                <Form.Group as={Row} className="mb-3" >
                    <Col sm="6">
                        <Form.Label className="labeltext"> First Name</Form.Label>

                        <Form.Control className ="fields" value={profileUpdateRequest.firstName} onChange={handleChange} type="text" name="firstName" disabled />
                    </Col>
                    <Col sm="6">
                        <Form.Label className="labeltext" > Last Name</Form.Label>

                        <Form.Control className ="fields" value={profileUpdateRequest.lastName} onChange={handleChange} type="text" name="lastName" disabled />

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3"  >
                    <Col sm="6">
                        <Form.Label className="labeltext"> Email </Form.Label>

                        <Form.Control id="emailfield" value={email} onChange={handleChange} type="email" name="email" disabled />
                    </Col>
                    <Col sm="6">
                        <Form.Label className="labeltext"> Mobile Number</Form.Label>
                        <Form.Control className ="fields" value={profileUpdateRequest.mobile} onChange={handleChange} type="number" name="mobile" disabled />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm="6">
                        <Form.Label className="labeltext">Street</Form.Label>
                        <Form.Control className ="fields" value={profileUpdateRequest.street} onChange={handleChange} type="text" name="street" disabled/>
                    </Col>
                    <Col sm="6">
                        <Form.Label className="labeltext"> City</Form.Label>
                        <Form.Control className ="fields" value={profileUpdateRequest.city} onChange={handleChange} type="text" name="city" disabled />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm="6">
                        <Form.Label className="labeltext"> Pincode</Form.Label>
                        <Form.Control className ="fields" value={profileUpdateRequest.pincode} onChange={handleChange} type="number" name="pincode" disabled />
                    </Col>
                    <Col sm="6">
                        <Form.Label className="labeltext"> State</Form.Label>
                        <select className="form-select form-select mb-4 fields" aria-label=".form-select example" value={profileUpdateRequest.state} onChange={handleChange} name='state' disabled>
                            <option selected className="selected-option">{profileUpdateRequest.state}</option>
                            {
                                states.map((state) => {
                                    return (<option value={state}>{state}</option>)
                                })
                            }
                        </select>
                    </Col>
                </Form.Group>

            </Form>

            <Row className="buttonrow">
                <Col>
                    <Button variant="light" onClick={validations}><b>Update</b></Button>
                </Col>
                <Col>
                    <Button variant="light" onClick={closeupdateprofile}><b>Close</b> </Button>
                </Col>
            </Row>
        </div>
    )
}

