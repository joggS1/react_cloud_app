import React, { useState } from 'react'
import { api } from '../../services/authService'
import { Button } from '../button'
import { Input } from '../input'
import styles from './signUpForm.module.css'

const DEFAULT_FORM_VALUE: Omit<
  UserType,
  'id' | 'diskSpace' | 'usedSpace' | 'files'
> = {
  email: '',
  username: '',
  password: '',
}

export const SignUpForm = () => {
  const [user, setUser] = useState(DEFAULT_FORM_VALUE)
  const [createUser] = api.useCreateUserMutation()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createUser(user)
  }

  return (
    <form className={styles.sign_up_form} onSubmit={register}>
      <Input
        id="email"
        label="Email"
        type="email"
        required
        placeholder="example@email.com"
        value={user.email}
        onChange={onChange}
      />
      <Input
        id="username"
        label="Username"
        type="text"
        required
        placeholder="John Doe"
        value={user.email}
        onChange={onChange}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        placeholder="qwerty"
        value={user.password}
        onChange={onChange}
      />
      <Button className={styles.authform_button} color="primary">
        Sign Up
      </Button>
    </form>
  )
}
