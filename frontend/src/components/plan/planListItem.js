import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ButtonPopover from "./buttonpopover";

export default function PlanListItem(props) {
  const [badge, setBadge] = useState({
    ACTIVE: { background: "bg-success", text: "text-light" },
    INACTIVE: { background: "bg-warning", text: "text-dark" },
    CREATED: { background: "bg-primary", text: "text-light" },
    RETIRED: { background: "bg-danger", text: "text-light" },
    EXPIRED: { background: "bg-danger", text: "text-light" },
    EXHAUSTED: { background: "bg-secondary", text: "text-light" },
  });

  const badgeStatus =
    props.isPlanList != undefined && props.isPlanList && props.isAdmin
      ? props.plan.status
      : props.subscription.status;
  return (
    <Card bg="white" text="black" className="plan-card">
      <Card.Body>
        <div style={{ textAlign: "left", float: "left", width: "16%" }}>
          <Card.Text style={{ color: "gray" }}>
            <b>Plan</b>
            {props.showBadge ? (
              <div
                className={
                  "badge mx-2 px-1 " +
                  badge[badgeStatus].background +
                  " " +
                  badge[badgeStatus].text
                }
              >
                {badgeStatus}
              </div>
            ) : (
              <span></span>
            )}
          </Card.Text>
          <Card.Text style={{ fontSize: "120%", color: "orangered" }}>
            <b>₹ {props.plan.price} </b>
          </Card.Text>
        </div>

        {props.subscription != undefined ? (
          <div style={{ textAlign: "left", float: "left", width: "16%" }}>
            <Card.Text style={{ color: "gray" }}>
              <b>Plan Type</b>
            </Card.Text>
            <Card.Text>
              <b>{props.subscription.type}</b>
            </Card.Text>
          </div>
        ) : (
          <div style={{ textAlign: "left", float: "left", width: "16%" }}>
            <Card.Text style={{ color: "gray" }}>
              <b>Plan Type</b>
            </Card.Text>
            <Card.Text>
              <b>{props.plan.planType}</b>
            </Card.Text>
          </div>
        )}
        {props.subscription != undefined ? (
          <div style={{ textAlign: "left", float: "left", width: "16%" }}>
            <Card.Text style={{ color: "gray" }}>
              <b>Subscribed On</b>
            </Card.Text>
            <Card.Text>
              <b>{props.subscription.purchasedDate}</b>
            </Card.Text>
          </div>
        ) : (
          <span></span>
        )}
        {props.subscription != undefined &&
        props.subscription.type == "POSTPAID" ? (
          <div style={{ textAlign: "left", float: "left", width: "16%" }}>
            <Card.Text style={{ color: "gray" }}>
              <b>Validity</b>
            </Card.Text>
            <Card.Text>
              <b>One Billing Cycle</b>
            </Card.Text>
          </div>
        ) : (
          <div style={{ textAlign: "left", float: "left", width: "16%" }}>
            <Card.Text style={{ color: "gray" }}>
              <b>Validity</b>
            </Card.Text>
            <Card.Text>
              <b>
                {" "}
                {props.plan.validity}
                {props.plan.validity > 1 ? " Days" : " Day"}{" "}
              </b>
            </Card.Text>
          </div>
        )}

        <div
          style={{ textAlign: "left", float: "left", width: "16%" }}
          hidden={
            props.showAllColumn == undefined ||
            props.showAllColumn ||
            props.plan.dataRule
              ? false
              : true
          }
        >
          <Card.Text style={{ color: "gray" }}>
            <b>Data</b>
          </Card.Text>
          {props.plan.dataRule ? (
            <Card.Text>
              <b>
                {props.plan.dataRule.allowance} GB
                {props.subscription != undefined &&
                props.subscription.type == "POSTPAID"
                  ? ""
                  : props.plan.dataRule.validity > 1
                  ? " / " + props.plan.dataRule.validity + " Days"
                  : " Per Day"}
              </b>
            </Card.Text>
          ) : (
            <Card.Text>
              <b> ----</b>
            </Card.Text>
          )}
        </div>
        <div
          style={{ textAlign: "left", float: "left", width: "16%" }}
          hidden={
            props.showAllColumn == undefined ||
            props.showAllColumn ||
            props.plan.smsRule
              ? false
              : true
          }
        >
          <Card.Text style={{ color: "gray" }}>
            <b>SMS</b>
          </Card.Text>
          {props.plan.smsRule ? (
            <Card.Text>
              <b>
                {props.plan.smsRule.allowance} SMS
                {props.subscription != undefined &&
                props.subscription.type == "POSTPAID"
                  ? ""
                  : props.plan.smsRule.validity > 1
                  ? " / " + props.plan.smsRule.validity + " Days"
                  : " Per Day"}
              </b>
            </Card.Text>
          ) : (
            <Card.Text>
              <b> ----</b>
            </Card.Text>
          )}
        </div>
        <div
          style={{ textAlign: "left", float: "left", width: "16%" }}
          hidden={
            props.showAllColumn == undefined ||
            props.showAllColumn ||
            props.plan.callRule
              ? false
              : true
          }
        >
          <Card.Text style={{ color: "gray" }}>
            <b>Calls</b>
          </Card.Text>
          {props.plan.callRule ? (
            <Card.Text>
              <b>
                {props.plan.callRule.allowance} Mins
                {props.subscription != undefined &&
                props.subscription.type == "POSTPAID"
                  ? ""
                  : props.plan.callRule.validity > 1
                  ? " / " + props.plan.callRule.validity + " Days"
                  : " Per Day"}
              </b>
            </Card.Text>
          ) : (
            <Card.Text>
              <b> ----</b>
            </Card.Text>
          )}
        </div>
        <div
          className="row px-0 justify-content-end text-right"
          style={{ textAlign: "right", float: "right", width: "18%" }}
        >
          <div className="col-lg-7 col-md-8 col-12 my-1 px-0">
            <button
              className="col-lg-12 col-md-12 col-12"
              style={{
                backgroundColor: "#4481EB",
                borderColor: "#4481EB",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={() => {
                props.setSelectedPlan(props.plan);
                props.setShowDetails(true);
                props.setShowModal(true);
              }}
            >
              Details
            </button>
          </div>
          {props.isAdmin ? (
            props.plan.status === "RETIRED" ? (
              <div className="my-0 py-0"></div>
            ) : (
              <ButtonPopover
                plan={props.plan}
                setSelectedPlan={props.setSelectedPlan}
                setShowCreateForm={props.setShowCreateForm}
                setShowDetails={props.setShowDetails}
                setShowModal={props.setShowModal}
                setRefreshList={props.setRefreshList}
              />
            )
          ) : (
            <div className="my-0 py-0"></div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
