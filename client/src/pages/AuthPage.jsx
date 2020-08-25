import React, { useState } from 'react';

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>shorten link</h1>
        <div className="card  indigo darken-3">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="input-field">
              <input
                placeholder="Enter email"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="first_name">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Enter password"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                onChange={changeHandler}
              />
              <label htmlFor="first_name">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button className="btn pink darken-4">Login</button>
            <button className="btn #d81b60 pink darken-1 btn-signUp">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};
