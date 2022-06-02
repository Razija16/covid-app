import React from 'react'
import Input from "../../components/Input"
import { useForm } from 'react-hook-form'
import Logo from "../../assets/images/logo.png"


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className='screen login-screen'>
            <form onSubmit={handleSubmit((data) => {
                console.log("Login Data,", data)
            })}>
                <div className="logo-wrapper">
                    <img src={Logo} className="logo" />
                </div>

                <div className="header-text">Login</div>
                <Input
                    type="email"
                    placeholder="Email"
                    register={register("email", { required: "Email is required" })}
                    error={errors.email} />
                <Input
                    type="password"
                    placeholder="Password"
                    register={register("password", { required: "Password name is required", minLength: { value: 6, message: "Minimum is 6 characters for the password" } })}
                    error={errors.password} />
                <div className="question">
                    Don’t have an account? <span className="question-login">Sign Up</span>
                </div>
                <button className='button'>Login</button>

            </form>
        </div>
    )
}

export default Login