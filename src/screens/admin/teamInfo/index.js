import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminApi from '../../../api/admin'
import UserImg from "../../../assets/images/user-basic.png"
import Email from "../../../assets/images/email.png"
import Time from "../../../assets/images/time.png"
import backImg from "../../../assets/images/back.png"
import Risk from "../../../assets/images/risk.png"
import Team from "../../../assets/images/team.png"
import DeleteImg from "../../../assets/images/delete.png"
import Header from "../../../components/header/index"
import InfoItem from '../../../components/infoItem'
import { whichType } from '../../../utils/dateFunctions'
import X from "../../../assets/images/x.png"

const TeamInfo = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState({
        first_name: "",
        last_name: "",
        interventionteamId: null
    })
    useEffect(() => {

        const makeReq = async () => {
            try {
                const res = await AdminApi.getTeam(params.id)
                console.log(res)
                const final_data = await res.json()
                console.log(final_data)
                setData(final_data)
                setModalData((modalData) => {
                    return { ...modalData, interventionteamId: final_data.id }
                })

            } catch (err) {
                console.log("error")
                console.log(err)
            }
        }
        makeReq()

    }, [])

    const [data, setData] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    return (
        <div className='screen team-info'>
            <div className="subheader">
                <div className="back-button" onClick={() => { navigate(-1) }}>
                    <img src={backImg} alt="Back" />
                </div>
                <div className="title">
                    Team Info
                </div>
                <div className="empty"></div>
            </div>

            <InfoItem
                img={Team}
                label="Team Name"
                value={data?.name}
            />
            <InfoItem
                img={Risk}
                label="Alert Type"
                value={whichType(data?.alert_type)}
            />

            <h2>Team Members</h2>
            {data?.inteverntionteammembers?.length < 1 && <h3>0 Members in this team</h3>}
            {data?.inteverntionteammembers.map((member) => {
                return <div className='member-wrapper' key={member.id}>
                    <div className='member'>
                        {member.first_name + " " + member.last_name}
                    </div>
                    <img
                        src={DeleteImg}
                        className="delete-img"
                        onClick={async () => {
                            const res = await AdminApi.deleteTeamMember(member.id);
                            if (res.ok) {
                                navigate(0)
                            }
                        }}
                    />
                </div>
            })}
            <div
                className="button"
                style={{
                    backgroundColor: "#717FFB",
                    marginTop: "20px"
                }}
                onClick={() => {
                    setModal(true);
                }}
            >
                Add members
            </div>
            <div className="button"
                style={{
                    backgroundColor: "#EB5757",
                    marginTop: "20px"
                }}
                onClick={async () => {
                    console.log("brisem");
                    const res = await AdminApi.deleteTeam(data.id)
                    const req = await res.json();
                    console.log(req)
                    if (res.ok)
                        navigate(-1)

                }}>
                Delete Team
            </div>
            {modal &&
                <div className='backdrop'>
                    <div className="modal">
                        <img src={X} className="exit" onClick={() => setModal(false)} />
                        <div className="modal-header">
                            Fill out team member info.
                        </div>
                        {errorMessage && <div className='error'>{errorMessage}</div>}

                        <div className="label">
                            First Name
                        </div>
                        <input type="text"
                            className='covid-name-input'
                            onChange={(event) => {
                                setModalData((modalData) => { return { ...modalData, first_name: event.target.value } })
                            }}
                        />
                        <div className="label">
                            Last Name
                        </div>
                        <input type="text"
                            className='covid-name-input'
                            onChange={(event) => {
                                setModalData((modalData) => { return { ...modalData, last_name: event.target.value } })
                            }}
                        />

                        <button
                            className='button'
                            style={{ backgroundColor: "#717FFB" }}
                            onClick={async () => {
                                if (modalData.first_name == "" || modalData.last_name == "") {
                                    setErrorMessage("Please fill out input fields");
                                    return;
                                }
                                console.log(modalData);
                                try {
                                    const res = await AdminApi.addMember(modalData)
                                    if (res.ok) {
                                        navigate(0)
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Add member</button>
                    </div>
                </div>}

        </div>
    )
}

export default TeamInfo