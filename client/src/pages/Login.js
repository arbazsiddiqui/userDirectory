import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = props.location.state ? props.location.state.referer : '/';

  function postLogin() {
    axios.post("http://localhost:8080/api/v1/admin/login", {
      email,
      password
    }, {withCredentials: true}).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Card>
      <Form>
        <Input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;
