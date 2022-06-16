import React from 'react'
import greenCircle from "../../assets/images/green.png"
import redCircle from "../../assets/images/red.png"
//props
//img
//name
//desc
//circleActive (for intervention)

const Item = (props) => {
    return (
        <div className='item-wrapper' onClick={props?.onClick}>
            <div className="flex-1">
                <div className="img-wrapper">
                    <img src={props?.img} />
                </div>
                <div className="item">
                    <div className="item-name">{props?.name}</div>
                    <div className="item-desc" style={props?.style}>{props?.desc}</div>
                </div>
            </div>
            {props?.circleActive ? props.circleActive == 1
                ? <img src={redCircle} />
                : <img src={greenCircle} />
                : ""
            }
        </div>
    )
}

export default Item