import React from 'react'
import { useState } from 'react'
import { Button, Form, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import { useAlert } from 'react-alert'
import '../css/changepassword.css'
import authHeader from '../services/auth-header';
export default function ChangePassword(props) {
    const alert = useAlert();
    const [passwordUpdateRequest, setPasswordUpdateRequest] = useState({newPassword:''});
    const save = () => {
        const promise =axios.put(process.env.REACT_APP_SERVER_CP_URL,passwordUpdateRequest, { headers: authHeader()})
        promise.then((response)=>{
            console.log(response.data)
            alert.show(response.data)
        })
        .catch(error => console.log(error))


    }
    const validations =()=>{
        var confirmPassword=document.getElementById("confirmPassword");
        var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if(passwordUpdateRequest.newPassword.length<=0){
           alert.show('Fields cannnot be empty');
        }
        else if(passwordUpdateRequest.newPassword != confirmPassword.value){
        alert.show('Passwords do not Match');
        }
        else if(!regularExpression.test(passwordUpdateRequest.newPassword)){
            alert.show('Password must have 8 characters with  Atleast 1 UpperCase character Atleast 1 LowerCase character Atleast 1 Special Character [!@#$%^&]');
        }
        else {
            save()
            }
    
    }
    const handleChange =(event) => {
        setPasswordUpdateRequest({...passwordUpdateRequest,[event.target.name]:event.target.value});
    }
    
    return (
        <div className="changePasswordForm" >
            <Form >
                <Form.Group as={Row} className="mb-3 cpfields" >
                <Col sm="7">
                    <Form.Label >New Password</Form.Label>
                    
                    <Form.Control value={passwordUpdateRequest.newPassword} onChange={handleChange} type="password"  name="newPassword"  />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 cpfields" >
                <Col sm="7">
                 <Form.Label >Confirm Password</Form.Label>
                 
                  <Form.Control  type="password"  id="confirmPassword"  />
                  </Col> 
                </Form.Group>
                <Row className="buttonrow1">
                    <Col>
                    <Button variant="light" onClick={validations}>Save</Button>
                    </Col>
                </Row>
                
            </Form>
           
        </div>
    )
}
