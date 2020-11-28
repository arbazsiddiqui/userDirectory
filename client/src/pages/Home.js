import React, { useState } from "react";
import axios from 'axios';
import { Card, Form, Input, Button, Error, Success } from "../components/AuthForms";

function Home(props) {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ssn, setSSN] = useState("");
  const [address, setAddress] = useState("");

  function postUser() {
    axios.post("http://localhost:8080/api/v1/user", {
      firstName, lastName, ssn, address
    }).then(result => {
      setSubmitted(true)
    }).catch(e => {
    });
  }

  return (
    <Card>
      <Form>
        <Input
          type="firstName"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
          placeholder="firstName"
        />
        <Input
          type="lastName"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
          }}
          placeholder="lastName"
        />
        <Input
          type="ssn"
          value={ssn}
          onChange={e => {
            setSSN(e.target.value);
          }}
          placeholder="ssn"
        />
        <Input
          type="address"
          value={address}
          onChange={e => {
            setAddress(e.target.value);
          }}
          placeholder="address"
        />
        <Button onClick={postUser}>Submit</Button>
      </Form>
      { submitted &&<Success>Submitted Successfully!</Success> }
    </Card>
  );
}

export default Home;
