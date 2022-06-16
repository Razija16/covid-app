import React from 'react'
import Day from "../../assets/images/day.png"
import { formateDate, whichType } from "../../utils/dateFunctions.js";

/*
    props:
        //Case Day
        -createdAt:(date)
            used for displaying date of Card
        -alert_type:(date)
            displaying alert type
        -symptoms:(array)
            array of symptoms for that day
        -temperature={Card.temperature}
            temperature of the Card
        -img:(img)
            displaying icon in card


        //Interventions
        -createdAt:(date)
            used for displaying date of Card
        -name:(string)
            Covid team name-displaying
        -employes:(array)
            array of employes for that covid team
        -img:(img)
            displaying icon in card
        --handled(bool)
            if intervnetion is handled
*/

const Card = (props) => {
    const date = new Date(+props.createdAt);
    return (
        <div className='card-day' onClick={props?.onClick}>
            <div className="card-img">
                <img src={props.img} alt="img" />
            </div>
            <div className="card-info">
                <div className="date-container">
                    <span className="date">{formateDate(date)}</span>
                    <span className="time">{date.getHours()}h</span>
                </div>
                <div className="day">
                    {date.toLocaleDateString('en-US', {
                        weekday: 'long',
                    })}
                </div>
                {props.alert_type ? whichType(props.alert_type) : props?.team && <div className='team-name'> {props.team}</div>}
                {props.handled===false && <div className='team-name'>Pending...</div>}
            </div>
        </div>
    )
}

export default Card