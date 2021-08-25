import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { floatConvert } from '../../utils';

export default function DataConsumptionList(props) {
    const [dataConsumption, setDataConsumption] = useState([{
        "consumed": 0,
        "amountCharged": "₹ 0.00",
        "createdAtDate": "2021-08-18",
        "createdAtTime": "05:02"
    }])

    const [dateFilter, setDateFilter] = useState(props.date);
    useEffect(() => { setDateFilter(props.date) }, [props.date]);

    const queryFields = {
        userId: "ecq11cmgl8k2hk3pg11yagd1",
        typeId: 0,
        from: dateFilter.from + "T00:00:00",
        to: dateFilter.to + "T00:00:00"
    }
    useEffect(async () => {
        const url = process.env.REACT_APP_TRANSACTION_SERVICE_URL + `/consumer/${queryFields.typeId}/${queryFields.userId}?from=${queryFields.from}&to=${queryFields.to}`;
        await axios.get(url)
            .then(res => {
                setDataConsumption(res.data)
            })
            .catch(err => console.log(err))
    }, [dateFilter])
    const dataFormat = (bytes)=> {
        if(bytes>2**30)
            return ((bytes/2**30).toFixed(2)).toString() + " MB";
        if(bytes>2**20)
            return ((bytes>2**20).toFixed(2)).toString() + " MB";
        if(bytes>2**10)
            return ((bytes>2**10).toFixed(2)).toString() + " KB";
    }
    return (
        <div>
            <div className="list-group">
                {
                    dataConsumption.map((d, i) => {
                        return <div className="list-group-item list-group-item-action" key={i}>
                            <div>
                                <div>
                                    <h2  id="upper-div"><i className="fas fa-globe"></i></h2>
                                    <h5  id="upper-div" className="mb-1">{dataFormat(d.consumed)}</h5>
                                    <h5 id="upper-div-right">₹ {floatConvert(d.amountCharged)}</h5>
                                </div>
                                <div>
                                    <small id="lower-div">{d.createdAtDate}</small>
                                    <small id="lower-div">Session started at {d.createdAtTime}</small>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
