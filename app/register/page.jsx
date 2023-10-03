'use client'
import React from 'react'
import Link from "next/link"
import { useState } from "react"

const Register = () => {

    const fields = {
        name: '',
        userName: '',
        email: '',
        password: '',
    }
    
    const [data, setData] = useState(fields)
    const [showPassword, setShowPassword] = useState(false)
    
    const handleInput = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="form-center-div">
                    <div className="border-stylish">
                        <h3 className="text-center">Register Yourself Here</h3>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="name"
                            value={data?.name} 
                            placeholder="Name"
                            onChange={handleInput} 
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="userName"
                            value={data?.userName} 
                            placeholder="Username"
                            onChange={handleInput} 
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="email"
                            value={data?.email} 
                            placeholder="Email"
                            onChange={handleInput} 
                            />
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                className="form-control form-control-sm" 
                                name="password"
                                value={data?.password} 
                                placeholder="Password"
                                onChange={handleInput} 
                            />
                            <div className="input-group-append">
                                <span 
                                className="input-group-text" 
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                                >
                                <i className={`text-dark fa fa-eye${showPassword ? '-slash' : ''}`}></i>
                                </span>
                            </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info w-100 btn-sm">Register</button>
                        <p className="text-center mt-4">Already have account? <Link href='/'>Click here</Link> to Login!</p>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default Register
