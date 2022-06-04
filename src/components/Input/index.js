import React, { useState } from 'react'


/* 
show state- if true showing password only for input type "password" 
    props:
        -type(string)
            input type
        -placeholder(string)
            placeholder for input
        -error(react-hook-form error)
            displaying error if there is one 
*/

const Input = (props) => {

    const [show, setShow] = useState(false);

    return (
        <>
            {props.error && <div className='error'>{props.error.message}</div>}
            <div className='input'>
                <input
                    type={props.type === "password" ? show ? "text" : "password" : props.type}
                    placeholder={props.placeholder}
                    {...props.register}
                />
                {
                    props.type === "password" &&
                    <div className='password-show'
                        onClick={() => setShow((show) => { return !show })}>
                        {show ? "Hide" : "Show"}
                    </div>
                }
            </div>
        </>
    )
}

export default Input;