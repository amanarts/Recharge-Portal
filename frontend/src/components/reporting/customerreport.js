import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import CallsConsumptionList from './callsconsumptionlist';
import DataConsumptionList from './dataconsumptionlist';
import MessageConsumptionList from './messageconsumptionlist';
import '../css/reporting.css'

export default function CustomerReport() {
    const [toggleTab,setToggleTab] = useState(1);
    const [dateFilter,setDateFilter] = useState({from: "2020-08-14" ,to: "2022-02-14"});
    const FileDownload = require('js-file-download');
    const alert = useAlert();
    const userId = "ecq11cmgl8k2hk3pg11yagd1";
    const toggleTabHandler = (index) => {
        setToggleTab(index);
      };
    const handleDateChange = (event)=> {
        const updateDate = {...dateFilter,[event.target.name]:event.target.value};
        setDateFilter(updateDate);
    }
    const downloadFile =(userId) => {
        const promise = axios({
          url: process.env.REACT_APP_BACKEND_URL_FILE_REQUEST+"/download/"+userId+".xlsx",
          methodo:'GET',
          responseType:'blob'});
        promise.then(response => {
          FileDownload(response.data,"usage-report.xlsx");
        });
        promise.catch((error) => {
            console.log("No files found");
            alert.show("No files found. Upload attachments")
        })
        console.log('uFile downloaded');
      };
    return (
        <div id="outer-container">
        <div id="consumer-report-page" className="container">
            <h5 id="pageHeader" className="display-6">Usage Details</h5>
            <div id="filterDiv" className="container">
            <div id="labelDiv">
                    <span id="labelFrom">From</span>
                    <span id="labelTo">To</span>
                    <span id="labelDownload">Download</span>
            </div>
            <div>
                <div id='datetimepicker1' className="form-group">
                    <div className='input-group date' >
                        <input  type='date' className="form-control" max={dateFilter.to} value={dateFilter.from} onChange={handleDateChange} name='from'/>
                    </div>
                </div>
                <div id='datetimepicker2' className="form-group">
                    <div className='input-group date' >
                        <input  type='date' className="form-control" min={dateFilter.from} value={dateFilter.to} onChange={handleDateChange} name='to' />
                    </div>
                </div> 
                <div  id='downloadButton'className="form-group">
                    <button type="button" className="btn btn-light" onClick={() => downloadFile(userId)}>
                        <i className="fa fa-download"></i>
                    </button>
                </div> 
            </div>
            </div>
            <nav id="navtab" className="nav nav-pills flex-column flex-sm-row" >
                <button id="data" className={toggleTab===1 ?"flex-sm-fill text-sm-center nav-link active":"flex-sm-fill text-sm-center nav-link"} 
                 onClick={() => toggleTabHandler(1)}>
                     Data
                </button>
                <button id="calls" className={toggleTab===2 ?"flex-sm-fill text-sm-center nav-link active":"flex-sm-fill text-sm-center nav-link"} 
                onClick={() => toggleTabHandler(2)} >
                    Calls
                </button>
                <button id="messages" className={toggleTab===3 ?"flex-sm-fill text-sm-center nav-link active":"flex-sm-fill text-sm-center nav-link"} 
                onClick={() => toggleTabHandler(3)} >
                    Messages
                </button>
                <button id="ott" className={toggleTab===4 ?"flex-sm-fill text-sm-center nav-link active":"flex-sm-fill text-sm-center nav-link"} 
                onClick={() => toggleTabHandler(4)}>
                    OTT
                </button>
            </nav>
            <div id="listConsumption" className="content-tabs">
                {toggleTab === 1 ?<div className={"content"} ><DataConsumptionList date={dateFilter}/></div> : null}
                {toggleTab === 2 ?<div className={"content"} ><CallsConsumptionList date={dateFilter}/></div> : null}
                {toggleTab === 3 ?<div className={"content"} ><MessageConsumptionList date={dateFilter}/></div> : null}
                {toggleTab === 4 ?<div className={"content"} ></div> : null}
            </div>
        </div>
    </div>
    )
}
