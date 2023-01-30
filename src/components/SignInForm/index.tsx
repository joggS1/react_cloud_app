import React, { useState } from 'react'
import { api } from '../../services/authService'
import { Button } from '../button'
import { Input } from '../input'
import styles from './authForm.module.css'

const DEFAULT_FORM_VALUE: Omit<
  UserType,
  'id' | 'diskSpace' | 'usedSpace' | 'files' | 'username'
> = {
  email: '',
  password: '',
}

export const SignInForm = () => {
  const [user, setUser] = useState(DEFAULT_FORM_VALUE)
  const [authUser] = api.useAuthUserMutation()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await authUser({ email: user.email, password: user.password })
  }

  return (
    <form className={styles.authform} onSubmit={login}>
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
        id="password"
        label="Password"
        type="password"
        required
        placeholder="qwerty"
        value={user.password}
        onChange={onChange}
      />
      <Button className={styles.authform_button} color="primary">
        Sign In
      </Button>
    </form>
  )
}
