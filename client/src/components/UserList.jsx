import React, { useState } from 'react'
import Axios from 'axios'

const UserList = ({ users }) => {
  const [username, setUsername] = useState([])

  const submitUser = () => {
    Axios.post("https://localhost:3000/users", {
      username: username,
    }).then(() => {
      console.log(username)
    })
  }

  return (
    <>
      <ul className='list-group w-40 p-3'>
        <li className='list-group-item fs-3 fw-bolder bg-dark-subtle'>USERS</li>
        {users.map((user) => {
          <li className='list-group-item fs-2' id={user.user_id}>{user.user_name}</li>
        })}
      </ul>
      <form className="input-group mb-3" onSubmit={submitUser}>
        <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setUsername(e.target.value)} />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
      </form>
    </>

  )
}

export default UserList