import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminApi from '../../../api/admin'
import UserImg from "../../../assets/images/user-basic.png"
import Email from "../../../assets/images/email.png"
import Time from "../../../assets/images/time.png"
import backImg from "../../../assets/images/back.png"
import Header from "../../../components/header/index"
import InfoItem from '../../../components/infoItem'

const PatientInfo = () => {
    const navigate = useNavigate()
    const params = useParams();
    useEffect(() => {

        const makeReq = async () => {
            try {
                const res = await (await AdminApi.getUser(params.id)).json();
                console.log(res)
                setData(res);
            } catch (err) {
                console.log(err)
            }
        }
        makeReq()

    }, [])

    const [data, setData] = useState(null)

    return (
        <div className='patient-info-wrapper'>
            <div className="subheader">
                <div className="back-button" onClick={() => { navigate(-1) }}>
                    <img src={backImg} alt="Back" />
                </div>
                <div className="title">
                    Patient Info
                </div>
                <div className="empty"></div>
            </div>

            <InfoItem
                img={UserImg}
                label="First Name & Last Name"
                value={data?.first_name + " " + data?.last_name}
            />
            <InfoItem
                img={Email}
                label="Email"
                value={data?.email}
            />
            <InfoItem
                img={UserImg}
                label="createdAt"
                value={data?.createdAt && new Date(+data.createdAt).toLocaleDateString()}
            />

            <div className="button delete"
                onClick={async() => {
                    try {
                        const req=await AdminApi.deleteUser(data.id);
                        if(req.ok){
                            navigate(-1);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }}>
                Delete User
            </div>

        </div>
    )
}

export default PatientInfo