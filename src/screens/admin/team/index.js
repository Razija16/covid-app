import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AdminApi from "../../../api/admin"
import UserContext from "../../../context"
import { useNavigate } from "react-router-dom";
import { whichType } from '../../../utils/dateFunctions';
import Item from '../../../components/item';
import People from "../../../assets/images/people.png"
import Plus from "../../../assets/images/plus.png"
import X from "../../../assets/images/x.png"

const TeamList = () => {
  const [errorMessage, setErrorMessage] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const [modalData, setModalData] = useState({
    name: "",
    alert_type: '1'
  })
  const [correctDate, setCorrectDate] = useState(null)
  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {

    const makeRequest = async () => {
      try {
        const final_data = await (await AdminApi.getTeams()).json()
        setData(final_data)
      } catch (err) {
        console.log("ERROR! Check server and database.")
        console.log(err)
      }
    }
    makeRequest();

  }, [])

  useEffect(() => {

    console.log(modal)

  }, [modal])

  return (
    <div className='team-wrapper'>

      {data?.map((team, key) => {
        return <Item
          img={People}
          name={team.name}
          desc={whichType(team.alert_type)}
          onClick={() => { navigate(`/admin/team/${team.id}`) }}
          key={key}
        />
      })}

      <div className="circle-wrapper" onClick={() => {
        setModal(true);
      }}>
        <img src={Plus} />

        {modal &&
          <div className='backdrop'>
            <div className="modal">
              <img src={X} onClick={()=>navigate(0)} className="exit" />
              <div className="label">
                Covid Team Name:
              </div>
              {errorMessage &&
                <div className='error'>{errorMessage}</div>}
              <input type="text"
                className='covid-name-input'
                onChange={(event) => {
                  console.log("idem");
                  setModalData((modalData) => { return { ...modalData, name: event.target.value } })
                }}
              />
              <div className="label">
                What risk group is this Covid Team for?
              </div>

              <div className="options">
                <div className="first">
                  <input type="radio"
                    value={1}
                    checked={modalData.alert_type === '1'}
                    onChange={(event) => {
                      setModalData((modalData) => { return { ...modalData, alert_type: event.target.value } })
                    }}
                  />
                  {whichType(1)}
                </div>
                <div className="first">
                  <input type="radio"
                    value={2}
                    checked={modalData.alert_type === '2'}
                    onChange={(event) => {
                      setModalData((modalData) => { return { ...modalData, alert_type: event.target.value } })
                    }}
                  />
                  {whichType(2)}
                </div>

                <button
                  className='button'
                  style={{ backgroundColor: "#717FFB" }}
                  type="submit"
                  onClick={async () => {
                    if (modalData.name == "") {
                      setErrorMessage("Please fill out team name")
                      return;
                    }
                    const res = await AdminApi.createTeam(modalData)
                    const final = await res.json()

                    if (res.ok) {
                      navigate(0)
                    }
                  }}
                >
                  Create team
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div >
  )
}

export default TeamList