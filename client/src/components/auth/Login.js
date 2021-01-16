import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (error) {
      error.response.data.message && setError(error.response.data.message);
    }
  };

  return (
    <div className="page">
      <h2>Log in</h2>
      {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Login;