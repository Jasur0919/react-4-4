import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid'

function App() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({})
  const [search, setSearch] = useState("")

  const handleChange = (event) => {
    const {name, value} = event.target
    setForm({...form, [name]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = nanoid()
    console.log(id, 'id');
    const payload = {...form, id}
    users.push(payload)
    setUsers([...users])
    event.target.reset()
  }

  const deleteUser = (id) => {
    let new_users = users.filter(item => item.id != id)
    setUsers([...new_users])
  }


  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
           <div className="card-body">
           <form id='submit' onSubmit={handleSubmit}>
              <input required type="text" name='name' onChange={handleChange} placeholder='FirstName' className='from-control my-2'/>
              <input required type="text" name='family' onChange={handleChange} placeholder='LastNasme' className='from-control my-2'/>
              <input required type="number" name='age' onChange={handleChange} placeholder='Age' className='from-control my-2'/>
              <input required type="text" name='gender' onChange={handleChange} placeholder='Gender' className='from-control my-2'/>
            </form>
           </div>
           <div className="card-footer">
            <button type='submit' form='submit'>Add user</button>
           </div>
          </div>
          <div className="col-md-8">

            <div className="row">
              <div className="col-md-6">
                <input type="text"  placeholder='Search...' onChange={(e) => setSearch(e.target.value)} className='form-control mb-4' />
              </div>
            </div>
            <table className='table table-bordered table-hover table-striped'>
              <thead>
                <tr>
                  <td>T/R</td>
                  <td>Name</td>
                  <td>Family</td>
                  <td>Age</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                  {
                    users?.filter((item) => {
                      let name = item?.name?.toLowerCase()
                      let find = search.toLowerCase()
                      if(name.includes(find)){
                        return item
                      }
                    })?.map((item, index) => {
                      return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.family}</td>
                        <td>{item.age}</td>
                        <td>
                          <button className='btn btn-bg-danger' onClick={() => deleteUser(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>
                    })
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
