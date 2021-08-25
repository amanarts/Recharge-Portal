import React from 'react'
import { Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';
export default function ViewPlan(props) {
    console.log(props.plan);
    return (
        <div className="container-fluid py-0">
            <div className="row py-2" style={{ background: "#212121", font: "white", textAlign: "center", color: "white" }}>
                <h1>Details</h1>
            </div>
            <br />
            <br />
            <div >

                <Row className="py-2">
                    <Col xs="2" ></Col>
                    <Col xs="5" ><b>Price</b></Col>
                    <Col xs="5">₹ {props.plan.price}</Col>

                </Row>
                <Row className="py-1">
                    <Col xs="2" ></Col>
                    <Col xs="5"><b>Validity</b></Col>
                    <Col xs="5">{props.plan.validity} days</Col>
                </Row>
                <Row className="py-1">
                    <Col xs="2" ></Col>
                    <Col xs="5"><b>Calls</b></Col>
                    <Col xs="5">{props.plan.callRule ? props.plan.callRule.allowance + " Min " + (props.plan.callRule.validity > 1 ? "/ " + props.plan.callRule.validity + " Days" : "Per Day") : "----"}</Col>
                </Row>
                <Row className="py-1">
                    <Col xs="2" ></Col>
                    <Col xs="5"><b>SMS</b></Col>
                    <Col xs="5">{props.plan.smsRule ? props.plan.smsRule.allowance + " SMS " + (props.plan.smsRule.validity > 1 ? "/ " + props.plan.smsRule.validity + " Days" : "Per Day") : "----"}</Col>
                </Row>
                <Row className="py-1">
                    <Col xs="2" ></Col>
                    <Col xs="5"><b>Data</b></Col>
                    <Col xs="5">{props.plan.dataRule ? props.plan.dataRule.allowance + " GB " + (props.plan.dataRule.validity > 1 ? "/ " + props.plan.dataRule.validity + " Days" : "Per Day") : "----"}</Col>
                </Row>
                <Row className="py-1">
                    <Col xs="2" ></Col>
                    <Col xs="10" className="py-2"><b>Details</b></Col>
                    <Col xs="2" ></Col>
                    <Col xs="10">{props.plan.description}</Col>
                </Row>

                <br />
                <Row className="py-1">
                    <Col xs="8" ></Col>
                    <Col xs="2" ><Button variant="primary" type='submit' style={{ backgroundColor: '#4481EB' }} onClick={() => props.handleCloseModal()}>Cancel</Button></Col>
                </Row>

                <div className="align-right" >

                </div>

            </div>
        </div>
    )
}
