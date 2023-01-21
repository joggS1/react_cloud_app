import React from "react";
import styles from "./button.module.css"


interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    color: 'primary' | 'secondary' | 'blue'
}

export const Button : React.FC<ButtonProps> = ({children, color, onClick, type }) =>{
    const className = `${styles.button} ${styles[`button_${color}`]}`
    return <button className={className} onClick={onClick} type={type}>{children}</button>
}

