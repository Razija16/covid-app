import React, { useEffect, useState, useContext } from 'react'
import AdminApi from "../../../api/admin"
import UserContext from "../../../context"
import { useNavigate } from "react-router-dom";
import { whichType } from '../../../utils/dateFunctions';
import Item from '../../../components/item';
import Medical from "../../../assets/images/medical.png"

const AdminIntervention = () => {
    const [active, setActive] = useState('0')
    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {

        setData([])
        const makeRequest = async () => {
            try {
                const req = await AdminApi.getInterventions(active);
                const final_data = await req.json();
                console.log(req)
                console.log(final_data)
                setData(final_data)
            } catch (err) {
                console.log("ERROR!")
                console.log(err)
            }
        }
        makeRequest(active);

    }, [active])

    return (
        <div className='interventions-wrapper'>
            <div className="filter">
                <div className="first">
                    <input type="radio"
                        value={"0"}
                        checked={active === "0"}
                        onChange={() => {
                            setActive("0")
                        }}
                    />
                    <div className="label" style={{ color: "#00BA00" }}>
                        Active
                    </div>
                </div>
                <div className="first">
                    <input type="radio"
                        value={"1"}
                        checked={active === "1"}
                        onChange={() => {
                            setActive("1")
                        }}
                    />
                    <div className="label" style={{ color: "#F35656" }}>
                        Done
                    </div>
                </div>
            </div>
            {data?.map((intervention, key) => {
                return <Item
                    img={Medical}
                    name={`Intervention ${intervention?.id}`}
                    desc={whichType(intervention?.alert_type)}
                    onClick={() => { navigate(`/admin/intervention/${intervention?.id}/${intervention?.userId}`) }}
                    circleActive={active}
                    key={key}
                />
            })}

        </div >
    )
}

export default AdminIntervention