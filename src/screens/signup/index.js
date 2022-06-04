import React, {useState } from 'react'
import Input from "../../components/Input"
import Logo from "../../assets/images/logo.png"
import { useForm } from 'react-hook-form'
import AuthApi from '../../api/auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [errorMessage, setErrorMessage] = useState(null)
    return (
        <div className='screen signup-screen'>
            <form onSubmit={handleSubmit(async (data) => {
                try {
                    const result = await AuthApi.signup(data);
                    console.log("REZULTAT")
                    console.log(result)
                    //clear error and redirect  
                    setErrorMessage(null)
                    navigate("/login")
                    
                } catch (err) {
                    console.log("imamo error")
                    console.log(err)
                    setErrorMessage("Database not connected")
                }

            })}>

                <div className="logo-wrapper">
                    <img src={Logo} className="logo" />
                </div>

                <div className="header-text">Sign Up</div>
                {errorMessage && <div className='error'>Server Error! Check if server and database are running </div>}
                <div className="input-wrappers">

                    <Input
                        type="text"
                        placeholder="First Name"
                        register={register("first_name", { required: "First name is required" })}
                        error={errors.first_name} />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        register={register("last_name", { required: "Last name is required" })}
                        error={errors.last_name} />
                    
                    <Input
                        type="email"
                        placeholder="Email"
                        // Email is required, and its required in format: name@addres.com
                        // Value is just a regex checking if email is in correct format
                        register={register("email", {
                            required: "Email is required", pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            }
                        })}
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