import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import ConsumptionDetailsCard from "./consumptionDetailsCard";
import axios from "axios";

export default function ConsumptionDetails() {
  const [consumptionDetailsList, setConsumptionDetailsList] = useState([]);
  useEffect(() => {
    const promise = axios.get(
      process.env.REACT_APP_PLAN_SERVER_URL +
      "/plan-management/plan/consumptionDetails/userId1"
    );
    promise.then((response) => {
      console.log(response.data);
      setConsumptionDetailsList(response.data);
    });
  }, []);
  return (
    <div>
      <div
        style={{
          background: "#E6ECF6",
          margin: "20px",
          padding: "5px",
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            flexWrap: "wrap",
          }}
        >
          {consumptionDetailsList.map((consumptionDetails) => {
            if (consumptionDetails.subscriptionStatus == "ACTIVE") {
              return (
                <div className="col-md-6 col-lg-6 col-12 p-0">
                  <ConsumptionDetailsCard
                    consumptionDetails={consumptionDetails}
                  />
                </div>

              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
