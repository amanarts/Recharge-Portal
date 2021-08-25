import { Card, Modal } from "react-bootstrap";
import React, { useState } from "react";
import ViewPlan from "./viewPlan";
export default function ConsumptionDetailsCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Card
      style={{
        background: "#1C2237",
        borderRadius: "40px",
        width: "90%",
        marginBottom: "10px",
      }}
      text="white"
      className="plan-card"
    >
      <Card.Body>
        <div
          style={{
            height: "10vh",
          }}
        >
          <div
            style={{
              display: "inline-block",
              textAlign: "center",
              width: "50%",
            }}
          >
            {props.consumptionDetails.plan.callRule != null ? (
              props.consumptionDetails.plan.callRule.validity == 1 ? (
                <div>
                  <b style={{ fontSize: "170%" }}>
                    {props.consumptionDetails.currentConsumption}mins
                  </b>
                  <br />
                  <b style={{ fontSize: "90%" }}>
                    left of {props.consumptionDetails.plan.callRule.allowance}
                    mins per day
                  </b>
                  <br />
                </div>
              ) : (
                <div>
                  <b style={{ fontSize: "170%" }}>
                    {props.consumptionDetails.currentConsumption}mins
                  </b>
                  <br />
                  <b style={{ fontSize: "90%" }}>
                    left of {props.consumptionDetails.plan.callRule.allowance}
                    mins
                  </b>
                  <br />
                </div>
              )
            ) : props.consumptionDetails.plan.dataRule ? (
              props.consumptionDetails.plan.dataRule.validity == 1 ? (
                <div>
                  <b style={{ fontSize: "170%" }}>
                    {props.consumptionDetails.currentConsumption}GB
                  </b>
                  <br />
                  <b style={{ fontSize: "90%" }}>
                    left of {props.consumptionDetails.plan.dataRule.allowance}
                    GB per day
                  </b>
                  <br />
                </div>
              ) : (
                <div>
                  <b style={{ fontSize: "170%" }}>
                    {props.consumptionDetails.currentConsumption}GB
                  </b>
                  <br />
                  <b style={{ fontSize: "90%" }}>
                    left of {props.consumptionDetails.plan.dataRule.allowance}
                    GB
                  </b>
                  <br />
                </div>
              )
            ) : props.consumptionDetails.plan.smsRule ? (
              props.consumptionDetails.plan.smsRule.validity == 1 ? (
                <div>
                  <b style={{ fontSize: "170%" }}>
                    {props.consumptionDetails.currentConsumption} sms
                  </b>
                  <br />
                  <b style={{ fontSize: "90%" }}>
                    left of {props.consumptionDetails.plan.smsRule.allowance}
                    sms per day
                  </b>
                  <br />
                </div>
              ) : (
                <div>
                  <b style={{ fontSize: "170%" }}>
                    {props.consumptionDetails.currentConsumption} sms
                  </b>
                  <br />
                  <b style={{ fontSize: "90%" }}>
                    left of {props.consumptionDetails.plan.smsRule.allowance}
                    sms
                  </b>
                  <br />
                </div>
              )
            ) : (
              <div>
                <b style={{ fontSize: "170%" }}>
                  {props.consumptionDetails.currentConsumption}days
                </b>
                <br />
                <b style={{ fontSize: "90%" }}>
                  left of {props.consumptionDetails.plan.ottRule.validity} days
                </b>
                <br />
              </div>
            )}
            <div
              style={{
                display: "inline-block",
                fontSize: "90%",
              }}
            >
              Pack valid till {props.consumptionDetails.lastDate}
            </div>
          </div>
          <div
            style={{
              display: "inline-block",
              float: "right",
              width: "50%",
              textAlign: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                background: "#E6ECF6",
                color: "#1C2237",
                borderRadius: "40px",
                textAlign: "center",
                height: "65%",
              }}
            >
              <b
                style={{
                  fontSize: "170%",
                  position: "relative",
                  top: "20%",
                  bottom: "8%",
                }}
              >
                {props.consumptionDetails.plan.name}
              </b>
            </div>
            <button
              style={{
                display: "inline-block",
                fontSize: "90%",
                textDecoration: "underline",
                background: "none",
                border: "none",
                color: "white",
              }}
              onClick={() => {
                setShowModal(true);
                setShowDetails(true);
              }}
            >
              Pack details
            </button>
          </div>
        </div>
      </Card.Body>
      <Modal
        size={showDetails ? "md" : "lg"}
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Body className="pt-0 px-0">
          <ViewPlan
            handleCloseModal={handleCloseModal}
            plan={props.consumptionDetails.plan}
          />
        </Modal.Body>
      </Modal>
    </Card>
  );
}
