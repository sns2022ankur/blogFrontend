'use client'

import Link from "next/link"
import { useState } from "react"

export default function Home() {

  const fields = {
    userName: '',
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
                <h3 className="text-center">Login Here</h3>
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-info w-100 btn-sm">Login</button>
                  <p className="text-center mt-4">Don&apos;t have account? <Link href='/register'>Click here</Link> to Register Yourself!</p>
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
