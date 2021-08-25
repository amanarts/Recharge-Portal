import React from 'react'
import Registration from './auth/registration'
import ForgotPassword from './auth/forgotPassword'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Login from './auth/login';
import AdminDashboard from './plan/admindashboard';
import { isUserAdmin } from '../utils';
import Dashboard from './dashboard';
import CustomerReport from './reporting/customerreport';
import HomePage from './homepage/pages/homePage/homePage';


import ConsumptionDetailsPage from "./plan/consumptionDetailsPage";
import SusbscriptionHistoryPage from "./plan/susbscriptionHistoryPage";
export default function Home() {
    const loggedIn = JSON.parse(sessionStorage.getItem("user"));
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">

                        <HomePage ></HomePage>
                    </Route>
                    <Route path='/login'>
                        {loggedIn ? <Redirect to="/dashboard" component={Dashboard} /> : <Login></Login>}
                    </Route>

                    <Route path="/forgotpassword">
                        <ForgotPassword></ForgotPassword>
                    </Route>
                    
                    <Route path="/signup">
                        <Registration></Registration>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/plans" >
                        {isUserAdmin() ? <AdminDashboard /> : <Login />}
                    </Route>
                    <Route path="/consumer/usage">
                        <CustomerReport />
                    </Route>
                    <Route path="/consumptionDetails">
                        <ConsumptionDetailsPage />
                    </Route>
                    <Route path="/subscriptionHistory">
                        <SusbscriptionHistoryPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
