import React from 'react'
import LogoSmall from "../../assets/images/logo-small.png"

/* 
    props:
        -name:(string)
            for displaying name in header
*/



const Header = (props) => {
    return (
        <div className='header'>
            <div className="invisible"></div>
            <div className="info">
                <img src={LogoSmall} className="logo" />
                <div className='header-name'>{props.name}</div>
            </div>
            <div className="logout" onClick={()=>{console.log("Logout")}}>
                Logout
            </div>

        </div>
    )
}

export default Header