import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useAlert } from 'react-alert'
import PlanForm from './planform';

export default function CreatePlan(props) {
    const [plan, setPlan] = useState({ name: "", description: "", validity: null, price: 0 });
    const [disabledFields, setDisabledFields] = useState({ validity: false,planType:false, name: true, description: true, smsRule: true, callRule: true, dataRule: true, price: true });

    const alert = useAlert();

    const save = () => {
        document.getElementById("alert-banner").style.display = "none";
        const promise = axios.post(process.env.REACT_APP_PLAN_SERVER_URL + '/plan-management/plan', plan);
        promise.then(response => {
            console.log(response);
            alert.show('Plan added');
            props.handleCloseModal();

        });
        promise.catch(error => {
            document.getElementById("alert-banner").style.display = "block";
            if (error.response.data.message) {
                document.getElementById("alert-banner").innerHTML = error.response.data.message;
            }
            else {
                document.getElementById("alert-banner").innerHTML = error.response;
            }
        });
    };

    return (
        <div className="container-fluid" >
            <div className="row py-3" style={{ background: "#212121", font: "white", textAlign: "center", color: "white" }}>
                <h1> New plan</h1>
            </div>

            <br></br>

            <div class="alert alert-danger alert-dismissible fade show" id="alert-banner" style={{ display: "none" }} role="alert" >
            </div>

            <br></br>

            <PlanForm formButtonText={"Create"}  plan={plan} setPlan={setPlan} formAction={save} handleCloseModal={props.handleCloseModal} disabledFields={disabledFields} />
        </div>
    )
}
