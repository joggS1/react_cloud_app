import React, { InputHTMLAttributes } from 'react'
import styles from './input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

export const Input = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  ...args
}: InputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.name} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.field}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...args}
      />
    </div>
  )
}
