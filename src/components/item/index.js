import React from 'react'

//props
    //img
    //name
    //desc

const Item = (props) => {
    return (
        <div className='item-wrapper' onClick={props?.onClick}>
            <div className="img-wrapper">
                <img src={props?.img} />
            </div>
            <div className="item">
                <div className="item-name">{props.name}</div>
                <div className="item-desc" style={props.style}>{props.desc}</div>
            </div>
        </div>
    )
}

export default Item