import React, { useState, useEffect, useContext } from 'react'
import Card from '../../components/card'
import Header from '../../components/header'
import Medical from '../../assets/images/medical.png'
import Day from '../../assets/images/day.png'
import { useNavigate } from "react-router-dom";
import UserContext from "../../context"
import UserApi from "../../api/user"

const UserProfile = () => {
  const navigate = useNavigate();
  //buttonToggle useState variable for displaying if it's
  const [buttonToggle, setButtonToggle] = useState(true);
  const [cases, setCases] = useState([])
  const [modal, setModal] = useState(false)
  const [interventions, setInterventions] = useState([])
  const { currentUser, setCurrentUser, logged } = useContext(UserContext)

  useEffect(() => {

    const makeRequest = async () => {
      try {
        const result = await UserApi.getProfileInfo(currentUser.user_id);
        const data = await result.json();
        if (data?.Case?.id)
          setCurrentUser((currentUser) => {
            return {
              ...currentUser,
              caseId: data.Case.id
            }
          })
        if (data?.button != null) {
          setCurrentUser((currentUser) => {
            return {
              ...currentUser,
              button: data.button
            }
          })
        }
        if (data?.IsolationDays?.isolation_days != null) {
          setCurrentUser((currentUser) => {
            return {
              ...currentUser,
              isolation_days: data.IsolationDays.isolation_days
            }
          })
        }
        //setting data to cases
        setCases(data.CaseDays)

        setInterventions(data.Interventions)

        //isolation days
        // ...
      } catch (err) {
        console.log("eror")
        console.log(err)
      }
    }

    //fetching to backend if logged
    if (logged)
      makeRequest();

  }, [logged])

  const renderCases = () => {

    return cases.map((data, key) => {
      return <Card
        createdAt={data.createdAt}
        alert_type={data.alert_type}
        img={Day}
        onClick={() => { navigate(`/case-day/${data.id}`) }}
        key={key}
      />
    })
  }

  const renderInterventions = () => {
    return interventions.map((data, key) => {
      return <Card
        createdAt={data.createdAt}
        team={data.interventionteam?.name}
        img={Medical}
        onClick={() => { navigate(`/intervention/${data.id}/${data.casedayId}`) }}
        key={key}
        handled={data.handled}
      />
    })
  }

  return (
    <div className='screen user-profile-screen'>
      <Header name={`${currentUser?.first_name} ` + ` ` + `${currentUser?.last_name}`} />
      <div className="quarantine">
        <div className="label">
          Days in quarantine left:
        </div>
        <div className="timer">
          {currentUser?.isolation_days}
        </div>
      </div>
      <div className="toggle-buttons">
        <button className={`left-button-toggle ${buttonToggle ? "active" : ""}`} onClick={() => { setButtonToggle(true) }}>Case Days</button>
        <button className={`right-button-toggle ${!buttonToggle ? "active" : ""}`} onClick={() => { setButtonToggle(false) }}>Intervention</button>
      </div>

      {buttonToggle ?
        <div className='cases'>
          {renderCases()}
        </div> :
        <div className='interventions'>
          {renderInterventions()}
        </div>
      }
      <button className='button'
        onClick={() => {
          //navigate to symptoms forms
          if (!currentUser?.button) {
            setModal(true)
            return;
          }
          navigate("/form")
        }}
        style={{
          backgroundColor: currentUser?.button ? "#5DB075" : "gray"
        }}
      // disabled={true}
      >Fill Symptom Form</button>

      {modal &&
        <div className='backdrop'>
          <div className="modal">
            <div className="label">
              You can fill out form every 6 hours!!
            </div>
            <button
              className='button'
              type="submit"
              onClick={() => {
                setModal(false)
              }}
            >
              OK
            </button>
          </div>
        </div>}
    </div >
  )
}

export default UserProfile