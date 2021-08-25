import React from "react";
import Footer from "../footer";
import NavBar from "../navBar";
import PlanList from "./planList";
import "../css/plan.css";
import CustomerActivePlans from "./customerActivePlans";
import ConsumptionDetails from "./consumptionDetails";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <NavBar />
      <PlanList />
      <Footer />
    </div>
  );
}
