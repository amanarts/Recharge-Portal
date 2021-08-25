import React from 'react'
import '../css/plan.css'
import SubscriptionList from './subscriptionList';

export default function SubscriptionHistory(props) {
    return (
        <div style={{ paddingBottom: "100px" }}>
            <div className="row mb-2">
                <div className="col-lg-9 col-md-9 col-8 px-auto">
                    <b><h1 style={{ marginLeft: '5%', marginTop: '10px' }}>Subscription History</h1></b>
                </div>
            </div>
            <SubscriptionList />
        </div>
    )
}
