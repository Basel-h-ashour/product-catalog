import React, { useState } from "react";

import classes from "./Login.module.css";

const initialData = {
  email: "",
  password: "",
};

const Login = (props) => {
  const [data, setData] = useState(initialData);
  const [loginError, setLoginError] = useState("");
  const [showErrors, setShowErrors] = useState(classes.Hidden);



  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // localstorage.setItem()
    // fetch <= authorization token header
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })

    };

    fetch('http://127.0.0.1:8000/api/user/token/', requestOptions)
      .then(response => response.json())
      .then(jsondata => {
        console.log(jsondata.non_field_errors)
        if (!jsondata.token)
        {
          setLoginError(jsondata.non_field_errors);
          setShowErrors(classes.Visible);
        }
        else
        {
          setLoginError("");
          setShowErrors(classes.Hidden);
          props.setLoggedIn(true)
        }
        localStorage.setItem("token", jsondata.token)
      })
      .catch((error) => {
        console.log(error)
      });
      
    // Axios.post(API.users.login, formData)
    //   .then((response) => {
    //     // console.log(response);
    //     if (!response.data.isAuthenticated) {
    //       setLoginError(response.data.message);
    //       setShowErrors(classes.Visible);
    //     } else {
    //      set logged in to true
    //     }
    //   })
    //   .catch((error) => {
    //     viewError(true);
    //   });
  };

  return (
    <div className={[classes.Login].join(" ")}>
      <div className="container-fluid p-5">
        <div className="row justify-content-center">
          <div className={[classes.Box, "col-4"].join(" ")}>
            <div className="row">
              <div className={[showErrors, "col-12 mb-3"].join(" ")}>
                <div className={classes.Errors}>
                  <p className="mb-0">{loginError}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row justify-content-center">
                <h2 className={classes.BoxTitle}>Login</h2>
              </div>
            </div>
            <div className="inputsContainer row">
              <div className="col">
                <div className={classes.BoxContent}>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4 ">
                      <label htmlFor="email">
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="example@example.com"
                        required
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">
                        <span>Password</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        minLength="8"
                        required
                        value={data.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row justify-content-center pt-5">
                      <div className="row justify-content-center">
                        <button className="btn btn-info" type="submit">
                          <strong>Login</strong>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
