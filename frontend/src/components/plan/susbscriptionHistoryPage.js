import React from "react";
import Footer from "../footer";
import NavBar from "../navBar";
import "../css/plan.css";
import SubscriptionHistory from "./subscriptionHistory";

export default function SusbscriptionHistoryPage() {
  return (
    <div className="admin-dashboard">
      <NavBar />
      <SubscriptionHistory />
      <Footer />
    </div>
  );
}
