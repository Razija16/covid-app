import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header'
import backImg from "../../assets/images/back.png"
import { formateDate, whichType } from "../../utils/dateFunctions"
import UserContext from "../../context"
import UserApi from "../../api/user"
import Day from "../../assets/images/day.png"
import Time from "../../assets/images/time.png"
import Risk from "../../assets/images/risk.png"
import Team from "../../assets/images/team.png"


const InterventionsInfo = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const params = useParams();
  console.log(params)
  const navigate = useNavigate();
  const [correctDate, setCorrectDate] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {

    if (data?.Intervention?.createdAt)
      setCorrectDate(new Date(+data.Intervention.createdAt))

  }, [data])

  useEffect(() => {

    const makeRequest = async () => {
      try {
        const result = await UserApi.getIntervention(params.id, params.casedayId);
        const final_data = await result.json();
        setData(final_data)


      } catch (err) {
        console.log("ERROR! Check server and database.")
        console.log(err)
      }
    }
    makeRequest();

  }, [])

  return (
    <div className='screen intervention-info-screen'>
      <Header name={`${currentUser?.first_name} ` + ` ` + `${currentUser?.last_name}`} />
      <div className="subheader">
        <div className="back-button" onClick={() => { navigate(`/user-profile`) }}>
          <img src={backImg} alt="Back" />
        </div>
        <div className="title">
          Intervention
        </div>
        <div className="empty"></div>
      </div>

      <div className="info-container">
        <div className="date">
          <div className="img-container">
            <img src={Day} alt="calendarImg" />
          </div>
          <div className="content">
            {correctDate && formateDate(correctDate)}
          </div>

        </div>
        <div className="time">
          <div className="img-container">
            <img src={Time} alt="calendarImg" />
          </div>
          <div className="content">
            {correctDate?.getHours()} H

          </div>
        </div>
        <div className="alert_type">
          <div className="img-container">
            <img src={Risk} alt="riskImg" />
          </div>
          <div className="content">
            {whichType(data?.Intervention?.alert_type)}
          </div>
        </div>
        <div className="team">
          <div className="img-container">
          <img src={Team} alt="riskImg" />
          </div>
          <div className="content">
            {data?.Intervention?.interventionteam?.name ? data?.Intervention?.interventionteam?.name : "Unassigned"}
          </div>
        </div>
      </div>

      <div className="symptoms">
        <div className="text">
          Symptoms
        </div>

        <div className="symptoms-container">
          {
            data?.Symptoms?.length>0 ? data?.Symptoms.map((symptom, key) => {
              return <div className="symptom" key={key}>{symptom.name}</div>
            }) : "NO SYMPTOMS IN THIS INTERVENTION"
          }
        </div>
          <div className="report-header">
            Report
          </div>
        <div className="report">
          {data?.Intervention?.report ? data?.Intervention?.report : "No Report"}
        </div>
      </div>
    </div>
  )
}

export default InterventionsInfo