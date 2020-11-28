import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button, Error } from "../components/AuthForms";

function Signup(props) {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const referer = '/login';

  function postRegister() {
    axios.post("http://localhost:8080/api/v1/admin/register", {
      email,
      password
    }).then(result => {
      if (result.status === 200) {
        setIsError(false);
        return <Redirect to={referer} />;
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
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
        <Button onClick={postRegister}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
      { isError &&<Error>The username is already taken!</Error> }
    </Card>
  );
}

export default Signup;

