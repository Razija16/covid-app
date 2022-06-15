import React, { useContext } from 'react'
import LogoSmall from "../../assets/images/logo-small.png"
import UserContext from '../../context';
/* 
    props:
        -name:(string)
            for displaying name in header
*/



const Header = (props) => {
    const { logout } = useContext(UserContext)
    return (
        <div className='header'>
            <div className="invisible"></div>
            <div className="info">
                <img src={LogoSmall} className="logo" />
                <div className='header-name'>{props.name}</div>
            </div>
            <div className="logout" onClick={() => {
                logout()
            }}>
                Logout
            </div>

        </div>
    )
}

export default Header