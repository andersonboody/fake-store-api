import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { ReactNode } from 'react'

export interface IInputForm<TFormValues extends FieldValues> {
  name: Path<TFormValues>
  label?: string
  placeholder?: string
  register: UseFormRegister<TFormValues>
  validation?: RegisterOptions<TFormValues, Path<TFormValues>>
  errors?: FieldErrors
  type?: string
  defaultValue?: string
  isValid?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IFormUser {
  title: string
  children: ReactNode
  text: string
  slug: string
  slugText: string
}
