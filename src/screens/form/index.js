import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import FormApi from '../../api/form'
import Symptom from "../../components/symptom";
import UserContext from "../../context"
const Form = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const [data, setData] = useState([])
    const [level, setLevel] = useState(null)
    const [symptoms, setSymptoms] = useState([])
    const [checked, setChecked] = useState([])
    const [tempValue, setTempValue] = useState(37.5)
    const [modal, setModal] = useState(false)
    const [caseDayId, setCaseDayId] = useState(false)
    const risk_level = useRef(null);
    useEffect(() => {

        const makeRequest = async () => {
            try {
                const result = await FormApi.getSymptoms();
                const final_data = await result.json();
                console.log(final_data);
                setData(final_data)
                setLevel(1)
            } catch (err) {
                console.log("ERROR! Check server and database.")
                console.log(err)
            }
        }
        makeRequest();

    }, [])

    useEffect(() => {

        console.log(checked)

    }, [checked])

    const evaluateRisk = () => {
        //variable for evaluating risk level 
        let risk_level = null;

        for (let i = 0; i < checked.length; i++) {
            const id = checked[i];

            //checking if atleast 1 high risk symptom is checked first
            const highRisk = data.HighRisk.some((symptom) => {
                return id === symptom.id
            })

            if (highRisk) {
                risk_level = 1
                break;
            }
            //checking if atleast 1 medium risk symptom is checked first
            const mediumRisk = data.MediumRisk.some((symptom) => {
                return id === symptom.id
            })

            if (mediumRisk) {
                risk_level = 2
            }
        }
        return risk_level
    }
    useEffect(() => {
        //setting symptoms depending on each level
        switch (level) {
            case 1:
                setSymptoms(data.HighRisk)
                break;
            case 2:
                setSymptoms(data.MediumRisk)
                break;
            case 3:
                setSymptoms(data.LowRisk)
                break;
            case 4:
                setSymptoms([])
                break;
            default:
                break;
        }
    }, [level])

    return (
        <div className='screen form-screen'>
            <div className="form-header">
                <div className="back" onClick={() => {
                    if (level === 1)
                        navigate('/user-profile')
                    else
                        setLevel(level - 1)
                }}>
                    Back
                </div>
                <div className="risk">
                    {level === 1 ? "High Risk" : level === 2 ? "Medium Risk" : level === 3 ? "Low Risk" : level === 4 && "Temperature"}
                </div>
                <div className="empty"></div>
            </div>

            {level < 4 && <div className="form-subheader">Are you experiencing any of these symptoms?</div>}

            {level < 4 ? symptoms?.map((symptom) => {
                return <Symptom name={symptom.name} key={symptom.id} id={symptom.id} checked={checked} setChecked={setChecked} />
            }) :
                <div className="temp">
                    <div className="text">What is your current body temperature?</div>
                    <input type="range" min="34" max="41" value={tempValue} step="0.1" onChange={(ev) => { setTempValue(ev.target.value) }} />
                    <div className="temp-value" style={{
                        color: tempValue < 38 ? "#8CB3FF" : "#D64D4D"
                    }}>{tempValue}°C</div>
                </div>}

            <button className='button' onClick={async () => {
                if (level < 4)
                    setLevel(level + 1)
                else {
                    //evaluation
                    risk_level.current = evaluateRisk()
                    if (!risk_level.current) {
                        risk_level.current = 3;
                    }
                    //make caseDay with info.
                    const obj = {
                        user_id: user.user_id,
                        alert_type: risk_level.current,
                        temperature: tempValue,
                        caseId: user.caseId,
                        symptoms: checked
                    }
                    try {
                        const result = await (await FormApi.createCaseDay(obj)).json()
                        console.log("result:", result)
                        setModal(true);
                        // navigate('/user-profile')
                    } catch (err) {
                        console.log("error")
                        console.log(err);
                    }
                }
            }}>
                Next
            </button>
            {modal &&
                <div className="backdrop">
                    <div className="modal">
                        <div className="modal-header">
                            You are at a {risk_level.current === 1 ? "High" : risk_level.current === 2 ? "Medium" : "Low"} Risk!
                        </div>

                        <div className="modal-body">
                            {risk_level.current === 1 ? 'An intervention will automatically be made and a Covid Team will be assigned to you very soon.'
                                : risk_level.current === 2 ? `If you feel like your case is for an intervention press “Request Intervention”, if not then press “OK”. Stay at home and wait for your isolation to end.`
                                    : 'Your case is not dangerous at the moment. Stay at home and wait for your isolation to end.'}
                        </div>
                        
                        {risk_level.current === 2 && <div className="request">Request Intervention! </div>}

                        <button className="button" onClick={() => navigate('/user-profile')}>OK</button>
                    </div>
                </div>}
        </div >
    )
}

export default Form