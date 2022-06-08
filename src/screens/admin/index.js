import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserIcon from "../../assets/images/user.png"
import Phone from "../../assets/images/phone.png"
import Team from "../../assets/images/team.png"
import Header from '../../components/header'

const AdminPanel = () => {
    const [active, setActive] = useState(1)

    return (
        <div className='screen admin-panel'>

            <Header name="Admin Panel" />
            <div className="pages">
                <Outlet />
            </div>
            <div className="navbar">
                <Link
                    className={`link ${active === 1 ? 'active' : ''}`}
                    onClick={() => { setActive(1) }}
                    to="/admin"
                >
                    <img className='admin-img' src={UserIcon} />
                </Link>
                <Link
                    className={`link ${active === 2 ? 'active' : ''}`}
                    onClick={() => { setActive(2) }}
                    to="/admin/intervention"
                >
                    <img className='admin-img' src={Phone} />
                </Link>
                <Link
                    className={`link ${active === 3 ? 'active' : ''}`}
                    onClick={() => { setActive(3) }}
                    to="/admin/team"
                >
                    <img className='admin-img' src={Team} />
                </Link>
            </div>
        </div>
    )
}

export default AdminPanel