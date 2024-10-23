import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [form, setForm] = useState({})
  const [users, setUsers] = useState({})

  const handleForm = (e) => {
    e.preventDefault()
    console.log(e.target.value, e.target.name)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      const response = await fetch("http://localhost:3000/",{
        // method: 'GET',
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // const data = await response.text() 
      const data = await response.json() 
      console.log(data)
  }

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/",{
      method: 'GET'
    })
    const data = await response.json()
    console.log(data)
    setUsers(data)
  }

  useEffect(() =>{
    getUsers()
  },[])


  return (
   <>

<h2>{JSON.stringify(form)}</h2>

    <form action="" onSubmit={handleSubmit} >
      <span>Username</span>
      <input type="text" name='username' onChange={handleForm} />
      <span>Password</span>
      <input type="password" name='password' onChange={handleForm} />
      <button type="submit">Submit</button>
    </form>

    <div>
      <ul>
        { Array.isArray(users) && users?.map(value => <li key = {value._id} >
          {value.username} and  {value.password}
          </li> )}
      </ul>
    </div>

   </>
  )
}

export default App
