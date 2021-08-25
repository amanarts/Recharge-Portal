import React, { useEffect, setState, useState } from 'react';
import axios from 'axios';
import { floatConvert } from '../../utils';

export default function CallsConsumptionList(props) {
    const [callConsumption, setCallConsumption] = useState([{
        consumed: "50.00 MB",
        mobile: "+91 9654821546",
        amountCharged: "Rs. 0.00",
        createdAtTime: "5:10 pm",
        createdAtDate: "Today",
        typeId: 2
    }]);
    const formatDuration = (sec)=> {
        let str=""
        if(sec/3600>0)
            // str = Math.floor(sec/3600) +" hr "
            sec=sec%3600
        str += Math.floor(sec/60) + " min "
        sec=sec%60
        str+= Math.floor(sec) + " sec"
        return str
    }
    const [dateFilter, setDateFilter] = useState(props.date);
    useEffect(() => { setDateFilter(props.date) }, [props.date]);
    const queryFields = {
        userId: "eby83hrat6mhn99gvtc8l6p4",
        typeId: 2,
        from: dateFilter.from + "T00:00:00",
        to: dateFilter.to + "T00:00:00"
    }
    useEffect(() => {
        const url = process.env.REACT_APP_TRANSACTION_SERVICE_URL + `/consumer/${queryFields.typeId}/${queryFields.userId}?from=${queryFields.from}&to=${queryFields.to}`;
        axios.get(url)
            .then(res => {
                setCallConsumption(res.data)
            });
    }, [dateFilter])
    return (
        <div>
            <div className="list-group">
                {
                    callConsumption.map((c, i) => {
                        return <div className="list-group-item list-group-item-action " key={i}>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex w-100 justify-content-between">
                                    {c.typeId === 2 ?
                                        <h2><i className="fas fa-phone-alt"></i> <i className="fas fa-arrow-left fa-xs"></i></h2> :
                                        <h2><i className="fas fa-phone-alt"></i> <i className="fas fa-arrow-right fa-xs"></i></h2>
                                    }
                                    <h5 className="mb-1">{c.mobile}</h5>
                                    <h5>₹ {floatConvert(c.amountCharged)}</h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex w-100 justify-content-between">
                                    <small>{c.createdAtDate}</small>
                                    <small>{c.createdAtTime}</small>
                                    <small>{formatDuration(c.consumed)}</small>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
