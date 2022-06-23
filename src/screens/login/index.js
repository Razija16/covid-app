import React, { useState, useEffect, useContext } from 'react'
import Input from "../../components/Input"
import { useForm } from 'react-hook-form'
import Logo from "../../assets/images/logo.png"
import AuthApi from '../../api/auth'
import UserContext from "../../context/index"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { setError, register, handleSubmit, formState: { errors } } = useForm();
    const { setCurrentUser, setLogged } = useContext(UserContext)
    const [errorMessage, setErrorMessage] = useState(null)
    return (
        <div className='screen login-screen'>
            <form onSubmit={handleSubmit(async (data) => {
                try {
                    const result = await AuthApi.login(data);
                    console.log("evoga",result)
                    if (result?.ok) {
                        const res = await result.json();
                        setErrorMessage(null)
                        //setting users info
                        setCurrentUser({
                            first_name: res.user.first_name,
                            last_name: res.user.last_name,
                            is_admin: res.user.is_admin,
                            user_id: res.user.id,
                            email: res.user.email
                        })
                        //setToken!!
                        setLogged(true)
                        if (res?.token)
                            localStorage.setItem("token", res.token);

                        //navigate
                        if (res?.user.is_admin) {
                            navigate('/admin')
                            return;
                        } else {
                            navigate("/user-profile")
                            return;
                        }

                    } else {
                        const res = await result.json();
                        console.log("Problem:", res)
                        setErrorMessage(res.msg)
                    }
                    //rewrite logic here.. test then
                } catch (error) {
                    console.log(error);
                    console.log("nema logina");
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
                    <Link to="/signup">
                        Don’t have an account? <span className="question-login">Sign Up</span>
                    </Link>
                </div>
                <button className='button'>Login</button>

            </form>
        </div>
    )
}

export default Login