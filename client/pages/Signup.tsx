import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    console.log('password: ', password)
    console.log('username: ', email)

    const result = fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    result.then((res) => {
      console.log('res: ', res)
    })
  }


  return (
    <div className={styles.container}>
       <h1>registration</h1>
        <form onSubmit={e => handleSubmit(e)}>
          <input className="name" type="text" placeholder="name" onChange={e => setName(e.target.value)} />
          <input className="username" type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
          <input className="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
          <input type="submit" value="Submit Form" />
        </form>
    </div>
  )
  }



export default Home
