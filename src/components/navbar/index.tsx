import React from "react"
import styles from './Navbar.module.css'
import Logo from '../../assets/img/navbar-logo.svg'
import { Button } from "../button"
import { NavLink } from "react-router-dom"
import { selectCurrentUser, selectIsAuthenticated, logout } from "../../services/userSlice"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"


export const Navbar: React.FC = () => {
    const isAuth = useSelector(selectIsAuthenticated)
    const user = useSelector(selectCurrentUser) 
    const dispatch = useDispatch()
    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(logout())
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <NavLink to="/"><img src={Logo} alt="logo" className={styles.navbar_logo}/></NavLink> 
                <NavLink to="/" className={styles.header}>cloud storage</NavLink>
                <div className={styles.navbar_buttons}>
                {isAuth ? 
                
                <div className={styles.navbar_user_menu_container}>
                    <div className={styles.navbar_user_menu_username}>{user?.username}</div>
                    <hr className={styles.navbar_user_menu_vertical_line}/>
                    <Button color="blue" onClick={(event) => handleLogout(event)}>Log out</Button>
                </div> 
                :
                <><NavLink to="/signin"><Button color="primary">Sign In</Button></NavLink>
                <NavLink to="/signup"><Button color="blue">Sign Up</Button></NavLink></>}
                
                </div>
            </div>
        </div>
    )
}


               
