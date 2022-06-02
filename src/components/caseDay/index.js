import React from 'react'
import Day from "../../assets/images/day.png"
import {formateDate,whichType} from "./dateFunctions.js";



const CaseDay = (props) => {

    const date = new Date(props.created_at);

    return (
        <div className='case-day'>
            <div className="case-img">
                <img src={Day} />
            </div>
            <div className="case-info">
                <div className="date-container">
                    <span className="date">{formateDate(date)}</span>
                    <span className="time">{date.getHours()}h</span>
                </div>
                <div className="day">
                    {date.toLocaleDateString('en-US', {
                        weekday: 'long',
                    })}
                </div>
                {whichType(props.alert_type)}
            </div>
        </div>
    )
}

export default CaseDay