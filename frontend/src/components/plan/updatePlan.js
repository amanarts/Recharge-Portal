import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useAlert } from 'react-alert'
import PlanForm from './planform';

export default function UpdatePlan(props) {
    const [plan, setPlan] = useState(props.plan);
    const [disabledFields, setDisabledFields] = useState({ validity: props.plan.planType === "POSTPAID" ? true : false, planType: true, name: false, description: false, smsRule: false, callRule: false, dataRule: false, price: false });
    const alert = useAlert();

    const isPlanRuleEqual = (rule1, rule2) => {
        if (rule1 == rule2) {
            return true;
        }
        if (rule1 == null || rule2 == null) {
            return false;
        }
        return (
            rule1.id === rule2.id &&
            rule1.name === rule2.name &&
            rule1.allowance === rule2.allowance &&
            rule1.validity === rule2.validity &&
            rule1.serviceType === rule2.serviceType &&
            rule1.ottServiceId === rule2.ottServiceId &&
            rule1.cost === rule2.cost)

    }
    const isPlanEqual = (plan1, plan2) => {
        return plan1 == plan2 || (plan1.id === plan2.id &&
            plan1.name === plan2.name &&
            plan1.description === plan2.description &&
            plan1.price === plan2.price &&
            plan1.validity === plan2.validity &&
            isPlanRuleEqual(plan1.smsRule, plan2.smsRule) &&
            isPlanRuleEqual(plan1.callRule, plan2.callRule) &&
            isPlanRuleEqual(plan1.dataRule, plan2.dataRule)
        )
    }

    const update = () => {
        document.getElementById("alert-banner").style.display = "none";
        if (isPlanEqual(props.plan, plan)) {
            document.getElementById("alert-banner").style.display = "block";
            document.getElementById("alert-banner").innerHTML = "No change in plan detected!";
        }
        else {
            const promise = axios.put(process.env.REACT_APP_PLAN_SERVER_URL + '/plan-management/plan/' + plan.id, plan);
            promise.then(response => {
                alert.success('Plan has been Updated');
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
        }

    };

    return (
        <div className="container-fluid" >
            <div className="row py-3" style={{ background: "#212121", font: "white", textAlign: "center", color: "white" }}>
                <h1> Update Plan</h1>
            </div>

            <br></br>

            <div class="alert alert-danger alert-dismissible fade show" id="alert-banner" style={{ display: "none" }} role="alert" >
            </div>

            <br></br>
            <PlanForm formButtonText={"Update"} plan={plan} setPlan={setPlan} formAction={update} handleCloseModal={props.handleCloseModal} disabledFields={disabledFields} />
            <br></br>
            {
                props.plan.status === "CREATED" ?
                    <div class="alert alert-info alert-dismissible fade show" id="alert-banner" role="alert" >
                        <b>Note</b> : Updating fields of a "CREATED" Plan will update the same Plan.
                    </div>
                    :
                    <div class="alert alert-info alert-dismissible fade show" id="alert-banner" role="alert" >
                        <b>Note</b> : Updating a <b>{props.plan.status}</b> Plan will create a new plan with the updated fields, and the old rule will be changed to <b>RETIRED</b> state.
                    </div>
            }

        </div>
    )
}
