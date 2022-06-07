import React, { useState } from 'react'
import Circle from "../../assets/images/circle.png"
import ActiveCircle from "../../assets/images/circle-active.png"


const Symptom = (props) => {
    const [active, setActive] = useState(() => {
        if (props.checked.includes(props.id))
            return true
        return false
    })
    return (
        <div className='symptom' onClick={() => {
            setActive(!active)
            if (props.checked.includes(props.id)) {
                props.setChecked((checked) => {
                    return checked.filter((item)=>{
                        return item!==props.id
                    })
                })
            } else {
                props.setChecked((checked) => {
                    return [...checked, props.id]
                })
            }
        }}>
            {props.name}
            <div className="circle" >
                <img src={active ? ActiveCircle : Circle} alt="circle" />
            </div>
        </div>
    )
}

export default Symptom