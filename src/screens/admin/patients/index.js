import React, { useState, useEffect } from 'react'
import Header from '../../../components/header'
import { useNavigate } from 'react-router-dom'
import UserIcon from "../../../assets/images/user.png"
import Phone from "../../../assets/images/phone.png"
import Team from "../../../assets/images/team.png"
import AdminApi from "../../../api/admin"
import Item from "../../../components/item"

const AdminPatients = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {

        const makeReq = async () => {
            try {
                const req = await (await AdminApi.getUsers()).json()
                setData(req)
            } catch (err) {
                console.log(err)
            }
        }
        makeReq()
    }, [])

    return (
        <div className='patients-wrapper'>
            {data.map(user => {
                return <Item
                    img={UserIcon}
                    name={user.first_name + " " + user.last_name}
                    desc="Patient"
                    id={user.id}
                    onClick={() => { navigate(`/admin/patient/${user.id}`) }}
                    style={{ color: "#48BA16" }}
                />
            })}
        </div>
    )
}

export default AdminPatients