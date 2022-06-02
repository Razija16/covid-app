import React, { useRef } from 'react'
import Input from "../../components/Input"
import Logo from "../../assets/images/logo.png"
import { useForm } from 'react-hook-form'

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className='screen signup-screen'>
            <form onSubmit={handleSubmit((data) => {
                console.log("DATA,", data)
            })}>

                <div className="logo-wrapper">
                    <img src={Logo} className="logo" />
                </div>

                <div className="header-text">Sign Up</div>

                <div className="input-wrappers">

                    <Input
                        type="text"
                        placeholder="First Name"
                        register={register("first_name", { required: "First name is required" })}
                        error={errors.firstName} />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        register={register("last_name", { required: "Last name is required" })}
                        error={errors.lastName} />
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
                </div>

                <div className="question">
                    Already have an account? <span className="question-login">Login</span>
                </div>

                <input type="submit" className='button' value="Sign Up" />
            </form>
        </div>
    )
}

export default SignUp