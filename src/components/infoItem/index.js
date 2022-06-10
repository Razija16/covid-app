import React from 'react'

//props
    //img
    //label
    //value


const InfoItem = (props) => {
    return (
        <div className='info-item'>
            <div className="img-wrapper">
                <img src={props?.img} />
            </div>
            <div className="flex-right">
                <div className="label">{props.label}</div>
                <div className="value">
                    {props.value}
                </div>
            </div>
        </div>
    )
}

export default InfoItem