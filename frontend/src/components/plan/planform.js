import React from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import '../css/plan.css'
import axios from 'axios';

export default function PlanForm(props) {
    const [fieldValidation, setFieldValidation] = useState({ name: true, description: true, rule: true, price: true });
    const [disabledFields, setDisabledFields] = useState(props.disabledFields);
    const [isValidated, setIsValidated] = useState(false);
    const [callRuleList, setCallRuleList] = useState([]);
    const [smsRuleList, setSmsRuleList] = useState([]);
    const [dataRuleList, setDataRuleList] = useState([]);

    useEffect(() => {
        if (isValidated) {
            props.formAction();
            setIsValidated(false);
        }
    });
    useEffect(() => {
        if ((props.plan.validity != null || props.plan.validity != undefined) && (props.plan.planType != null || props.plan.planType != undefined)) {
            const callPromise = axios.get(process.env.REACT_APP_PLAN_SERVER_URL + '/plan-management/rule?serviceType=CALL&validity=' + props.plan.validity + '&planType=' + props.plan.planType);
            callPromise.then(response => {

                setCallRuleList(response.data);

            });
            const smsPromise = axios.get(process.env.REACT_APP_PLAN_SERVER_URL + '/plan-management/rule?serviceType=SMS&validity=' + props.plan.validity + '&planType=' + props.plan.planType);
            smsPromise.then(response => {

                setSmsRuleList(response.data);

            });
            const dataPromise = axios.get(process.env.REACT_APP_PLAN_SERVER_URL + '/plan-management/rule?serviceType=DATA&validity=' + props.plan.validity + '&planType=' + props.plan.planType);
            dataPromise.then(response => {

                setDataRuleList(response.data);

            });
        }


    }, [props.plan.validity, props.plan.planType])

    const validateDescription = (content) => {
        if (content.trim().length < 3 || content.trim().length > 255) {
            return false;
        }
        return true
    }
    const validateName = (content) => {
        if (content.trim().length < 3 || content.trim().length > 50) {
            return false;
        }
        return true
    }
    const validatePrice = (content) => {
        if (parseInt(content) <= 0) {
            return false;
        }
        return true
    }
    const validateRuleAtleastOne = (callRule, smsRule, dataRule) => {
        if (callRule || smsRule || dataRule) {
            return true;
        }
        return false;
    }

    const checkValidation = () => {
        document.getElementById("alert-banner").style.display = "none";
        const validation = {
            name: validateName(props.plan.name),
            description: validateDescription(props.plan.description),
            rule: validateRuleAtleastOne(props.plan.callRule, props.plan.smsRule, props.plan.dataRule),
            price: validatePrice(props.plan.price)
        };
        setFieldValidation(validation);
        if (validation.name && validation.description && validation.rule && validation.price) {
            setIsValidated(true);
        }
    }

    const handleValidityChange = (event) => {
        const newValidity = event.target.value;
        props.setPlan({ ...props.plan, validity: newValidity });
        if (props.plan.planType != undefined || props.plan.planType != null) {
            setDisabledFields({ ...disabledFields, name: false, description: false, smsRule: false, callRule: false, dataRule: false, price: false });
        }
    }

    const handlePlanTypeChange = (event) => {
        if (event.target.value === "POSTPAID") {
            props.setPlan({ ...props.plan, planType: event.target.value, validity: "28" });
            setDisabledFields({ ...disabledFields, name: false, description: false, smsRule: false, callRule: false, dataRule: false, price: false, validity: true });
        }
        else {
            props.setPlan({ ...props.plan, planType: event.target.value });
            if (props.plan.validity != undefined || props.plan.validity != null) {
                setDisabledFields({ ...disabledFields, name: false, description: false, smsRule: false, callRule: false, dataRule: false, price: false, validity: false });
            }
        }



    }

    const handleSmsChange = (event) => {
        const smsRule = smsRuleList.find((smsRule) => smsRule.id === event.target.value);
        props.setPlan({ ...props.plan, smsRule: smsRule });
    }

    const handleCallChange = (event) => {
        const callRule = callRuleList.find((callRule) => callRule.id === event.target.value);
        props.setPlan({ ...props.plan, callRule: callRule });
    }


    const handleDataChange = (event) => {
        const dataRule = dataRuleList.find((dataRule) => dataRule.id === event.target.value);
        props.setPlan({ ...props.plan, dataRule: dataRule });
    }
    const handleFieldChange = (event) => {
        props.setPlan({ ...props.plan, [event.target.name]: event.target.value });

    };


    return (
        <div >
            <div className=" row form-group justify-content-center">
                <div className="col-lg-3 col-12">
                    <label >Plan Type:</label>
                </div>

                <div className="col-lg-8 col-12">
                    <select className="form-select form-select" onChange={handlePlanTypeChange} name="planType" aria-label=".form-select example" value={props.plan.planType} disabled={disabledFields.planType}>
                        <option hidden>Select Plan Type </option>
                        <option value="POSTPAID">POSTPAID</option>
                        <option value="PREPAID">PREPAID</option>
                    </select>

                </div>
            </div>
            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >Plan Validity:</label>
                </div>

                <div className="col-lg-8 col-12">
                    <select className="form-select form-select" onChange={handleValidityChange} name="validity" aria-label=".form-select example" value={props.plan.validity} disabled={disabledFields.validity}>
                        <option hidden>Select Validity Period </option>
                        <option value="1"> 1 day</option>
                        <option value="2"> 2 days</option>
                        <option value="7"> 7 days</option>
                        <option value="28"> 28 days</option>
                        <option value="56"> 56 days</option>
                        <option value="84"> 84 days</option>
                        <option value="180"> 180 days</option>
                        <option value="365"> 365 days</option>
                    </select>

                </div>
            </div>



            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >Plan Name:</label>
                </div>
                <div className="col-lg-8 col-12">
                    <input type="text" class={"form-control " + (fieldValidation.name ? "" : "is-invalid")} onChange={handleFieldChange} name="name" placeholder="Enter name" required disabled={disabledFields.name} value={props.plan.name} />
                    <div className="invalid-feedback">
                        Name must be between 3 and 50 charecters
                    </div>
                </div>
            </div>
            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >SMS Rule:</label>
                </div>
                <div className="col-lg-8 col-12">
                    {
                        props.plan.smsRule != null ?
                            <select className={"form-select " + (fieldValidation.rule ? "" : "is-invalid")} aria-label=".form-select-lg example" placeholder="Select SMS Rule" onChange={handleSmsChange} name="smsRule">
                                <option > Select SMS Rule</option>
                                {
                                    smsRuleList.map((smsRule) => {
                                        if (smsRule.id === props.plan.smsRule.id) {
                                            return (<option value={smsRule.id} selected>{smsRule.name}</option>);
                                        }
                                        else {
                                            return (
                                                <option value={smsRule.id}>{smsRule.name}</option>
                                            );
                                        }

                                    })
                                }
                            </select> :
                            <select className={"form-select " + (fieldValidation.rule ? "" : "is-invalid")} aria-label=".form-select-lg example" placeholder="Select SMS Rule" onChange={handleSmsChange} name="smsRule" disabled={disabledFields.smsRule}>
                                <option selected > Select SMS Rule</option>
                                {
                                    smsRuleList.map((smsRule) => {
                                        return (
                                            <option value={smsRule.id}>{smsRule.name}</option>
                                        );
                                    })
                                }
                            </select>
                    }
                    <div className="invalid-feedback">
                        Select atleast one of SMS/Call/Data rule
                    </div>
                </div>
            </div>
            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >Call Rule:</label>
                </div>
                <div className="col-lg-8 col-12">
                    {
                        props.plan.callRule != null ?
                            <select className={"form-select " + (fieldValidation.rule ? "" : "is-invalid")} aria-label=".form-select-lg example" placeholder="Select Call Rule" onChange={handleCallChange} name="callRule">

                                <option > Select Call Rule</option>



                                {
                                    callRuleList.map((callRule) => {
                                        if (callRule.id === props.plan.callRule.id) {
                                            return (
                                                <option value={callRule.id} selected>{callRule.name}</option>
                                            );
                                        }
                                        else {
                                            return (
                                                <option value={callRule.id}>{callRule.name}</option>
                                            );
                                        }
                                    })
                                }
                            </select> :
                            <select className={"form-select " + (fieldValidation.rule ? "" : "is-invalid")} aria-label=".form-select-lg example" placeholder="Select Call Rule" onChange={handleCallChange} name="callRule" disabled={disabledFields.callRule}>
                                <option selected > Select Call Rule</option>
                                {
                                    callRuleList.map((callRule) => {
                                        return (
                                            <option value={callRule.id}>{callRule.name}</option>
                                        );
                                    })
                                }
                            </select>
                    }
                    <div className="invalid-feedback">
                        Select atleast one of SMS/Call/Data rule
                    </div>
                </div>
            </div>
            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >Data Rule:</label>
                </div>
                <div className="col-lg-8 col-12">
                    {
                        props.plan.dataRule != null ?
                            <select className={"form-select " + (fieldValidation.rule ? "" : "is-invalid")} aria-label=".form-select-lg example" placeholder="Select Data Rule" onChange={handleDataChange} name="dataRule">


                                <option >Select Data Rule</option>


                                {
                                    dataRuleList.map((dataRule) => {
                                        if (dataRule.id === props.plan.dataRule.id) {
                                            return (
                                                <option value={dataRule.id} selected>{dataRule.name}</option>
                                            );
                                        }
                                        else {
                                            return (
                                                <option value={dataRule.id}>{dataRule.name}</option>
                                            );
                                        }
                                    })
                                }
                            </select> :
                            <select className={"form-select " + (fieldValidation.rule ? "" : "is-invalid")} aria-label=".form-select-lg example" placeholder="Select Data Rule" onChange={handleDataChange} name="dataRule" disabled={disabledFields.dataRule}>
                                <option selected > Select Data Rule</option>
                                {
                                    dataRuleList.map((dataRule) => {
                                        return (
                                            <option value={dataRule.id}>{dataRule.name}</option>
                                        );
                                    })
                                }
                            </select>
                    }
                    <div className="invalid-feedback">
                        Select atleast one of SMS/Call/Data rule
                    </div>
                </div>
            </div>
            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >Price:</label>
                </div>
                <div className="col-lg-8 col-12">

                    <input type="number" class={"form-control " + (fieldValidation.price ? "" : "is-invalid")} onChange={handleFieldChange} name="price" value={props.plan.price} placeholder="Enter price" required disabled={disabledFields.price} />

                    <div className="invalid-feedback">
                        Price should be greater than 0
                    </div>
                </div>
            </div>
            <div className=" row form-group justify-content-center mt-3">
                <div className="col-lg-3 col-12">
                    <label >Description:</label>
                </div>
                <div className="col-lg-8 col-12">
                    <textarea className={"form-control " + (fieldValidation.description ? "" : "is-invalid")} placeholder="Type description..." onChange={handleFieldChange} name="description" disabled={disabledFields.description} value={props.plan.description} ></textarea>

                    <div className="invalid-feedback">
                        Description must be between 10 and 250 characters
                    </div>
                </div>
            </div>

            <div className="row mt-4" >
                <div className="col-6 text-center">
                    <Button variant="primary button-blue" type='submit' onClick={checkValidation} >{props.formButtonText}</Button>
                </div>
                <div className="col-6 text-center">
                    <Button variant="primary button-blue" type='submit' onClick={props.handleCloseModal}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
