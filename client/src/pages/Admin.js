import React, {useState} from "react";
import axios from 'axios';
import {Button} from "../components/AuthForms";
import {Table} from "../components/UserTable";

function Admin(props) {

  const [users, setUser] = useState([]);

  function fetchUsers() {
    axios.get("http://localhost:8080/api/v1/user/list", {withCredentials: true}).then(result => {
      if (result.status === 200) {
        setUser(result.data.data);
      } else {
        setUser([]);
      }
    }).catch(e => {
      setUser([]);
    });
  }

  return (
    <div>
      <div>Admin Page</div>
      <div>
        <Button onClick={ fetchUsers }>Fetch users</Button>
      </div>
      <Table>
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>SSN</th>
            <th>Address</th>

          </tr>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.ssn}</td>
                <td>{user.address}</td>
              </tr>
            );
          })}
        </table>
      </Table>
    </div>
  );
}

export default Admin;
