import { createContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthApi from "../api/auth"

const UserContext = createContext({
    currentUser: undefined,
    setCurrentUser: () => { },
    logged: false,
    setLogged: () => { },
    logout: () => { }
});

export function UserContextProvider({ children }) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined)
    const [logged, setLogged] = useState(false)

    useEffect(() => {

        console.log("Current user:", currentUser);

    }, [currentUser])


    useEffect(() => {
        const makeReq = async () => {
            try {
                const req = await AuthApi.getCurrentUser();
                if (req.ok === true) {
                    const user = await req.json();
                    setCurrentUser({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        user_id: user.id,
                        is_admin: user.is_admin
                    })
                    setLogged(true);
                } else {
                    if (location.pathname.includes('signup') ||
                        location.pathname.includes('login')||
                            location.pathname.includes('admin'))
    return;
    navigate('/login')
}
            } catch (error) {
    console.log("log catch");
}
        }
makeReq()

    }, [])

const logout = () => {
    localStorage.removeItem("token")
    setCurrentUser(undefined)
    navigate('/login')
}

return <UserContext.Provider value={{
    currentUser,
    setCurrentUser,
    logged,
    setLogged,
    logout
}}>{children}</UserContext.Provider>;
}
export default UserContext