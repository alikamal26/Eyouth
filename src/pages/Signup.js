import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/Login.css'
import { FormControl, Input, InputLabel, Button, Card } from '@mui/material'

export default function Signup() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
      }
      const handlePasswordChange = (event) => {
        setPassword(event.target.value)
      }
    
      const handleSignUp = async () => {
        if (username == '' || password == '') {
            setErrorMessage('Please enter both username and password to proceed')
        }
        else{
            navigate(`/login`)
        }
      }

    return (
        <div className='loginWrapper'>
      <h1>Eyouth Task SignUp</h1>
      <Card className='loginCard'>
        <p className='errorMessage'>{errorMessage}</p>
        <FormControl className='loginForms' onChange={handleUsernameChange}>
          <InputLabel className='loginFormsInput' htmlFor='username'>
            Username
          </InputLabel>
          <Input id='username' aria-describedby='username' />
        </FormControl>
        <FormControl className='loginForms' onChange={handlePasswordChange}>
          <InputLabel className='loginFormsInput' htmlFor='password'>
            Password
          </InputLabel>
          <Input type='password' id='password' aria-describedby='password' />
        </FormControl>
        <Button
          className='loginButton'
          variant='contained'
          onClick={handleSignUp}
        >
          SignUp
        </Button>
      </Card>
    </div>
    )
}
