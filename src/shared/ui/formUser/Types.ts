import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { ReactNode } from 'react'

export interface IInputForm {
  label: string
  placeholder: string
  register: UseFormRegister<any>
  validation?: RegisterOptions
  name: string
  type?: string
}

export interface IFormUser {
  title: string
  children: ReactNode
  text: string
  slug: string
  slugText: string
}

export type InputType = {
  register: UseFormRegister<any>
  errors?: FieldErrors
}
