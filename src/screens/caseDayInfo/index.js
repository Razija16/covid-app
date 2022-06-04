import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header'
import UserApi from "../../api/user"
import UserContext from "../../context"
import { formateDate, whichType } from "../../utils/dateFunctions"
import { useNavigate } from "react-router-dom";
import backImg from "../../assets/images/back.png"
import Day from "../../assets/images/day.png"
import Time from "../../assets/images/time.png"
import Risk from "../../assets/images/risk.png"
import Temp from "../../assets/images/temp.png"

const caseDayInfo = () => {
  const { user, setUser } = useContext(UserContext)
  const [correctDate, setCorrectDate] = useState(null)
  const [data, setData] = useState(null)
  const params = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {

    console.log("DATA:", data)
    if (data?.CaseDay?.createdAt)
      setCorrectDate(new Date(+data.CaseDay.createdAt))

  }, [data])

  useEffect(() => {

    const makeRequest = async () => {
      console.log("Request")
      try {
        const result = await UserApi.getCaseDay(params.id);
        console.log(result)
        const final_data = await result.json();
        console.log(final_data)
        setData(final_data)


      } catch (err) {
        console.log("ERROR! Check server and database.")
        console.log(err)
      }
    }
    makeRequest();

  }, [])
  return (
    <div className='screen case-day-screen'>
      <Header name={`${user.first_name} ` + ` ` + `${user.last_name}`} />

      <div className="subheader">
        <div className="back-button" onClick={() => { navigate(`/user-profile`) }}>
          <img src={backImg} alt="Back" />
        </div>
        <div className="title">
          CASE DAY
        </div>
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
            {whichType(data?.CaseDay.alert_type)}
          </div>
        </div>
        <div className="temperature">
          <div className="img-container">
            <img src={Temp} alt="TemperatureImg" />
          </div>
          <div className="content">
            {data?.CaseDay.temperature}°C
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
              return <div className="symptom">{symptom.name}</div>
            }) : <h2>NO SYMPTOMS THIS DAY</h2>
          }
        </div>
      </div>
    </div >
  )
}

export default caseDayInfo