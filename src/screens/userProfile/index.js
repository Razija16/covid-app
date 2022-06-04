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
  const [interventions, setInterventions] = useState([])
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {

    const makeRequest = async () => {
      try {
        const result = await UserApi.getProfileInfo(user.user_id);
        const data = await result.json();
        console.log("DATA", data)

        if (data?.Case?.id)
          setUser((user) => {
            return {
              ...user,
              caseId: data.Case.id
            }
          })
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

    //fetching to backend 
    makeRequest();

  }, [])

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
      console.log(data)
      return <Card
        createdAt={data.createdAt}
        team={data.interventionteam.name}
        img={Medical}
        onClick={() => { navigate(`/intervention/${data.id}/${data.casedayId}`) }}
        key={key}
      />
    })
  }

  return (
    <div className='screen user-profile-screen'>
      <Header name={`${user.first_name} ` + ` ` + `${user.last_name}`} />

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
      <button className='button' onClick={() => {
        //navigate to symptoms forms
        navigate("/form")
      }}>Fill Symptom Form</button>

    </div>
  )
}

export default UserProfile