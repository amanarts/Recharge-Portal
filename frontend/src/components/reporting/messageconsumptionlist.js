import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { floatConvert } from '../../utils';

export default function MessageConsumptionList(props) {
    const [messageConsumption, setMessageConsumption] = useState([{
        consumed: "50.00 MB",
        mobile: "+91 9654821546",
        amountCharged: "Rs. 0.00",
        createdAtTime: "5:10 pm",
        createdAtDate: "Today",
        typeId: 3
    }]);

    const [dateFilter, setDateFilter] = useState(props.date);
    useEffect(() => { setDateFilter(props.date) }, [props.date]);

    const queryFields = {
        userId: "2gzx1kias9zj5laineo0s5qg",
        typeId: 3,
        from: dateFilter.from + "T00:00:00",
        to: dateFilter.to + "T00:00:00"
    }

    useEffect(() => {
        const url = process.env.REACT_APP_TRANSACTION_SERVICE_URL + `/consumer/${queryFields.typeId}/${queryFields.userId}?from=${queryFields.from}&to=${queryFields.to}`;
        axios.get(url)
            .then(res => {
                setMessageConsumption(res.data)
            });
    }, [dateFilter])
    return (
        <div>
            <div className="list-group">
                {
                    messageConsumption.map((m, i) => {
                        return <div className="list-group-item list-group-item-action" key={i}>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex w-100 justify-content-between">
                                    {m.typeId === 4 ?
                                        <h2><i class="fas fa-envelope"></i><i className="fas fa-arrow-right fa-xs"></i></h2> :
                                        <h2><i class="fas fa-envelope"></i><i className="fas fa-arrow-left fa-xs"></i></h2>
                                    }
                                    <h5 className="mb-1">+91 {m.mobile}</h5>
                                    <h5>₹ {floatConvert(m.amountCharged)}</h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex w-100 justify-content-between">
                                    <small>{m.createdAtDate}</small>
                                    <small id="message time">{m.createdAtTime}</small>
                                    <small>Total: {m.consumed}</small>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
