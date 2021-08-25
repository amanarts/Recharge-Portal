import axios from 'axios';
import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export default function ButtonPopover(props) {
    const [showPopover, setShowPopover] = useState(false);
    const alert = useAlert();

    const updatePlanStatus = (planId, newStatus) => {
        
        const promise=axios.put(process.env.REACT_APP_PLAN_SERVER_URL + '/plan-management/plan/status/'+planId,{status:newStatus});
        promise.then((response)=>{
            props.setRefreshList(new Date());
            alert.success("Plan Status Updated Successfully");
        })
        promise.catch((error)=>{
            alert.error(error.response.data.message);
        })
    }
    return (
        <div className="col-lg-7 col-md-8 col-12 my-auto px-0">
            <OverlayTrigger show={showPopover} placement="bottom"
                overlay={
                    <Popover className="px-0" id="popover-basic" onMouseEnter={() => { setShowPopover(true) }} onBlur={() => { setShowPopover(false) }}>
                        <Popover.Title as="h3">Manage Plan</Popover.Title>
                        <Popover.Content >
                            <div className="row mx-0 px-0">
                                {props.plan.status === "ACTIVE" || props.plan.status === "INACTIVE" || props.plan.status === "CREATED" ?
                                    <button className="col-lg-5 col-md-5 col-5 my-1 mx-1 px-0 text-light" style={{ backgroundColor: '#00a7b3', borderColor: '#00a7b3', borderRadius: '10px' }} onClick={() => {
                                        props.setSelectedPlan(props.plan);
                                        props.setShowModal(true);
                                        props.setShowDetails(false);
                                        props.setShowCreateForm(false);
                                    }}>Update</button>
                                    :
                                    <div></div>
                                }
                                {props.plan.status === "ACTIVE" || props.plan.status === "INACTIVE" || props.plan.status === "CREATED" ?
                                    <button className="col-lg-5 col-md-5 col-5 my-1 mx-1 px-0" style={{ backgroundColor: '#cf0000', borderColor: '#cf0000', borderRadius: '10px', color: 'white' }} onClick={() => { updatePlanStatus(props.plan.id, "RETIRED") }}>Retire</button>
                                    :
                                    <div></div>
                                }

                                {props.plan.status === "INACTIVE" || props.plan.status === "CREATED" ?
                                    <button className="col-lg-5 col-md-5 col-5 my-1 mx-1 px-0" style={{ backgroundColor: 'green', borderColor: 'green', borderRadius: '10px', color: 'white' }} onClick={() => { updatePlanStatus(props.plan.id, "ACTIVE") }}>Activate</button>
                                    :
                                    <div></div>
                                }
                                {props.plan.status === "ACTIVE" ?
                                    <button className="col-lg-5 col-md-5 col-5 my-1 mx-1 px-0" style={{ backgroundColor: 'orange', borderColor: 'orange', borderRadius: '10px', color: 'black' }} onClick={() => { updatePlanStatus(props.plan.id, "INACTIVE") }}>Deactivate</button>
                                    :
                                    <div></div>
                                }
                            </div>



                        </Popover.Content>
                    </Popover>
                }>
                <button className="col-lg-12 col-md-12 col-12 px-0" style={{ backgroundColor: '#4481EB', borderColor: '#4481EB', borderRadius: '10px', color: 'white' }} onClick={() => { setShowPopover(!showPopover) }} onBlur={() => { setShowPopover(false) }} >Manage</button>
            </OverlayTrigger>
        </div>

    )
}
