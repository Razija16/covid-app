import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import UserIcon from "../../assets/images/user.png"
import Phone from "../../assets/images/phone.png"
import Team from "../../assets/images/team.png"
import Header from '../../components/header'
import UserContext from '../../context'

const AdminPanel = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [active, setActive] = useState(null)
    const { currentUser } = useContext(UserContext)
    if (currentUser?.is_admin === false || !localStorage.getItem('token')) {
        navigate('/login')
    }
    useEffect(() => {

        switch (location.pathname) {
            case '/admin':
                setActive(1)
                break;
            case '/admin/intervention':
                setActive(2)
                break;
            case '/admin/team':
                setActive(3)
                break;

            default:
                break;
        }
        return () => {
            setActive(null)
        }
    }, [location.pathname])


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