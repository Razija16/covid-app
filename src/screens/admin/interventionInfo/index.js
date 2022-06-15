import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminApi from '../../../api/admin'
import UserImg from "../../../assets/images/user-basic.png"
import Email from "../../../assets/images/email.png"
import Time from "../../../assets/images/time.png"
import backImg from "../../../assets/images/back.png"
import Header from "../../../components/header/index"
import Team from "../../../assets/images/team.png"
import Risk from "../../../assets/images/risk.png"
import InfoItem from '../../../components/infoItem'
import { formateDate, whichType } from '../../../utils/dateFunctions'
import X from "../../../assets/images/x.png"

const InterventionInfo = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [data, setData] = useState(null)
    const [covidTeams, setCovidTeams] = useState([])
    const [modal, setModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [modalData, setModalData] = useState(false)

    useEffect(() => {

        const makeReq = async () => {
            try {
                console.log();
                const res = await (await AdminApi.getIntervention(params.id, params.casedayId)).json();
                const teams = await (await AdminApi.getCovidTeams()).json();
                setCovidTeams(teams)
                setData(res);
            } catch (err) {
                console.log(err)
            }
        }
        makeReq()

    }, [])

    useEffect(() => {
        if (data?.interventions?.[0]?.id) {
            setModalData(modalData => {
                return { ...modalData, id: data?.interventions?.[0]?.id }
            })
        }

    }, [data])


    return (
        <div className='intervention-info-wrapper'>
            <div className="subheader">
                <div className="back-button" onClick={() => { navigate(-1) }}>
                    <img src={backImg} alt="Back" />
                </div>
                <div className="title">
                    Intervention
                </div>
                <div className="empty"></div>
            </div>

            <InfoItem
                img={UserImg}
                label="First Name & Last Name"
                value={data?.first_name + " " + data?.last_name}
            />
            <InfoItem
                img={Risk}
                label="Alert Type"
                value={whichType(data?.interventions?.[0].alert_type)}
            />
            <InfoItem
                img={Time}
                label="Created at"
                value={data?.interventions?.[0].createdAt &&
                    <>
                        {formateDate(new Date(+data.interventions[0].createdAt)) + " "}
                        {new Date(+data.interventions[0].createdAt).getHours() + ":"
                            + new Date(+data.interventions[0].createdAt).getMinutes()}
                    </>
                }
            />
            <InfoItem
                img={Team}
                label="Team Name"
                value={data?.interventions?.[0].interventionteam?.name ?? "Unassigned"}
            />
            {!data?.interventions?.[0].handled
                &&
                <div
                    className='button'
                    style={{ background: "#717FFB" }}
                    onClick={() => setModal(true)}
                >
                    Assign Team and Report
                </div>}

            <div className="button delete"
                onClick={async () => {
                    try {
                        const req = await AdminApi.deleteIntervention(data?.interventions?.[0].id)
                        if (req.ok) {
                            navigate(-1);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }}>
                Delete Intervention
            </div>

            {modal &&
                <div className='backdrop'>
                    <div className="modal">
                        <img src={X} className="exit" onClick={() => setModal(false)} />
                        <div className="modal-header">
                            Handling Intervention.
                        </div>
                        {errorMessage && <div className='error'>{errorMessage}</div>}
                        <div className="label">
                            Choose Covid Team:
                        </div>
                        <select
                            className='select'
                            defaultValue={"default"}
                            onChange={(ev) => {
                                setModalData(modalData => {
                                    return {
                                        ...modalData,
                                        interventionteamId: ev.target.value
                                    }
                                })
                            }}
                        >
                            <option value={"default"} disabled>
                                Choose a team
                            </option>
                            {covidTeams.map((team, key) => {
                                return <option
                                    value={team.id}
                                    key={key}
                                    style={team.alert_type == 1 ? { color: "red" } : { color: "#5162FA" }}
                                >
                                    {team.name}
                                </option>
                            })}
                        </select>
                        <div className="label">
                            Write Report:
                        </div>
                        <textarea
                            className='covid-name-input-area'
                            onChange={(ev) => {
                                setModalData((modalData) => {
                                    return {
                                        ...modalData,
                                        report: ev.target.value
                                    }
                                })
                            }}
                        />

                        <button
                            className='button'
                            style={{ backgroundColor: "#717FFB" }}
                            onClick={async () => {
                                if (!modalData?.interventionteamId) {
                                    setErrorMessage("Select team")
                                    return;
                                }
                                console.log(modalData?.report)
                                if (!modalData?.report || modalData?.report == "") {
                                    setErrorMessage("Write report")
                                    return;
                                }
                                setErrorMessage(null)
                                try {
                                    console.log(modalData);
                                    const res = await AdminApi.assignTeam(modalData)
                                    console.log(res);
                                    const final = await res.json()
                                    if (res.ok) {
                                        navigate(0)
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Save</button>
                    </div>
                </div>}


        </div>
    )
}

export default InterventionInfo