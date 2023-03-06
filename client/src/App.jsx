import './App.css'

import {useState, useEffect} from 'react'
import axios from 'axios'
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);  
  useEffect(() => {
    fetch("http://localhost:3000/users/")
      .then((res) => res.json())
      .then((resJSON) => {
        const data = JSON.parse(JSON.stringify(resJSON));
        setUsers(data);
      })
  }, [])

  return (
    <div className='container-fluid min-vh-100 bg-light-subtle'>
      <div className='container min-vh-100 mx-5'>
        <div className='d-flex justify-content-center align-items-center pt-5 flex-column'>
          <h1 className='fs-1 fw-bold'>Meal Mate</h1>
          <UserList users={users}/>
        </div>
      </div>
    </div>
  )
}

export default App