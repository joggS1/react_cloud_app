import React, { useState } from "react";
import { api } from "../../services/authService";
import { Button } from "../button";
import styles from './authForm.module.css'

const DEFAULT_FORM_VALUE : Omit<UserType, 'id' | 'diskSpace' | 'usedSpace' | 'files'> = {
    email: '',
    username: '',
    password: ''

}
interface AuthFormPorps {
    mode: 'login' | 'create'
}

export const AuthForm: React.FC<AuthFormPorps> = ({mode}) => {
    const [user, setUser] = useState(DEFAULT_FORM_VALUE)
    
    const [createUser, {data: createMessage, error: createError}] = api.useCreateUserMutation();
    const [authUser, {data: authMessage, error: authError}] = api.useAuthUserMutation();
    let Error: string = '';
    let message: string = '';





    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await authUser({email: user.email, password : user.password})
        
    }

    const register = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        await createUser(user)
        
    }

    createError ? Error = (createError as customError).data.message : Error = ''
    createMessage ? message = createMessage.message : message =''
    authError ? Error = (authError as customError).data.message : Error = ''
    authMessage ? message = authMessage.message : message = ''

    return (
     <form className={styles.authform} onSubmit={(event) => mode ==='create' ? register(event) : login(event) }>
            {Error  && <div className={styles.authform_error}> {Error} </div> }
            {message && <div className={styles.authform_message}>{message}</div> }
            <div className={styles.authform_input_container}>
               <label htmlFor="email">
                <div className={styles.authform_input_name}>Email</div>
                    <input className={styles.authform_input} value={user.email} type="email" id="email" name="email" onChange={onChange} placeholder="example@email.com" required={true}/>
                </label>
            </div>
            {mode === 'create' ? 
            <div className={styles.authform_input_container}>
               <label htmlFor="username">
                <div className={styles.authform_input_name}>Username</div>
                    <input className={styles.authform_input} value={user.username} type="text" id="username" name="username" onChange={onChange} placeholder="John Doe" required={true}/>
                </label>
            </div>
            :
            <></>}
            
            <div className={styles.authform_input_container}>
               <label htmlFor="password">
                <div className={styles.authform_input_name}>Password</div>
                    <input className={styles.authform_input} type="password" value={user.password} id="password" name="password" onChange={onChange} placeholder="qwerty" required={true}/>
                </label>
            </div>
            <Button className={styles.authform_button} color="primary" type="submit" >Sign Up</Button>


     </form>
    )
}