import React, { useState, useEffect, useContext } from 'react'
import Input from "../../components/Input"
import { useForm } from 'react-hook-form'
import Logo from "../../assets/images/logo.png"
import AuthApi from '../../api/auth'
import UserContext from "../../context/index"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { setError, register, handleSubmit, formState: { errors } } = useForm();
    const { user, setUser } = useContext(UserContext)
    const [errorMessage, setErrorMessage] = useState(null)

    return (
        <div className='screen login-screen'>
            <form onSubmit={handleSubmit(async (data) => {
                try {
                    const result = await AuthApi.login(data);
                    //if result is good then setting users info to context
                    if (result?.ok === true) {
                        const finalData = await result.json();
                        setErrorMessage(null)
                        setUser({
                            first_name: finalData.user.first_name,
                            last_name: finalData.user.last_name,
                            email: finalData.user.email,
                            user_id: finalData.user.id,
                            is_admin: finalData.user.is_admin
                        })
                        //setToken!!
                        localStorage.setItem("token", finalData?.token);

                        //redirects
                        if (user.is_admin) {
                            //redirect to adminPanel
                            navigate("/admin")
                            return;
                        }
                        //redirect to userProfile
                        navigate("/user-profile")
                        return;
                    } else if (result?.ok === false) {
                        const problem = await result.json();
                        console.log("Problem:", problem)

                        setErrorMessage(problem.msg)
                    }

                } catch (err) {
                    //this will accur only if app can't connect to the backend
                    console.log("Server error")
                    console.log(err)
                    setErrorMessage("Server Error! Check if server is running")
                    return;
                }

            })}>
                <div className="logo-wrapper">
                    <img src={Logo} className="logo" />
                </div>

                <div className="header-text">Login</div>

                {errorMessage && <div className='error'>{errorMessage} </div>}
                <Input
                    type="email"
                    placeholder="Email"
                    register={register("email", { required: "Email is required" })}
                    error={errors.email}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    register={register("password", { required: "Password name is required", minLength: { value: 6, message: "Minimum is 6 characters for the password" } })}
                    error={errors.password}
                />

                <div className="question">
                    Don’t have an account? <span className="question-login">Sign Up</span>
                </div>
                <button className='button'>Login</button>

            </form>
        </div>
    )
}

export default Login