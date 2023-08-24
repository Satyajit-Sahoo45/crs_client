import React, { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) {
            navigate("/dashboard");
        }
    }, [navigate]);

    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signup" ? "signin" : "signup")
    }

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })


    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })


    const loginInputHandler = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setLoginData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });

    }

    const signupInputHandler = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setSignupData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    const submitData = async (e) => {
        e.preventDefault();

        if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            window.alert("please fill all the fields");
        }

        try {

            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };

            const name = signupData.name
            const email = signupData.email
            const password = signupData.password

            const { data } = await axios.post(
                "/api/user",
                { name, email, password },
                config
            );

            window.alert("Registration Successfull");

            localStorage.setItem("userInfo", JSON.stringify(data))
            window.location.href = "/dashboard"
        } catch (error) {
            console.log(error);
            window.alert("error occured! in sign up part")
        }

    }

    const loginDataCheck = async (e) => {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            window.alert("please fill all the field")
            return;
        }

        try {
            const email = loginData.email;
            const password = loginData.password;

            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };

            const { data } = await axios.post(
                "api/user/login",
                { email, password },
                config
            );

            localStorage.setItem("userInfo", JSON.stringify(data));
            window.location.href = "/dashboard";


        } catch (error) {
            window.alert("Error Occured! in login part")
        }

    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={loginDataCheck}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Log In</h3>
                        <div className="text-center pointer">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                SignUp
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control mt-1"
                                value={loginData.email}
                                placeholder="Enter email"
                                onChange={loginInputHandler}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control mt-1"
                                value={loginData.password}
                                placeholder="Enter password"
                                autoComplete="off"
                                onChange={loginInputHandler}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    else {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={submitData}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign Up</h3>
                        <div className="text-center pointer">
                            Already registered?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Log In
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                onChange={signupInputHandler}
                                name="name"
                                value={signupData.name}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                onChange={signupInputHandler}
                                name="email"
                                value={signupData.email}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                autoComplete="off"
                                onChange={signupInputHandler}
                                name="password"
                                value={signupData.password}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Confirm Password"
                                autoComplete="off"
                                onChange={signupInputHandler}
                                name="confirmPassword"
                                value={signupData.confirmPassword}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default HomePage;
